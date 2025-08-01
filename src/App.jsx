import React from 'react'
import { ImCoinDollar } from "react-icons/im"
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs"
import { TbPercentage } from "react-icons/tb"
import Header from './components/Header'
import MetricCard from './components/MetricCard'
import PriceChart from './components/PriceChart'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorDisplay from './components/ErrorDisplay'
import { fetchData } from './hooks/fetchData'
import { formatPrice, formatPercentage } from './utils/formatters'
import './App.css'

function App() {
  const { data, loading, error, lastUpdated, fetchBitcoinData } = fetchData()

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={fetchBitcoinData} />
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#10111a] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#10111a] opacity-90"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
        }}></div>
        <div className="text-center relative z-10">
          <div className="text-[#a098c7] text-4xl mb-4">📊</div>
          <h2 className="text-xl font-bold text-white mb-2">No Data Available</h2>
          <p className="text-[#a098c7]">Unable to process Bitcoin data</p>
        </div>
      </div>
    )
  }

  const metricCards = [
    {
      icon: ImCoinDollar,
      title: "Current Price",
      value: formatPrice(data.currentPrice),
      subtitle: "Live Bitcoin Price",
      color: "emerald"
    },
    {
      icon: BsGraphUpArrow,
      title: "30-Day High",
      value: formatPrice(data.thirtyDayHigh),
      subtitle: "Peak Performance",
      color: "emerald"
    },
    {
      icon: BsGraphDownArrow,
      title: "30-Day Low",
      value: formatPrice(data.thirtyDayLow),
      subtitle: "Lowest Point",
      color: "red"
    },
    {
      icon: TbPercentage,
      title: "30-Day Change",
      value: formatPercentage(data.priceChangePercent),
      subtitle: data.priceChangePercent >= 0 ? "Positive Growth" : "Decline",
      color: data.priceChangePercent >= 0 ? "emerald" : "red"
    }
  ]

  return (
    <div className="min-h-screen bg-[#10111a] relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
      }}></div>
      
      {/* Header */}
      <Header lastUpdated={lastUpdated} />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 relative z-10">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCards.map((card, index) => (
            <MetricCard
              key={index}
              icon={card.icon}
              title={card.title}
              value={card.value}
              subtitle={card.subtitle}
              color={card.color}
            />
          ))}
        </div>

        {/* Price Chart */}
        <PriceChart
          data={data.prices}
          onRefresh={fetchBitcoinData}
          formatValue={(value) => `$${(value / 1000).toFixed(0)}k`}
        />

        {/* Footer */}
        <Footer lastUpdated={lastUpdated} />
      </div>
    </div>
  )
}

export default App
