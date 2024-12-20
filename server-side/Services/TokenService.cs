using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using server_side.Models;
using DotNetEnv;

namespace server_side.Services
{
    public class TokenService
    {
        private readonly SymmetricSecurityKey Key;
        private readonly string _issuer;
        private readonly string _audience;

    public TokenService(IConfiguration configuration)
    {
        var jwtSettings = configuration.GetSection("JwtSettings");

        string _secretKey = Environment.GetEnvironmentVariable("SECRET_KEY") ?? throw new ArgumentNullException("SecretKey is missing in env variables");

        Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        _issuer = Environment.GetEnvironmentVariable("ISSUER") ?? throw new ArgumentNullException("Issuer is missing in JwtSettings");
        _audience = Environment.GetEnvironmentVariable("AUDIENCE") ?? throw new ArgumentNullException("Audience is missing in JwtSettings");
    }
        
    public string GenerateJwtToken(User user){
        var header = new JwtHeader(
            new SigningCredentials(
                Key,
                "HS512"     
        ));

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Name,user.Username),
            new Claim(JwtRegisteredClaimNames.NameId,user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email,user.Email),
        };

        var payload = new JwtPayload(
            issuer:_issuer,
            audience:_audience,
            claims:claims,
            null,
            expires:DateTime.UtcNow.AddDays(1)
        );

        var token = new JwtSecurityToken(header,payload);

        return new JwtSecurityTokenHandler().WriteToken(token);

    }


    }
}