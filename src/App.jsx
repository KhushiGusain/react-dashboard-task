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
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#a098c7] border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Bitcoin Data</h2>
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
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Data</h2>
          <p className="text-[#a098c7] mb-6">{error}</p>
          <button 
            onClick={fetchBitcoinData}
            className="bg-gradient-to-r from-[#a098c7] to-[#8a7fb8] hover:from-[#8a7fb8] hover:to-[#7a6fa8] text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg"
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
          <div className="text-[#a098c7] text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-white mb-2">No Data Available</h2>
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
      <header className="relative z-10 bg-[#1b1d27]/80 backdrop-blur-sm border-b border-[#333543] shadow-lg">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div>
                <lord-icon
                  src="https://cdn.lordicon.com/rzhwlboq.json"
                  trigger="in"
                  delay="1500"
                  stroke="bold"
                  state="in-reveal"
                  style={{ width: '60px', height: '60px' }}>
                </lord-icon>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  Bitcoin Dashboard
                </h1>
                <p className="text-slate-400 text-base">
                  Real-time cryptocurrency analytics
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-[#a098c7] font-medium">Last Updated</p>
              <p className="text-white text-base font-semibold">
                {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10 relative z-10">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#1b1d27]/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#333543] p-6 hover:shadow-2xl transition-all duration-300 hover:bg-[#1b1d27]">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 bg-gradient-to-br from-[#a098c7] to-[#8a7fb8] rounded-xl flex items-center justify-center shadow-lg">
                <ImCoinDollar className="text-white text-3xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#a098c7] uppercase tracking-wide mb-2">Current Price</p>
                <p className="text-2xl font-bold text-white mb-1">{formatPrice(data.currentPrice)}</p>
                <p className="text-xs text-[#a098c7] font-medium">Live Bitcoin price</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1b1d27]/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#333543] p-6 hover:shadow-2xl transition-all duration-300 hover:bg-[#1b1d27]">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-xl flex items-center justify-center shadow-lg">
                <BsGraphUpArrow className="text-white text-3xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#10b981] uppercase tracking-wide mb-2">30-Day High</p>
                <p className="text-2xl font-bold text-white mb-1">{formatPrice(data.thirtyDayHigh)}</p>
                <p className="text-xs text-[#10b981] font-medium">Peak value</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1b1d27]/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#333543] p-6 hover:shadow-2xl transition-all duration-300 hover:bg-[#1b1d27]">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <BsGraphDownArrow className="text-white text-3xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-2">30-Day Low</p>
                <p className="text-2xl font-bold text-white mb-1">{formatPrice(data.thirtyDayLow)}</p>
                <p className="text-xs text-red-400 font-medium">Lowest value</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1b1d27]/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#333543] p-6 hover:shadow-2xl transition-all duration-300 hover:bg-[#1b1d27]">
            <div className="flex items-center space-x-5">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg ${
                data.priceChangePercent >= 0 
                  ? 'bg-gradient-to-br from-[#10b981] to-[#059669]' 
                  : 'bg-gradient-to-br from-red-500 to-red-600'
              }`}>
                <TbPercentage className="text-white text-3xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${
                  data.priceChangePercent >= 0 ? 'text-[#10b981]' : 'text-red-400'
                }`}>% Change</p>
                <p className={`text-2xl font-bold mb-1 ${
                  data.priceChangePercent >= 0 ? 'text-[#10b981]' : 'text-red-400'
                }`}>
                  {data.priceChangePercent >= 0 ? '+' : ''}{data.priceChangePercent.toFixed(2)}%
                </p>
                <p className={`text-xs font-medium ${
                  data.priceChangePercent >= 0 ? 'text-[#10b981]' : 'text-red-400'
                }`}>
                  {data.priceChangePercent >= 0 ? 'Gain' : 'Loss'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-[#1b1d27]/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#333543]">
          <div className="px-8 py-6 border-b border-[#333543] bg-gradient-to-r from-[#10111a] to-[#1b1d27]">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white tracking-tight">Bitcoin Price Over Time</h3>
                <p className="text-sm text-[#a098c7] font-medium">30-day performance analysis with real-time data</p>
              </div>
              <button 
                onClick={fetchBitcoinData}
                className="inline-flex items-center px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#a098c7] to-[#8a7fb8] hover:from-[#8a7fb8] hover:to-[#7a6fa8] rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
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
              <AreaChart data={data.prices}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333543" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#a098c7', fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: '#a098c7', fontSize: 11 }}
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
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                    fontSize: '12px',
                    color: '#ffffff'
                  }}
                  formatter={(value) => [formatPrice(value), 'Bitcoin Price']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fill="url(#colorPrice)"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-[#a098c7]">
            Data provided by CoinGecko API
          </p>
          <p className="text-xs text-[#666] mt-1">
            Auto-refreshes every 5 minutes • Last updated: {lastUpdated ? lastUpdated.toLocaleString() : 'Never'}
          </p>
          <p className="text-xs text-[#666] mt-2">
            Built by Khushi for CFL
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
