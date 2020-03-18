using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoService.Infrastructure;
using TodoService.Model;

namespace TodoService.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        private readonly TodoContext Context;

        public UserController(TodoContext context)
        {
            Context = context;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return Context.Users.Include(u => u.Todos).AsEnumerable();
        }
    }
}
