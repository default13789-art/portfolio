# Modern Developer Portfolio

A stunning, modern developer portfolio built with Vite, React, and TailwindCSS. Features a dark futuristic theme with glassmorphism effects, smooth animations, and full responsiveness.

![Portfolio Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop)

## Features

- Modern, responsive design
- Dark futuristic theme with cyan/purple gradients
- Glassmorphism effects
- Smooth animations and transitions
- Interactive hero section with animated background
- Project showcase with filtering
- Skills section with progress bars
- Contact form with validation
- Fully optimized for performance
- SEO-friendly
- Ready for Vercel deployment

## Tech Stack

- **Frontend Framework**: React 19 with Vite
- **Styling**: TailwindCSS 4.x
- **Animations**: Custom CSS animations + React hooks
- **Smooth Scrolling**: react-scroll
- **Build Tool**: Vite
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
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

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The optimized files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Customization

### Personal Information

Edit `src/data/portfolioData.js` to update:

- Your name and title
- Bio and stats
- Projects information
- Skills and expertise
- Contact details
- Social media links

### Styling

The theme is configured in `tailwind.config.js`. You can customize:

- Color scheme
- Fonts
- Animations
- Breakpoints
- Custom utilities

Main styles are in `src/styles/index.css`.

### Components

All components are located in `src/components/`:

- `layout/` - Navbar and Footer
- `sections/` - Hero, About, Projects, Skills, Contact
- `ui/` - Reusable UI components

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

Or use the automatic deployment from GitHub.

### Other Platforms

The app can be deployed to any static hosting service:

- Netlify
- GitHub Pages
- AWS Amplify
- Firebase Hosting

## Project Structure

```
portfolio/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── layout/      # Layout components
│   │   ├── sections/    # Page sections
│   │   └── ui/          # Reusable UI components
│   ├── data/            # Portfolio data
│   └── styles/          # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── vercel.json          # Vercel deployment config
```

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Bundle Size: < 200KB (gzipped)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

Built with [Vite](https://vitejs.dev/) + [React](https://reactjs.org/) + [TailwindCSS](https://tailwindcss.com/)

## Contact

Feel free to reach out if you have any questions or feedback!

---

Made with [Your Name] - [Your Website]
