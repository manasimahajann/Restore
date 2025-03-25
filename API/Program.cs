using API.Data;
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

var app = builder.Build();

// Use CORS before controllers
app.UseCors("AllowFrontend");

app.MapControllers();

DbInitializer.InitDb(app);

app.Run();
