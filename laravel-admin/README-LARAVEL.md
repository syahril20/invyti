# TailAdmin Laravel - Free Laravel Tailwind Admin Dashboard Template

TailAdmin Laravel is a free and open-source admin dashboard template built with **Laravel 11 and Tailwind CSS**, providing developers with everything they need to create a feature-rich and data-driven backend, dashboard, or admin panel solution.

This is the **PHP Laravel version** of the popular TailAdmin Next.js template, bringing the same beautiful UI and functionality to the Laravel ecosystem.

## Features

- 🚀 Built with Laravel 11.x
- 🎨 Styled with Tailwind CSS V4
- 🔐 Authentication system with Laravel Breeze
- 🌙 Dark mode support
- 📊 Interactive charts with ApexCharts
- 📅 Calendar functionality with FullCalendar
- 📱 Fully responsive design
- 🎯 Clean and modern UI components
- ⚡ Server-side rendering with Blade templates

## Pages Included

- **Dashboard** - Overview with statistics cards and charts
- **Tables** - Data tables with sorting and actions
- **Charts** - Bar, line, and area charts
- **UI Elements** - Buttons, alerts, and form elements
- **Calendar** - Interactive calendar with events
- **Profile** - User profile management
- **Authentication** - Login, register, and password reset

## Installation

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18.x or later
- SQLite, MySQL, or PostgreSQL

### Setup Instructions

1. **Navigate to the Laravel directory:**
   ```bash
   cd laravel-admin
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Install Node dependencies:**
   ```bash
   npm install
   ```

4. **Configure environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure database:**
   - For SQLite (default): Database file is already created at `database/database.sqlite`
   - For MySQL: Update `.env` with your database credentials

6. **Run migrations:**
   ```bash
   php artisan migrate
   ```

7. **Build assets:**
   ```bash
   npm run build
   ```

8. **Start development server:**
   ```bash
   php artisan serve
   ```

9. **Visit your application:**
   ```
   http://localhost:8000
   ```

## Development

### Run development server with hot reload:
```bash
# Terminal 1 - Laravel server
php artisan serve

# Terminal 2 - Vite dev server
npm run dev
```

### Build for production:
```bash
npm run build
```

## Project Structure

```
laravel-admin/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── DashboardController.php
│   └── ...
├── resources/
│   ├── views/
│   │   ├── layouts/
│   │   │   └── admin.blade.php       # Main admin layout
│   │   ├── dashboard.blade.php       # Dashboard page
│   │   ├── tables.blade.php          # Tables page
│   │   ├── charts.blade.php          # Charts page
│   │   ├── ui-elements.blade.php     # UI Elements page
│   │   └── calendar.blade.php        # Calendar page
│   └── css/
│       └── app.css                   # Tailwind CSS
├── routes/
│   └── web.php                       # Web routes
└── public/
    └── build/                        # Compiled assets
```

## Features Comparison

### Laravel Version vs Next.js Version

| Feature | Laravel | Next.js |
|---------|---------|---------|
| Framework | Laravel 11 | Next.js 15 |
| Language | PHP | TypeScript |
| Rendering | Server-side (Blade) | SSR/SSG |
| Styling | Tailwind CSS V4 | Tailwind CSS V4 |
| Authentication | Laravel Breeze | Next.js + Server Actions |
| Database | Eloquent ORM | N/A (API-based) |
| Charts | ApexCharts | ApexCharts |
| Calendar | FullCalendar | FullCalendar |

## Technology Stack

- **Backend:** Laravel 11.x
- **Frontend:** Blade Templates
- **Styling:** Tailwind CSS V4
- **Build Tool:** Vite
- **Authentication:** Laravel Breeze
- **Charts:** ApexCharts
- **Calendar:** FullCalendar
- **Icons:** SVG Icons
- **Dark Mode:** Alpine.js + LocalStorage

## Creating Your First User

Register a new user by visiting:
```
http://localhost:8000/register
```

Or create a user via Tinker:
```bash
php artisan tinker
```

```php
User::create([
    'name' => 'Admin User',
    'email' => 'admin@example.com',
    'password' => Hash::make('password'),
]);
```

## Customization

### Changing Colors

Edit `resources/css/app.css` to customize colors and theme:

```css
@layer base {
  :root {
    --primary: 59 130 246; /* Blue */
    --success: 16 185 129; /* Green */
  }
}
```

### Adding New Pages

1. Create a new Blade view in `resources/views/`
2. Add route in `routes/web.php`
3. Add controller method if needed
4. Add navigation link in `resources/views/layouts/admin.blade.php`

## License

TailAdmin Laravel is released under the MIT License.

## Support & Credits

This Laravel version is based on the original [TailAdmin Next.js template](https://github.com/TailAdmin/free-nextjs-admin-dashboard) created by TailAdmin.

- Original Next.js Version: [TailAdmin Next.js](https://github.com/TailAdmin/free-nextjs-admin-dashboard)
- Website: [tailadmin.com](https://tailadmin.com)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
