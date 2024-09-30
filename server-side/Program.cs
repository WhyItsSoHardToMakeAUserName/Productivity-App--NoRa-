using Microsoft.EntityFrameworkCore;
using server_side.Context;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

builder.Services.AddDbContext<FinanceTrackerDataContext>(options =>
options.UseNpgsql(Environment.GetEnvironmentVariable("CONNECTION_STRING"))
);

// Add services to the container.

builder.Services.AddControllersWithViews();


builder.Services.AddCors(options =>{
    options.AddPolicy("AllowSpecificOrigin",
    policy=>{
        policy.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();

    });
});

var app = builder.Build();

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

app.Run();
