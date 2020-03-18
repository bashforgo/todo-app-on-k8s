using System.Collections.Generic;

namespace TodoService.Model
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<TodoItem> Todos { get; } = new List<TodoItem>();
    }
}
