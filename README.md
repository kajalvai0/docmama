# DocMama - Professional Portfolio Website

A modern, fully-featured professional portfolio website with an integrated admin panel for managing content and appointments.

## Features

### Public Portfolio Site
- **Smart Slides Homepage**: Auto-rotating carousel with smooth animations
- **About Page**: Team information and achievements
- **Services Page**: Dynamic service listings with pricing
- **Portfolio Page**: Showcase of completed work with categories
- **Contact Page**: Appointment booking form integrated with database
- **Responsive Design**: Mobile-first design that works on all devices

### Admin Dashboard
- **Admin Authentication**: Secure login with admin credentials
  - Username: `admin`
  - Password: `admin123`
- **Dashboard**: Overview statistics and quick actions
- **Slides Management**: Add, edit, delete, and reorder homepage slides
- **Services Management**: Manage service offerings with pricing and duration
- **Portfolio Management**: Upload and manage portfolio items
- **Appointments Management**: View, confirm, and reject appointment requests
- **Contact Messages**: View all contact form submissions
- **Settings**: Site configuration and system information

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Form Handling**: React Hook Form

## Getting Started

### Prerequisites
- Node.js 18+ or higher
- Supabase account with project setup

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd docmama-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Admin Panel Access

1. Click the **Admin** button in the top right corner of the header
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. You'll be redirected to the admin dashboard

## Database Schema

The application uses the following tables:

### `slides`
- `id`: Primary key
- `title`: Slide title
- `description`: Slide description
- `image`: Image URL
- `cta_text`: Call-to-action button text
- `order`: Display order

### `services`
- `id`: Primary key
- `name`: Service name
- `description`: Service description
- `price`: Service price
- `duration`: Service duration

### `portfolio`
- `id`: Primary key
- `title`: Project title
- `description`: Project description
- `image`: Project image URL
- `category`: Project category

### `appointments`
- `id`: Primary key
- `name`: Client name
- `email`: Client email
- `phone`: Client phone
- `service`: Selected service
- `appointment_date`: Requested appointment date
- `message`: Additional message
- `status`: Appointment status (pending, confirmed, rejected)
- `created_at`: Submission timestamp

## Customization

### Change Admin Credentials
Update the credentials in `/app/api/admin/login/route.ts`:
```typescript
const ADMIN_USERNAME = 'your-username'
const ADMIN_PASSWORD = 'your-password'
```

### Customize Colors
Edit `/tailwind.config.ts` to change the color scheme:
```javascript
colors: {
  primary: '#1e3a5f',
  secondary: '#2563eb',
  // ... more colors
}
```

### Update Site Information
Visit the Admin Settings page to update site contact information and details.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project" and select your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

## Security Notes

- Admin credentials are stored in environment variables
- All database queries use parameterized statements
- Sensitive data is protected with proper access control
- Consider implementing email verification for appointments
- Regularly backup your Supabase database

## Support

For issues or questions, please check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is open source and available for personal and commercial use.

---

Built with ❤️ for professional portfolios
