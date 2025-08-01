import React from 'react'

const Header = ({ lastUpdated, title = "Bitcoin Dashboard", subtitle = "Real-time cryptocurrency analytics" }) => {
  return (
    <header className="relative px-2 py-1 z-10 bg-[#1b1d27]/90 backdrop-blur-sm border-b border-[#333543] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center py-3 sm:py-4 space-y-3 sm:space-y-0">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <div className="flex-shrink-0">
              <lord-icon
                src="https://cdn.lordicon.com/rzhwlboq.json"
                trigger="morph"
                stroke="bold"
                state="morph-alone"
                colors="primary:#121331,secondary:#ebe6ef,tertiary:#109173"
                style={{ width: '50px', height: '50px' }}
                className="sm:w-[70px] sm:h-[70px]">
              </lord-icon>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-base sm:text-lg font-bold text-white mb-1">
                {title}
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm font-medium">
                {subtitle}
              </p>
            </div>
          </div>
          
          <div className="text-center sm:text-right">
            <p className="text-xs text-[#a098c7] font-medium uppercase tracking-wide">Last Updated</p>
            <p className="text-white text-sm font-semibold">
              {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 