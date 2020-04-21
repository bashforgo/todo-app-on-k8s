using System.Linq;
using System.Threading.Tasks;
using TodoService.Infrastructure;
using TodoService.Infrastructure.Services;

namespace TodoService.DataMigrations
{
    public class TodoContextAddUserCredentials
    {
        private readonly TodoContext Context;
        private readonly IPasswordService PasswordService;

        public TodoContextAddUserCredentials(TodoContext context, IPasswordService passwordService)
        {
            Context = context;
            PasswordService = passwordService;
        }

        public void DoMigration()
        {
            var users = Context.Users;

            var noSalt = users.Where(u => string.IsNullOrEmpty(u.Salt));
            foreach (var user in noSalt)
            {
                user.Salt = PasswordService.CreateSalt();
            }

            var noPassword = users.Where(u => string.IsNullOrEmpty(u.Password));
            foreach (var user in noPassword)
            {
                user.Password = PasswordService.Hash(user.Name, user.Salt);
            }

            Context.SaveChanges();
        }
    }
}
