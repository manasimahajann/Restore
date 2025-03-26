using API.Data;
using API.Middleware;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins("https://localhost:3000"));
});

builder.Services.AddControllers();

builder.Services.AddDbContext<StoreContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddTransient<ExceptionMiddlware>();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddlware>();

// Use CORS before controllers
app.UseCors("AllowFrontend");

app.MapControllers();

DbInitializer.InitDb(app);

app.Run();
