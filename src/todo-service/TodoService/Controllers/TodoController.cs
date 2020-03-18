using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TodoService.Infrastructure;
using TodoService.Model;

namespace TodoService.Controllers
{
    [ApiController]
    [Route("todos")]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext Context;

        public TodoController(TodoContext context)
        {
            Context = context;
        }

        [HttpGet]
        public IEnumerable<TodoItem> Get()
        {
            return Context.Todos.AsEnumerable();
        }
    }
}
