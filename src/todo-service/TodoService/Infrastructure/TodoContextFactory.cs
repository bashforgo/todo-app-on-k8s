using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TodoService.Infrastructure
{
    public class TodoContextFactoy : IDesignTimeDbContextFactory<TodoContext>
    {
        public TodoContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TodoContext>();
            optionsBuilder.UseNpgsql("Database=Design");

            return new TodoContext(optionsBuilder.Options);
        }
    }
}
