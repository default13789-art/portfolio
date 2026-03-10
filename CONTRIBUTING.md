# Contributing to the Portfolio

Thank you for your interest in contributing to this portfolio project!

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- A clear description of the enhancement
- Examples of how it would work
- Benefits of the enhancement

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   ```

2. Install dependencies:
   ```bash
   cd portfolio
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Coding Standards

- Use functional components and React hooks
- Follow the existing code style
- Write clean, readable code
- Add comments for complex logic
- Test your changes before submitting

## Project Structure

```
src/
├── components/
│   ├── layout/      # Layout components (Navbar, Footer)
│   ├── sections/    # Page sections (Hero, About, etc.)
│   └── ui/          # Reusable UI components
├── data/            # Portfolio data
└── styles/          # Global styles
```

## Style Guidelines

### Components

- Use functional components with hooks
- Use PropTypes or TypeScript for type checking
- Keep components small and focused
- Use meaningful component names

### CSS/Tailwind

- Use Tailwind utility classes when possible
- Create custom classes for complex styles
- Follow mobile-first approach
- Use semantic HTML

### File Naming

- Use PascalCase for components: `MyComponent.jsx`
- Use camelCase for utilities: `myUtility.js`
- Use kebab-case for assets: `my-image.png`

## Testing

Before submitting a PR, ensure:

- The development server runs without errors
- The production build succeeds
- The application works in multiple browsers
- Responsive design works on different screen sizes

## Documentation

If you add new features or make significant changes:

- Update the README if needed
- Add comments to complex code
- Update the SETUP.md if configuration changes are needed

## Questions?

Feel free to open an issue for any questions about contributing!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
