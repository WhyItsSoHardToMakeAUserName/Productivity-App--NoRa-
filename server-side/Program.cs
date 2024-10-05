using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using server_side.Context;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

builder.Services.AddDbContext<FinanceTrackerDataContext>(options =>
options.UseNpgsql(Environment.GetEnvironmentVariable("CONNECTION_STRING"))
);

// Add services to the container.

builder.Services.AddControllers();


builder.Services.AddCors(options =>{
    options.AddPolicy("AllowSpecificOrigin",
    policy=>{
        policy.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();

    });
});

builder.Services.AddSwaggerGen(c=>
{
    c.SwaggerDoc("v1", new OpenApiInfo {Title = "My API" , Version = "v1"});
});
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();
if(app.Environment.IsDevelopment())
{
    app.UseSwagger();
        app.UseSwaggerUI(options => // UseSwaggerUI is called only in Development.
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });

    app.UseDeveloperExceptionPage();
}

app.UseCors("AllowSpecificOrigin");

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();


app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();
