# 🏗️ Component Structure Documentation

## 📁 Project Structure

```
src/
├── components/
│   ├── index.js          # Component exports
│   ├── Header.jsx        # Dashboard header with logo and last updated
│   ├── MetricCard.jsx    # Reusable metric card component
│   ├── PriceChart.jsx    # Reusable line chart component
│   ├── Footer.jsx        # Dashboard footer
│   ├── LoadingSpinner.jsx # Loading state component
│   └── ErrorDisplay.jsx  # Error state component
├── hooks/
│   └── useBitcoinData.js # Custom hook for Bitcoin data fetching
├── utils/
│   └── formatters.js     # Utility functions for data formatting
└── App.jsx               # Main application component
```

## 🧩 Component Breakdown

### 1. **Header Component** (`src/components/Header.jsx`)
- **Purpose**: Displays dashboard header with animated logo and last updated time
- **Props**:
  - `lastUpdated`: Date object for last update time
  - `title`: Dashboard title (default: "Bitcoin Dashboard")
  - `subtitle`: Dashboard subtitle (default: "Real-time cryptocurrency analytics")
- **Features**: 
  - Animated Lordicon logo
  - Responsive layout
  - Professional styling with backdrop blur

### 2. **MetricCard Component** (`src/components/MetricCard.jsx`)
- **Purpose**: Reusable card for displaying metrics with icons
- **Props**:
  - `icon`: React icon component
  - `title`: Metric title
  - `value`: Metric value (formatted)
  - `subtitle`: Metric description
  - `color`: Color theme ("emerald", "red", "blue", "purple")
  - `iconBgColor`: Custom icon background class
  - `iconBorderColor`: Custom icon border class
- **Features**:
  - Hover animations
  - Color-coded themes
  - Responsive design
  - Icon scaling on hover

### 3. **PriceChart Component** (`src/components/PriceChart.jsx`)
- **Purpose**: Reusable line chart for price data visualization
- **Props**:
  - `data`: Array of price data objects
  - `title`: Chart title (default: "Bitcoin Price Over Time")
  - `subtitle`: Chart description
  - `onRefresh`: Refresh function callback
  - `formatValue`: Y-axis value formatter
  - `strokeColor`: Line color (default: "#10b981")
  - `strokeWidth`: Line width (default: 3)
- **Features**:
  - Responsive chart container
  - Custom tooltips
  - Refresh button
  - Professional styling

### 4. **Footer Component** (`src/components/Footer.jsx`)
- **Purpose**: Dashboard footer with credits and information
- **Props**:
  - `title`: Footer title (default: "Bitcoin Analytics Dashboard")
  - `subtitle`: Footer description
  - `lastUpdated`: Optional last updated timestamp
- **Features**:
  - Clean, minimal design
  - Optional last updated display
  - Responsive layout

### 5. **LoadingSpinner Component** (`src/components/LoadingSpinner.jsx`)
- **Purpose**: Loading state display
- **Props**:
  - `title`: Loading title (default: "Loading Bitcoin Data")
  - `subtitle`: Loading description
  - `showBackground`: Toggle background effects
- **Features**:
  - Animated spinner
  - Cosmic background effects
  - Customizable messages

### 6. **ErrorDisplay Component** (`src/components/ErrorDisplay.jsx`)
- **Purpose**: Error state display with retry functionality
- **Props**:
  - `error`: Error message
  - `onRetry`: Retry function callback
  - `title`: Error title (default: "Error Loading Data")
  - `showBackground`: Toggle background effects
- **Features**:
  - Error icon
  - Retry button
  - Cosmic background effects

## 🎣 Custom Hooks

### **useBitcoinData Hook** (`src/hooks/useBitcoinData.js`)
- **Purpose**: Manages Bitcoin data fetching and processing
- **Parameters**:
  - `refreshInterval`: Auto-refresh interval in milliseconds (default: 5 minutes)
- **Returns**:
  - `data`: Processed Bitcoin data
  - `loading`: Loading state
  - `error`: Error state
  - `lastUpdated`: Last update timestamp
  - `fetchBitcoinData`: Manual refresh function
- **Features**:
  - Automatic data fetching
  - Error handling
  - Data processing
  - Auto-refresh functionality

## 🛠️ Utility Functions

### **Formatters** (`src/utils/formatters.js`)
- `formatPrice(price)`: Formats price to USD currency
- `formatPercentage(value, decimals)`: Formats percentage with sign
- `formatDate(date)`: Formats date to short format
- `formatTime(timestamp)`: Formats timestamp to time string

## 🚀 Benefits of This Structure

### ✅ **Reusability**
- Components can be easily reused across different dashboards
- Props allow customization without code duplication
- Consistent styling and behavior

### ✅ **Maintainability**
- Clear separation of concerns
- Easy to update individual components
- Centralized data fetching logic

### ✅ **Scalability**
- Easy to add new components
- Modular structure supports growth
- Custom hooks can be extended

### ✅ **Performance**
- Optimized re-renders with proper component structure
- Efficient data processing in custom hook
- Lazy loading ready

### ✅ **Developer Experience**
- Clear component documentation
- Consistent prop interfaces
- Easy testing and debugging

## 🔧 Usage Examples

### Basic Metric Card
```jsx
<MetricCard
  icon={ImCoinDollar}
  title="Current Price"
  value="$45,234.56"
  subtitle="Live Bitcoin Price"
  color="emerald"
/>
```

### Custom Chart
```jsx
<PriceChart
  data={priceData}
  title="Custom Price Chart"
  subtitle="Custom description"
  onRefresh={handleRefresh}
  strokeColor="#ff6b6b"
/>
```

### Custom Header
```jsx
<Header
  title="Custom Dashboard"
  subtitle="Custom analytics"
  lastUpdated={new Date()}
/>
```

## 🎨 Styling System

All components use Tailwind CSS with:
- Consistent color scheme (`#10111a`, `#1b1d27`, `#a098c7`)
- Backdrop blur effects
- Smooth transitions and animations
- Responsive design patterns
- Professional dark theme

This modular structure makes the dashboard highly maintainable, reusable, and scalable for future enhancements! 🚀 