using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

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

        string _secretKey = jwtSettings["SecretKey"] ?? throw new ArgumentNullException("SecretKey is missing in JwtSettings");

        Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        _issuer = jwtSettings["Issuer"] ?? throw new ArgumentNullException("Issuer is missing in JwtSettings");
        _audience = jwtSettings["Audience"] ?? throw new ArgumentNullException("Audience is missing in JwtSettings");
        Console.WriteLine("tokenservice");
    }
        
    public string GenerateJwtToken(string username){
        Console.WriteLine("generated token ");

        var header = new JwtHeader(
            new SigningCredentials(
                Key,
                SecurityAlgorithms.HmacSha512Signature        
        ));

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier,username)
        };

        var payload = new JwtPayload(
            issuer:_issuer,
            audience:_audience,
            claims:claims,
            null,
            expires:DateTime.UtcNow.AddMinutes(10)
        );

        var token = new JwtSecurityToken(header,payload);

        return new JwtSecurityTokenHandler().WriteToken(token);

    }


    }
}