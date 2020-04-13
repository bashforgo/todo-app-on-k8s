using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoService.Infrastructure;
using TodoService.Infrastructure.Services;

namespace TodoService.Controllers
{
    [ApiController]
    [Route("identity")]
    public class IdentityController : ControllerBase
    {
        private readonly TodoContext Context;
        private readonly ITokenService TokenService;

        public IdentityController(TodoContext context, ITokenService tokenService)
        {
            Context = context;
            TokenService = tokenService;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Self()
        {
            var id = int.Parse(HttpContext.User.FindFirst("Id").Value);
            var user = Context.Users.First(u => u.Id == id);
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Login([FromBody] Credentials credentials)
        {
            if (credentials.Username == credentials.Password)
            {
                try
                {
                    var user = Context.Users.First(u => u.Name == credentials.Username);

                    var claims = new List<Claim> {
                        new Claim("Name", user.Name),
                        new Claim("Id", $"{user.Id}"),
                    };
                    var token = TokenService.GenerateToken(claims);

                    HttpContext.Response.Cookies.Append("authorization", new JwtSecurityTokenHandler().WriteToken(token));

                    return Ok(user);
                }
                catch (InvalidOperationException)
                {
                    return Unauthorized();
                }
            }

            return Unauthorized();
        }

        [Authorize]
        [HttpDelete]
        public IActionResult Logout()
        {
            HttpContext.Response.Cookies.Delete("authorization");
            return Ok();
        }
    }

    public class Credentials
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
