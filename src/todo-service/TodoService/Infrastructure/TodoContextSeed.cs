using System.Collections.Generic;
using System.Linq;
using TodoService.Model;

namespace TodoService.Infrastructure
{
    public class TodoContextSeed
    {
        private readonly TodoContext Context;

        public TodoContextSeed(TodoContext context)
        {
            Context = context;
        }

        public void DoSeed()
        {
            if (!Context.Users.Any())
            {
                var alice = new User() { Name = "Alice" };
                Context.Users.Add(alice);
                alice.Todos.Add(new TodoItem() { Title = "Autem quaerat consequatur optio doloremque", Complete = true });
                alice.Todos.Add(new TodoItem() { Title = "Non doloribus labore et praesentium ducimus nihil placeat debitis", Complete = false });
                alice.Todos.Add(new TodoItem() { Title = "Rerum est nulla laboriosam", Complete = false });
                alice.Todos.Add(new TodoItem() { Title = "Exercitationem tempore iste voluptatem id deleniti non", Complete = true });
                alice.Todos.Add(new TodoItem() { Title = "Doloribus qui ullam aut nihil", Complete = true });
                alice.Todos.Add(new TodoItem() { Title = "Consequatur quia mollitia maxime rem totam eum quos iusto", Complete = false });
                alice.Todos.Add(new TodoItem() { Title = "Voluptatibus vero atque minima ratione eum", Complete = false });
                alice.Todos.Add(new TodoItem() { Title = "Sit omnis iste sit ex", Complete = false });
                alice.Todos.Add(new TodoItem() { Title = "Distinctio dolores et nostrum porro", Complete = true });
                alice.Todos.Add(new TodoItem() { Title = "In rerum dolor aut", Complete = true });
                alice.Todos.Add(new TodoItem() { Title = "Dolores est perspiciatis laborum ea et", Complete = true });

                var bob = new User() { Name = "Bob" };
                Context.Users.Add(bob);
                bob.Todos.Add(new TodoItem() { Title = "Et adipisci repellendus iure consequatur", Complete = false });
                bob.Todos.Add(new TodoItem() { Title = "Rerum rem quod commodi molestias quas sed eveniet", Complete = true });
                bob.Todos.Add(new TodoItem() { Title = "Laudantium ipsam porro cum rerum iusto sequi alias", Complete = false });
                bob.Todos.Add(new TodoItem() { Title = "Aut et magnam et", Complete = true });
                bob.Todos.Add(new TodoItem() { Title = "Natus dicta perferendis aut sint neque sequi", Complete = true });
                bob.Todos.Add(new TodoItem() { Title = "Ipsam aut quis quis", Complete = true });
                bob.Todos.Add(new TodoItem() { Title = "Animi dolores nostrum nam totam quia pariatur", Complete = true });
                bob.Todos.Add(new TodoItem() { Title = "Excepturi voluptatem autem est cupiditate debitis nisi laboriosam quo", Complete = false });
                bob.Todos.Add(new TodoItem() { Title = "Optio minima accusantium ab", Complete = false });
                bob.Todos.Add(new TodoItem() { Title = "Sapiente voluptas sequi incidunt quis delectus doloribus hic consequuntur", Complete = false });
                bob.Todos.Add(new TodoItem() { Title = "Aut sit quia alias non magni quo", Complete = true });
                bob.Todos.Add(new TodoItem() { Title = "Culpa repudiandae minus quidem amet aut iste alias error", Complete = false });

                var cleo = new User() { Name = "Cleo" };
                Context.Users.Add(cleo);
                cleo.Todos.Add(new TodoItem() { Title = "Reiciendis non velit magni corporis quidem maiores quidem", Complete = false });
                cleo.Todos.Add(new TodoItem() { Title = "Aut quibusdam eum sit numquam nobis id eius", Complete = true });
                cleo.Todos.Add(new TodoItem() { Title = "Dolor molestiae doloribus fugiat aut quaerat modi", Complete = true });
                cleo.Todos.Add(new TodoItem() { Title = "Aut est aut quis", Complete = false });
                cleo.Todos.Add(new TodoItem() { Title = "Dolores quia soluta ea voluptate est", Complete = false });
                cleo.Todos.Add(new TodoItem() { Title = "Repudiandae fugit esse facere est dicta et quo et", Complete = false });
                cleo.Todos.Add(new TodoItem() { Title = "Aliquam a quia voluptas", Complete = false });
                cleo.Todos.Add(new TodoItem() { Title = "Et asperiores consequatur voluptas", Complete = false });
                cleo.Todos.Add(new TodoItem() { Title = "Molestiae vitae est tempora perferendis fugiat autem", Complete = true });
                cleo.Todos.Add(new TodoItem() { Title = "Repellendus consectetur consequatur nihil delectus", Complete = false });
                cleo.Todos.Add(new TodoItem() { Title = "Sed non sint voluptas quasi ducimus aliquam eos", Complete = true });
                cleo.Todos.Add(new TodoItem() { Title = "Saepe dolor nulla pariatur dolore laborum", Complete = true });
                cleo.Todos.Add(new TodoItem() { Title = "Enim ea tempore voluptatem qui labore qui", Complete = true });

                var doug = new User() { Name = "Doug" };
                Context.Users.Add(doug);
                doug.Todos.Add(new TodoItem() { Title = "Est praesentium vel asperiores exercitationem", Complete = true });
                doug.Todos.Add(new TodoItem() { Title = "Vel omnis odit ad alias tempore quasi dolorem", Complete = false });
                doug.Todos.Add(new TodoItem() { Title = "Porro aliquid et placeat blanditiis dolorum quia", Complete = false });
                doug.Todos.Add(new TodoItem() { Title = "Explicabo labore laudantium eum", Complete = false });
            }

            Context.SaveChanges();
        }
    }
}
