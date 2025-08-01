import React from 'react'

const RefreshButton = ({ 
  onClick, 
  className = "inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#a098c7] to-[#8a7fb8] hover:from-[#8a7fb8] hover:to-[#7a6fa8] rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
}) => {
  return (
    <button 
      onClick={onClick}
      className={className}
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
  )
}

export default RefreshButton 