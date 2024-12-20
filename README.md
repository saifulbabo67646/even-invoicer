# Invoice Generator

A modern invoice generator built with SvelteKit and TypeScript. This application allows you to create and manage professional invoices with ease.

## Demo

<video width="100%" controls>
  <source src="static/demo.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Prerequisites

- [Bun](https://bun.sh) installed on your machine
- Node.js (v18 or higher recommended)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/saifulbabo67646/even-invoicer.git
cd even-invoicer
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun dev
```

The application will be available at `http://localhost:5173`

## Building for Production

1. Create a production build:
```bash
bun run build
```

2. Preview the production build:
```bash
bun run preview
```

## Development

To check for TypeScript errors:
```bash
bun run check
```

For continuous type checking during development:
```bash
bun run check:watch
```

## Project Structure

- `/src` - Source code
  - `/routes` - SvelteKit routes
  - `/lib` - Reusable components and utilities
    - `/components` - Svelte components
    - `/utils` - Utility functions

## Technologies Used

- SvelteKit - Web application framework
- TypeScript - Type safety
- TailwindCSS - Styling
- PDFMake - PDF generation
- PapaParse - CSV parsing

> Note: This project uses [Bun](https://bun.sh) as the JavaScript runtime and package manager. Make sure you have it installed on your system.
