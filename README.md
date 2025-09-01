# Calculator Web App

A beautiful, fully-featured calculator web application built with React, TypeScript, and Tailwind CSS.

## Features

- **Complete Calculator Functionality**: Basic arithmetic operations (+, -, ×, ÷)
- **Memory Functions**: MC (Memory Clear), MR (Memory Recall), M+ (Memory Add), M- (Memory Subtract)
- **Calculation History**: Track and view your recent calculations
- **Keyboard Support**: Use your keyboard for faster input
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Glassmorphic design with smooth animations

## Live Demo

🚀 **[View Live Application](https://simple-calculator-we-33p2.bolt.host)**

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd calculator-web-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support

## Project Structure

```
src/
├── components/
│   ├── Calculator.tsx    # Main calculator component
│   └── History.tsx       # Calculation history component
├── App.tsx              # Root application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## Features in Detail

### Calculator Operations
- Basic arithmetic: addition, subtraction, multiplication, division
- Decimal number support
- Clear and backspace functionality
- Error handling for invalid operations

### Memory Functions
- **MC (Memory Clear)**: Clears the memory
- **MR (Memory Recall)**: Recalls the value stored in memory
- **M+ (Memory Add)**: Adds current display value to memory
- **M- (Memory Subtract)**: Subtracts current display value from memory

### Keyboard Shortcuts
- `0-9`: Number input
- `+`, `-`, `*`, `/`: Operations
- `Enter` or `=`: Calculate result
- `Escape` or `C`: Clear calculator
- `Backspace`: Delete last digit
- `.`: Decimal point

### History
- Automatically saves the last 50 calculations
- Shows timestamp for each calculation
- Clear history functionality
- Toggle history panel visibility

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with modern web technologies for optimal performance
- Designed with accessibility and user experience in mind
- Responsive design ensures compatibility across all devices