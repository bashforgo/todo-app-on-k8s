using Microsoft.IdentityModel.Tokens;

namespace TodoService.Infrastructure.Configuration
{
    public class TokenConfiguration
    {
        public string Issuer { get; }
        public string Audience { get; }
        public SecurityKey Key { get; }

        public TokenConfiguration(string issuer, string audience, SecurityKey key)
        {
            Issuer = issuer;
            Audience = audience;
            Key = key;
        }
    }
}
