# Backend Configuration Required

## Add CORS Support to Program.cs

Your backend needs to enable CORS to allow the frontend (running on `http://localhost:5173` or `http://localhost:5174`) to communicate with the API.

### Update your `Program.cs`:

```csharp
using library_management_system_backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add controllers
builder.Services.AddControllers();

// Use built-in OpenAPI (Swagger replacement)
builder.Services.AddOpenApi();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

// SQLite DB connection
builder.Services.AddDbContext<AppDbContext>(options =>
	options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	// Serve OpenAPI JSON & UI
	app.MapOpenApi();
}

// Enable CORS
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```

## Frontend Configuration

The frontend is already configured to connect to:
- **Backend API URL**: `http://localhost:5119`

## API Endpoints

All endpoints are properly configured in the frontend:

### Books
- `GET /api/Book/getAllBooks` - Get all books
- `GET /api/Book/getBook/{id}` - Get single book
- `POST /api/Book/addBook` - Add new book
- `PUT /api/Book/updateBook/{id}` - Update book
- `DELETE /api/Book/deleteBook/{id}` - Delete book

### Authentication (Future)
- `POST /api/Auth/login` - User login
- `POST /api/Auth/register` - User registration

## Book Model Structure

Frontend matches the backend Book model:
```typescript
interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}
```

**Note**: ISBN field has been removed to match your backend model.

## Running the Application

1. Start the backend on `http://localhost:5119`
2. Start the frontend with `npm run dev`
3. The frontend will automatically connect to the backend API

## Testing

1. Navigate to `http://localhost:5173` (or `http://localhost:5174`)
2. You should see the login page
3. After authentication, you can manage books through the CRUD interface
