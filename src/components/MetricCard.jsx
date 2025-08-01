import React from 'react'

const MetricCard = ({ 
  icon: Icon, 
  title, 
  value, 
  subtitle, 
  color = "emerald", 
  iconBgColor = "bg-[#a098c7]/20",
  iconBorderColor = "border-[#a098c7]/30"
}) => {
  const colorClasses = {
    emerald: {
      title: "text-emerald-400",
      subtitle: "text-emerald-300"
    },
    red: {
      title: "text-red-400", 
      subtitle: "text-red-300"
    },
    blue: {
      title: "text-blue-400",
      subtitle: "text-blue-300"
    },
    purple: {
      title: "text-purple-400",
      subtitle: "text-purple-300"
    }
  }

  const currentColor = colorClasses[color] || colorClasses.emerald

  return (
    <div className="bg-[#1b1d27]/95 backdrop-blur-sm rounded-2xl shadow-xl border border-[#333543]/50 p-6 hover:shadow-2xl transition-all duration-300 hover:bg-[#1b1d27] group">
      <div className="flex items-center space-x-4">
        <div className={`w-14 h-14 ${iconBgColor} backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border ${iconBorderColor}`}>
          <Icon className="text-2xl text-[#a098c7]" />
        </div>
        <div className="flex-1">
          <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${currentColor.title}`}>
            {title}
          </p>
          <p className="text-2xl font-bold text-white mb-1">{value}</p>
          <p className={`text-xs font-medium ${currentColor.subtitle}`}>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MetricCard 