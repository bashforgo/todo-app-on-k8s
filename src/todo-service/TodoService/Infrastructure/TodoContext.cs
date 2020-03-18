using Microsoft.EntityFrameworkCore;
using TodoService.Model;

namespace TodoService.Infrastructure
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions options) : base(options)
        { }

        public DbSet<TodoItem> Todos { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
