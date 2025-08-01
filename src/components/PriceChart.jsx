import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const PriceChart = ({ 
  data, 
  title = "Bitcoin Price Over Time", 
  subtitle = "30-day performance analysis with real-time data",
  onRefresh,
  formatValue = (value) => `$${(value / 1000).toFixed(0)}k`,
  strokeColor = "#10b981",
  strokeWidth = 3
}) => {
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
                style={{ width: '16px', height: '16px', marginRight: '6px' }}
                className="sm:w-[20px] sm:h-[20px] sm:mr-2">
              </lord-icon>
              Refresh
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4 sm:p-8">
        <ResponsiveContainer width="100%" height={300} className="sm:h-[400px]">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333543" strokeOpacity={0.2} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#a098c7', fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#a098c7', fontSize: 10 }}
              domain={['dataMin - 1000', 'dataMax + 1000']}
              tickFormatter={formatValue}
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
              formatter={(value) => [value, 'Price']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={strokeColor} 
              strokeWidth={strokeWidth}
              dot={false}
              activeDot={{ r: 5, stroke: strokeColor, strokeWidth: 2, fill: '#ffffff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PriceChart 