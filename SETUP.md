# Portfolio Setup Guide

This guide will help you set up and customize your new portfolio website.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Customization

### 1. Update Personal Information

Edit `/src/data/portfolioData.js` to customize:

- **Hero Section:** Name, title, tagline, social links
- **About Section:** Bio, stats, highlights
- **Projects:** Add your own projects with images, descriptions, tech stack
- **Skills:** Update your skills and proficiency levels
- **Contact:** Email, phone, location, social links

### 2. Add Your Own Project Images

Replace the placeholder images in `portfolioData.js` with your own project screenshots:

```javascript
image: "https://your-image-url.com/project.jpg"
```

Or use local images:
```javascript
image: "/src/assets/your-project.jpg"
```

### 3. Customize Colors

Edit `/tailwind.config.js` to change the color scheme:

Currently using:
- Primary: Cyan (#05b5d4, #3ce6f9)
- Secondary: Purple (#a855f7, #c084fc)
- Background: Dark (#0a0a0f, #12121a)

### 4. Update SEO Meta Tags

Edit `/index.html` to update:
- Page title
- Meta description
- Open Graph tags for social sharing

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to deploy

### Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Drag the `dist` folder to Netlify

### GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. Push to GitHub and enable GitHub Pages in repository settings

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Folder Structure

```
portfolio/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── layout/      # Navbar, Footer
│   │   ├── sections/    # Hero, About, Projects, Skills, Contact
│   │   └── ui/          # Reusable components
│   ├── data/            # Portfolio data
│   └── styles/          # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── vercel.json          # Vercel deployment config
```

## Tips

1. **Images:** Use WebP format for better performance
2. **Performance:** Optimize images before adding them
3. **SEO:** Update meta tags with relevant keywords
4. **Testing:** Test on multiple devices before deploying
5. **Analytics:** Add Google Analytics or similar for tracking

## Support

For issues or questions:
- Check the [Vite documentation](https://vitejs.dev/)
- Check the [React documentation](https://reactjs.org/)
- Check the [TailwindCSS documentation](https://tailwindcss.com/)

## License

This portfolio is open source and available under the MIT License.
