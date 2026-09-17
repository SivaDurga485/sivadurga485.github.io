# 🚀 Quick Start Guide - Siva Durga Portfolio

## Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager

## Installation Steps

### 1. Navigate to Project Directory
```bash
cd /Users/sivadurga/Projects\ Updated/App/portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

The portfolio will be available at: **http://localhost:3000**

## Build for Production

```bash
npm run build
npm start
```

## Project Features

✅ **Modern Next.js 14** - Latest React framework with App Router
✅ **Beautiful Design** - Dark theme with electric blue accents
✅ **Smooth Animations** - Framer Motion animations throughout
✅ **Fully Responsive** - Works perfectly on all devices
✅ **Contact Form** - With validation and error handling
✅ **Fast Performance** - Optimized for speed
✅ **TypeScript** - Type-safe development

## File Structure

```
portfolio/
├── app/                      # Next.js app directory
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
│
├── components/              # React components
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx      # Animated button component
│   │   ├── Card.tsx        # Reusable card wrapper
│   │   └── SectionHeading.tsx # Section titles
│   │
│   ├── Navbar.tsx          # Navigation with glassmorphism
│   ├── Hero.tsx            # Landing section
│   ├── About.tsx           # About me section
│   ├── Skills.tsx          # Tech stack showcase
│   ├── Projects.tsx        # Portfolio projects
│   ├── Services.tsx        # Services offered
│   ├── Contact.tsx         # Contact form + social
│   └── Footer.tsx          # Footer with links
│
├── public/                 # Static assets
│   └── images/            # Image files
│
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── tailwind.config.ts     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
├── next.config.js         # Next.js config
└── README.md              # Full documentation
```

## Customization Guide

### 1. Update Personal Info

**Edit `app/page.tsx`:**
- Change name and title
- Update subtitle
- Modify intro text

### 2. Add Your Photo

Replace the emoji in `components/Hero.tsx` with your image:

```jsx
// Current (emoji avatar)
<div className="text-6xl font-bold">💙</div>

// For image
import Image from 'next/image'
<Image 
  src="/images/your-photo.png" 
  alt="Profile" 
  width={256} 
  height={256}
/>
```

### 3. Update Links

Edit these files to add your real links:
- `components/Navbar.tsx` - Navigation URLs
- `components/Contact.tsx` - Email and social links
- `components/Footer.tsx` - Social media profiles

### 4. Modify Projects

Edit `components/Projects.tsx` - Update project array:
```jsx
const projects = [
  {
    title: 'Your Project',
    description: 'Project description',
    tech: ['Tech1', 'Tech2'],
    github: 'https://github.com/...',
    demo: 'https://...',
  },
  // Add more projects
]
```

### 5. Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#0ea5e9',  // Change electric blue
    600: '#0284c7',
    // ...
  },
  secondary: {
    900: '#0f172a',  // Change dark navy
    // ...
  },
}
```

### 6. Update Resume Link

In `components/Hero.tsx`, update the resume button:
```jsx
<Button variant="outline" size="lg">
  Download Resume <FiDownload />
</Button>
```
Make it a link to your resume PDF.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Run linting

## Environment Variables (Optional)

Create `.env.local` file for any environment-specific variables:
```
NEXT_PUBLIC_GITHUB_URL=https://github.com/your-username
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/your-profile
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy
5. Your site is live!

### Or Deploy Manually

```bash
npm run build
# Deploy the 'out' directory to your hosting provider
```

## Performance Tips

- Images are optimized with Next.js `<Image>` component
- CSS is purged and minified with Tailwind
- Animations use GPU acceleration
- Code splitting is automatic
- Lazy loading for images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Troubleshooting

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### Dependencies not installing?
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors?
```bash
npm run build
```

## Next Steps

1. Customize all personal information
2. Replace links with your actual URLs
3. Add your portfolio projects
4. Upload your resume
5. Test responsiveness on mobile
6. Deploy to Vercel

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

**Happy coding! 🚀**
