using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace TodoService.Infrastructure.Services
{
    public interface IPasswordService
    {
        bool Check(string cleartextPassoword, string hashedPassword, string salt);
        string CreateSalt();
        string Hash(string cleartextPassword, string salt);
    }

    public class PasswordService : IPasswordService
    {
        public string CreateSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return Convert.ToBase64String(salt);
        }

        public string Hash(string cleartextPassword, string salt)
        {
            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: cleartextPassword,
                salt: Convert.FromBase64String(salt),
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
        }

        public bool Check(string cleartextPassoword, string hashedPassword, string salt)
        {
            return hashedPassword == Hash(cleartextPassoword, salt);
        }
    }
}
