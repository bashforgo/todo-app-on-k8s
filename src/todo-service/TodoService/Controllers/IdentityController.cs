using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoService.Infrastructure;
using TodoService.Infrastructure.Services;
using TodoService.Model;

namespace TodoService.Controllers
{
    [ApiController]
    [Route("identity")]
    public class IdentityController : ControllerBase
    {
        private readonly TodoContext Context;
        private readonly ITokenService TokenService;
        private readonly IPasswordService PasswordService;

        public IdentityController(
            TodoContext context,
            ITokenService tokenService,
            IPasswordService passwordService)
        {
            Context = context;
            TokenService = tokenService;
            PasswordService = passwordService;
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
        public async Task<IActionResult> Login([FromBody] Credentials credentials)
        {
            var users = Context.Users.Where(u => u.Name == credentials.Username);

            if (await users.CountAsync() != 1)
            {
                return Unauthorized();
            }

            var user = await users.FirstAsync();

            if (!PasswordService.Check(credentials.Password, user.Password, user.Salt))
            {
                return Unauthorized();
            }

            AuthorizeUser(user);

            return Ok(user);
        }

        [Authorize]
        [HttpDelete]
        public IActionResult Logout()
        {
            HttpContext.Response.Cookies.Delete("authorization");
            return Ok();
        }

        [HttpPost("new")]
        public async Task<IActionResult> Create([FromBody] Credentials credentials)
        {
            var name = credentials.Username;

            var users = Context.Users.Where(u => u.Name == name).Count();
            if (0 < users)
            {
                return BadRequest();
            }

            var pass = credentials.Password;
            if (pass.Length < 8)
            {
                return BadRequest();
            }

            var salt = PasswordService.CreateSalt();
            var user = new User()
            {
                Name = name,
                Salt = salt,
                Password = PasswordService.Hash(credentials.Password, salt)
            };
            Context.Users.Add(user);

            user.Todos.Add(new TodoItem() { Title = "Welcome!" });
            user.Todos.Add(new TodoItem() { Title = "⬅️ Mark todos completed", Complete = true });
            user.Todos.Add(new TodoItem() { Title = "Then get rid of them ➡️", });

            await Context.SaveChangesAsync();

            AuthorizeUser(user);

            return Ok(user);
        }

        private void AuthorizeUser(User user)
        {
            var claims = new List<Claim> {
                    new Claim("Name", user.Name),
                    new Claim("Id", $"{user.Id}"),
                };
            var token = TokenService.GenerateToken(claims);

            HttpContext.Response.Cookies.Append(
                "authorization",
                new JwtSecurityTokenHandler().WriteToken(token));
        }
    }

    public class Credentials
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
