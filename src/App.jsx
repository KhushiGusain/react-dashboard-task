import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { ImCoinDollar } from "react-icons/im"
import { BsGraphUpArrow } from "react-icons/bs"
import { BsGraphDownArrow } from "react-icons/bs"
import { TbPercentage } from "react-icons/tb"
import './App.css'

function App() {
  const [bitcoinData, setBitcoinData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchBitcoinData = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30')
      if (!response.ok) {
        throw new Error('Failed to fetch Bitcoin data')
      }
      const data = await response.json()
      setBitcoinData(data)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBitcoinData()
    // Refresh data every 5 minutes
    const interval = setInterval(fetchBitcoinData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Process data for charts and metrics
  const processData = () => {
    if (!bitcoinData || !bitcoinData.prices) return null

    const prices = bitcoinData.prices.map(([timestamp, price]) => ({
      date: new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: price,
      timestamp: timestamp
    }))

    const currentPrice = prices[prices.length - 1]?.price || 0
    const firstPrice = prices[0]?.price || 0
    const thirtyDayHigh = Math.max(...prices.map(p => p.price))
    const thirtyDayLow = Math.min(...prices.map(p => p.price))
    const priceChange = currentPrice - firstPrice
    const priceChangePercent = firstPrice > 0 ? ((priceChange / firstPrice) * 100) : 0

    return {
      prices,
      currentPrice,
      firstPrice,
      thirtyDayHigh,
      thirtyDayLow,
      priceChange,
      priceChangePercent
    }
  }

  const data = processData()

  // Format price to USD
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#10111a] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#10111a] opacity-90"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
        }}></div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#a098c7] border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-white mb-2">Loading Bitcoin Data</h2>
          <p className="text-[#a098c7]">Fetching 30-day price performance...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#10111a] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#10111a] opacity-90"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
        }}></div>
        <div className="text-center max-w-md mx-auto p-8 relative z-10">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-white mb-2">Error Loading Data</h2>
          <p className="text-[#a098c7] mb-6">{error}</p>
          <button 
            onClick={fetchBitcoinData}
            className="bg-gradient-to-r from-[#a098c7] to-[#8a7fb8] hover:from-[#8a7fb8] hover:to-[#7a6fa8] text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg"
          >
            Retry
          </button>
        </div>
      </div>
    )
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

  return (
    <div className="min-h-screen bg-[#10111a] relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
      }}></div>
      
      {/* Header */}
      <header className="relative px-2 py-1 z-10 bg-[#1b1d27]/90 backdrop-blur-sm border-b border-[#333543] shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex-shrink-0">
                <lord-icon
                  src="https://cdn.lordicon.com/rzhwlboq.json"
                  trigger="in"
                  delay="1500"
                  stroke="bold"
                  state="in-reveal"
                  style={{ width: '70px', height: '70px' }}>
                </lord-icon>
              </div>
      <div>
                <h1 className="text-lg font-bold text-white mb-1">
                  Bitcoin Dashboard
                </h1>
                <p className="text-slate-400 text-sm font-medium">
                  Real-time cryptocurrency analytics
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-[#a098c7] font-medium uppercase tracking-wide">Last Updated</p>
              <p className="text-white text-sm font-semibold">
                {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 relative z-10">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#1b1d27]/95 backdrop-blur-sm rounded-2xl shadow-xl border border-[#333543]/50 p-6 hover:shadow-2xl transition-all duration-300 hover:bg-[#1b1d27] group">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-[#a098c7]/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-[#a098c7]/30">
                <ImCoinDollar className="text-2xl text-[#a098c7]" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide mb-2 text-emerald-400">Current Price</p>
                <p className="text-2xl font-bold text-white mb-1">{formatPrice(data.currentPrice)}</p>
                <p className="text-xs font-medium text-emerald-300">Live Bitcoin Price</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1b1d27]/95 backdrop-blur-sm rounded-2xl shadow-xl border border-[#333543]/50 p-6 hover:shadow-2xl transition-all duration-300 hover:bg-[#1b1d27] group">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-[#a098c7]/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-[#a098c7]/30">
                <BsGraphUpArrow className="text-2xl text-[#a098c7]" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide mb-2 text-emerald-400">30-Day High</p>
                <p className="text-2xl font-bold text-white mb-1">{formatPrice(data.thirtyDayHigh)}</p>
                <p className="text-xs font-medium text-emerald-300">Peak Performance</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1b1d27]/95 backdrop-blur-sm rounded-2xl shadow-xl border border-[#333543]/50 p-6 hover:shadow-2xl transition-all duration-300 hover:bg-[#1b1d27] group">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-[#a098c7]/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-[#a098c7]/30">
                <BsGraphDownArrow className="text-2xl text-[#a098c7]" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide mb-2 text-red-400">30-Day Low</p>
                <p className="text-2xl font-bold text-white mb-1">{formatPrice(data.thirtyDayLow)}</p>
                <p className="text-xs font-medium text-red-300">Lowest Point</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1b1d27]/95 backdrop-blur-sm rounded-2xl shadow-xl border border-[#333543]/50 p-6 hover:shadow-2xl transition-all duration-300 hover:bg-[#1b1d27] group">
            <div className="flex items-center space-x-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border ${
                data.priceChangePercent >= 0 
                  ? 'bg-[#a098c7]/20 backdrop-blur-sm border-[#a098c7]/30' 
                  : 'bg-[#a098c7]/20 backdrop-blur-sm border-[#a098c7]/30'
              }`}>
                <TbPercentage className="text-2xl text-[#a098c7]" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide mb-2 text-emerald-400">30-Day Change</p>
                <p className={`text-2xl font-bold mb-1 ${
                  data.priceChangePercent >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {data.priceChangePercent >= 0 ? '+' : ''}{data.priceChangePercent.toFixed(2)}%
                </p>
                <p className={`text-xs font-medium ${
                  data.priceChangePercent >= 0 ? 'text-emerald-300' : 'text-red-300'
                }`}>
                  {data.priceChangePercent >= 0 ? 'Positive Growth' : 'Decline'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-[#1b1d27]/95 backdrop-blur-sm rounded-2xl shadow-xl border border-[#333543]/50 overflow-hidden">
          <div className="px-8 py-6 border-b border-[#333543]/30 bg-gradient-to-r from-[#10111a] to-[#1b1d27]">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white tracking-tight">Bitcoin Price Over Time</h3>
                <p className="text-sm text-[#a098c7] font-medium">30-day performance analysis with real-time data</p>
      </div>
              <button 
                onClick={fetchBitcoinData}
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#a098c7] to-[#8a7fb8] hover:from-[#8a7fb8] hover:to-[#7a6fa8] rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
        </button>
            </div>
          </div>
          
          <div className="p-8">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data.prices} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333543" strokeOpacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#a098c7', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: '#a098c7', fontSize: 12 }}
                  domain={['dataMin - 1000', 'dataMax + 1000']}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1b1d27', 
                    border: '1px solid #333543',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                    fontSize: '12px',
                    color: '#ffffff'
                  }}
                  formatter={(value) => [formatPrice(value), 'Bitcoin Price']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, stroke: '#10b981', strokeWidth: 2, fill: '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <div className="bg-[#1b1d27]/80 backdrop-blur-sm rounded-lg p-4 border border-[#333543]/40">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm font-medium text-white">Bitcoin Analytics Dashboard</p>
              <p className="text-xs text-[#a098c7]">Built by Khushi Gusain • Data from CoinGecko API</p>
              <p className="text-xs text-[#666]">
                {lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Never updated'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
