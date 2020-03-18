using System.Text.Json.Serialization;

namespace TodoService.Model
{
    public class TodoItem
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public bool Complete { get; set; }
        public bool Deleted { get; set; }

        [JsonIgnore]
        public int OwnerId { get; set; }
        [JsonIgnore]
        public User Owner { get; set; }
    }
}
