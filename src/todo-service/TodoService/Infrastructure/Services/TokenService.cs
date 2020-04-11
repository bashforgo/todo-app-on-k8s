using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using TodoService.Infrastructure.Configuration;

namespace TodoService.Infrastructure.Services
{
    public interface ITokenService
    {
        JwtSecurityToken GenerateToken(IEnumerable<Claim> claims);
    }

    public class TokenService : ITokenService
    {
        private readonly TokenConfiguration Configuration;
        private readonly SigningCredentials SigningCredentials;

        public TokenService(TokenConfiguration configuration)
        {
            Configuration = configuration;
            SigningCredentials = new SigningCredentials(configuration.Key, SecurityAlgorithms.HmacSha256);
        }

        public JwtSecurityToken GenerateToken(IEnumerable<Claim> claims)
        {
            return new JwtSecurityToken(
                issuer: Configuration.Issuer,
                audience: Configuration.Audience,
                signingCredentials: SigningCredentials,
                expires: DateTime.Now.AddHours(1),
                claims: claims
            );
        }
    }
}
