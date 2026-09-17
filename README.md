# Siva Durga - Anime-Inspired Developer Portfolio

A modern, responsive portfolio website built with Next.js 14, Tailwind CSS, and Framer Motion.

## 🎨 Features

- **Modern Design**: Clean, aesthetic UI with anime-inspired elements
- **Smooth Animations**: Framer Motion animations throughout
- **Glassmorphism**: Modern glass effect on navbar and components
- **Responsive**: Mobile-first design that works on all devices
- **Dark Theme**: Beautiful dark navy and black with electric blue accents
- **Interactive Components**: Hover effects, floating animations, smooth transitions
- **Contact Form**: With validation using React Hook Form and Zod
- **Performance Optimized**: Next.js 14 with App Router

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Form Validation**: React Hook Form + Zod
- **Icons**: React Icons
- **Language**: TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/
│   ├── ui/
│   │   ├── Button.tsx     # Reusable button component
│   │   ├── Card.tsx       # Reusable card component
│   │   └── SectionHeading.tsx
│   ├── Navbar.tsx         # Navigation bar
│   ├── Hero.tsx           # Hero section
│   ├── About.tsx          # About section
│   ├── Skills.tsx         # Skills grid
│   ├── Projects.tsx       # Projects showcase
│   ├── Services.tsx       # Services section
│   ├── Contact.tsx        # Contact form
│   └── Footer.tsx         # Footer
├── public/                # Static assets
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript config
└── package.json
```

## 🎯 Sections

1. **Hero** - Eye-catching introduction with CTA buttons
2. **About** - Personal and professional information
3. **Skills** - Technology expertise with icon grid
4. **Projects** - Featured portfolio projects
5. **Services** - Services offered with descriptions
6. **Contact** - Contact form and social links
7. **Footer** - Social links and navigation

## 🎨 Customization

### Update Personal Information

Edit the following files to customize content:

- `components/Navbar.tsx` - Navigation links
- `components/Hero.tsx` - Hero content and CTAs
- `components/About.tsx` - Personal and professional info
- `components/Skills.tsx` - Skills list and categories
- `components/Projects.tsx` - Project showcases
- `components/Services.tsx` - Service offerings
- `components/Contact.tsx` - Contact information and social links
- `components/Footer.tsx` - Footer content

### Update Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  primary: {
    500: '#0ea5e9',  // Electric blue
    // ... other shades
  },
  secondary: {
    900: '#0f172a',  // Dark navy
    // ... other shades
  },
}
```

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

Deploy to Vercel with one click:

```bash
npm run build
vercel deploy
```

Or push to GitHub and connect to Vercel for automatic deployments.

## 📄 License

This project is open source and available under the MIT License.

## 🙋 Support

For questions or suggestions, feel free to reach out via the contact form on the portfolio.

---

**Built with 💙 using Next.js, Tailwind CSS, and Framer Motion**
