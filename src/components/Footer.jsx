import React from 'react'

const Footer = ({ 
  title = "Bitcoin Analytics Dashboard", 
  subtitle = "Built by Khushi Gusain • Data from CoinGecko API",
  lastUpdated 
}) => {
  return (
    <div className="mt-8">
      <div className="bg-[#1b1d27]/80 backdrop-blur-sm rounded-lg p-4 border border-[#333543]/40">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="text-xs text-[#a098c7]">{subtitle}</p>
          {lastUpdated && (
            <p className="text-xs text-[#666]">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Footer 