using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TodoService.Model
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [JsonIgnore]
        public List<TodoItem> Todos { get; } = new List<TodoItem>();
    }
}
