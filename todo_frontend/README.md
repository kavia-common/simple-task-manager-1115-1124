# Todo Frontend (React) for Simple Task Manager

This is a modern, lightweight React-based Todo web app UI with the following features:
- **Create todos**
- **Edit todos by double-click or using the edit button**
- **Delete todos**
- **Mark as completed or active**
- **Filter by all, completed, or active**
- **Stylish, modern, fully responsive, and accessible interface**
- **Custom colors:**  
  - Primary: `#1976d2`  
  - Accent: `#ff9800`  
  - Secondary: `#424242`  

## Layout Overview

- **Header**: App title and subtitle
- **Main**: 
  - Input at the top for adding new todos
  - Filter buttons and clear-completed button
  - Vertical todo item list with edit/delete/completion action buttons

## Getting Started

```sh
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

### Running tests

```sh
npm test
```

### Build for production

```sh
npm run build
```

## API Integration

This UI is **ready for integration with a backend API** for todo persistence.  
See `src/App.js` for locations marked with comments (e.g., "Backend API for...") to hook your API requests (fetch/axios).

## Styling and Customization

- Styles are managed in `src/App.css`
- Colors are set using CSS variables:
  - `--kavia-primary`, `--kavia-accent`, `--kavia-secondary`
- Modify layout or add more features as needed!

## Accessibility

- Uses semantic controls and accessible button labels
- Double-click or use button to edit todos

## Credits

Template bootstrapped with [KAVIA lightweight React template].  
Modern UI developed for code-generation test containers.
