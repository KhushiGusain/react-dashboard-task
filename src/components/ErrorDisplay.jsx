import React from 'react'

const ErrorDisplay = ({ 
  error, 
  onRetry, 
  title = "Error Loading Data",
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
      <div className="text-center max-w-md mx-auto p-8 relative z-10">
        <div className="text-red-400 text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-[#a098c7] mb-6">{error}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="bg-gradient-to-r from-[#a098c7] to-[#8a7fb8] hover:from-[#8a7fb8] hover:to-[#7a6fa8] text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorDisplay 