# Cryptocurrency Dashboard

A modern, responsive cryptocurrency dashboard built with React that displays real-time Bitcoin price data and global market statistics with beautiful visualizations.

## 🚀 Tech Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 5.2.8
- **Styling**: Tailwind CSS 4.1.11
- **Charts**: Recharts 3.1.0
- **Icons**: React Icons 5.5.0
- **Routing**: React Router DOM 7.7.1
- **Development**: ESLint, TypeScript support

## 📊 Features

- **Real-time Bitcoin Data**: Live price tracking with 30-day historical data
- **Interactive Charts**: Price charts and market cap distribution pie charts
- **Key Metrics**: Current price, 30-day high/low, price change percentage
- **Global Market Data**: Top 5 cryptocurrencies by market cap
- **Responsive Design**: Optimized for desktop and mobile devices
- **Auto-refresh**: Data updates every 5 minutes
- **Error Handling**: Graceful error states with retry functionality
- **Modern UI**: Dark theme with cosmic background effects

## 🛠️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Dashboard header
│   ├── Footer.jsx      # Footer component
│   ├── MetricCard.jsx  # Individual metric display cards
│   ├── PriceChart.jsx  # Bitcoin price chart component
│   ├── PieChart.jsx    # Market cap distribution chart
│   ├── LoadingSpinner.jsx # Loading state component
│   └── ErrorDisplay.jsx # Error state component
├── hooks/              # Custom React hooks
│   ├── fetchChartData.js    # Bitcoin price data fetching
│   └── fetchPieData.js      # Global market data fetching
├── utils/              # Utility functions
│   └── formatters.js   # Data formatting utilities
└── App.jsx            # Main application component
```

## 🎯 Approach

The dashboard follows a **component-based architecture** with custom hooks for data fetching:

1. **Custom Hooks**: Separated data fetching logic into reusable hooks (`fetchChartData`, `fetchPieData`)
2. **Component Composition**: Modular components for different UI elements
3. **Real-time Updates**: Automatic data refresh every 5 minutes
4. **Error Boundaries**: Comprehensive error handling with user-friendly messages
5. **Responsive Design**: Mobile-first approach with Tailwind CSS
6. **Performance**: Optimized with Vite for fast development and builds

## 🚀 How to Run Locally

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)
   - The app will automatically reload when you make changes

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The dashboard integrates with the **CoinGecko API**:
- Bitcoin price data: `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart`
- Global market data: `https://api.coingecko.com/api/v3/global`

## 📱 Features Overview

- **Live Bitcoin Price**: Real-time price with 30-day historical data
- **Market Metrics**: Current price, 30-day high/low, percentage change
- **Market Cap Distribution**: Interactive pie chart showing top 5 cryptocurrencies
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Auto-refresh**: Data updates automatically every 5 minutes
- **Error Recovery**: Retry functionality for failed API calls

## 🎨 Design Features

- **Dark Theme**: Modern dark UI with cosmic background effects
- **Gradient Effects**: Beautiful color gradients and shadows
- **Smooth Animations**: Hover effects and transitions
- **Interactive Charts**: Tooltips and custom labels
- **Loading States**: Elegant loading spinners
- **Error States**: User-friendly error messages

## 🔧 Customization

The dashboard is highly customizable:
- Modify refresh intervals in hook parameters
- Customize chart colors and styling
- Add new metrics or data sources
- Extend with additional cryptocurrency data

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using React and Vite**
