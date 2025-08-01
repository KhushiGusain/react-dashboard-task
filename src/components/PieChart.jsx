import React from 'react'
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const PieChart = ({ 
  data, 
  title = "Top 5 Cryptos by Market Cap", 
  subtitle = "Market share distribution of leading cryptocurrencies",
  onRefresh 
}) => {
  // Define modern colors that match the dashboard theme
  const COLORS = ['#a098c7', '#109173', '#F3BA2F', '#627EEA', '#9945FF', '#4A5568']
  
  // Crypto names mapping
  const cryptoNames = {
    'bitcoin': 'BTC',
    'ethereum': 'ETH', 
    'binancecoin': 'BNB',
    'ripple': 'XRP',
    'solana': 'SOL',
    'others': 'Others'
  }

  const formatMarketCap = (value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
    return `$${value.toLocaleString()}`
  }

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`
  }

  // Custom label renderer to prevent overlapping
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, index }) => {
    const RADIAN = Math.PI / 180
    // Position labels outside the pie chart
    const radius = outerRadius + 20
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    
    // Only show labels for segments with > 5% to avoid clutter
    if (percent < 0.05) {
      return null
    }
    
    // Get the color for this segment
    const segmentColor = COLORS[index % COLORS.length]
    
    return (
      <text 
        x={x} 
        y={y} 
        fill={segmentColor} 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="11"
        fontWeight="600"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="bg-[#1b1d27]/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-[#333543]/50 overflow-hidden">
      <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-[#333543]/30 bg-gradient-to-r from-[#10111a] to-[#1b1d27]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
          <div className="space-y-1 flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">{title}</h3>
            <p className="text-xs sm:text-sm text-[#a098c7] font-medium truncate">{subtitle}</p>
          </div>
          {onRefresh && (
            <button 
              onClick={onRefresh}
              className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#a098c7] to-[#8a7fb8] hover:from-[#8a7fb8] hover:to-[#7a6fa8] rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
            >
              <lord-icon
                src="https://cdn.lordicon.com/uewczsuz.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#a866ee,secondary:#121331"
                style={{ width: '20px', height: '20px', marginRight: '6px' }}
                className="sm:w-[20px] sm:h-[20px] sm:mr-2">
              </lord-icon>
              Refresh
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4 sm:p-8 pb-8 sm:pb-12">
        <ResponsiveContainer width="100%" height={300} className="sm:h-[400px]">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #333543',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                fontSize: '12px',
                color: '#1b1d27',
                fontWeight: '600'
              }}
              formatter={(value, name) => [formatMarketCap(value), cryptoNames[name] || name]}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '12px',
                color: '#a098c7'
              }}
              content={({ payload }) => (
                <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
                  {payload?.map((entry, index) => (
                    <div key={entry.value} className="flex items-center space-x-2 bg-[#1b1d27]/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-[#333543]/30 hover:bg-[#1b1d27]/70 transition-all duration-200">
                      <div 
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-xs font-medium text-white capitalize tracking-wide">
                        {cryptoNames[entry.value] || entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PieChart 