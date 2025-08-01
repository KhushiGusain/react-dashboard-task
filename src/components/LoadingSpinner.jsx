import React from 'react'

const LoadingSpinner = ({ 
  title = "Loading Bitcoin Data", 
  subtitle = "Fetching 30-day price performance...",
  showBackground = true 
}) => {
  return (
    <div className="min-h-screen bg-[#10111a] flex items-center justify-center relative overflow-hidden">
      {showBackground && (
        <>
          <div className="absolute inset-0 bg-[#10111a] opacity-90"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
          }}></div>
        </>
      )}
      <div className="text-center relative z-10">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#a098c7] border-t-transparent mx-auto mb-4"></div>
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-[#a098c7]">{subtitle}</p>
      </div>
    </div>
  )
}

export default LoadingSpinner 