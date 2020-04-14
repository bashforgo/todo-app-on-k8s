using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoService.Infrastructure;
using TodoService.Model;

namespace TodoService.Controllers
{
    [Authorize]
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
        public async Task<IActionResult> List()
        {
            var userId = int.Parse(HttpContext.User.FindFirst("Id").Value);
            var user = await Context.Users.Include(u => u.Todos).FirstAsync(u => u.Id == userId);
            var todos = user.Todos.Where(t => !t.Deleted);
            return Ok(todos);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] TodoItem todo)
        {
            var fresh = new TodoItem()
            {
                Title = todo.Title.Trim(),
            };

            var userId = int.Parse(HttpContext.User.FindFirst("Id").Value);
            var user = await Context.Users.FirstAsync(u => u.Id == userId);

            user.Todos.Add(fresh);

            await Context.SaveChangesAsync();

            return Ok(fresh);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] TodoItem todo)
        {
            var todos = Context.Todos.Where(t => t.Id == id);
            if (todos.Count() != 1)
            {
                return BadRequest();
            }

            var existingTodo = await todos.FirstAsync();

            existingTodo.Complete = todo.Complete;
            existingTodo.Title = todo.Title;
            await Context.SaveChangesAsync();

            return Ok(existingTodo);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var todos = Context.Todos.Where(t => t.Id == id);
            if (todos.Count() != 1)
            {
                return BadRequest();
            }

            var existingTodo = await todos.FirstAsync();

            var userId = int.Parse(HttpContext.User.FindFirst("Id").Value);
            if (existingTodo.OwnerId != userId)
            {
                return BadRequest();
            }

            existingTodo.Deleted = true;
            await Context.SaveChangesAsync();

            return Accepted();
        }
    }
}
