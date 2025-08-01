import { useState, useEffect } from 'react'

export const fetchPieData = (refreshInterval = 5 * 60 * 1000) => {
  const [globalData, setGlobalData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchGlobalData = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://api.coingecko.com/api/v3/global')
      if (!response.ok) {
        throw new Error('Failed to fetch global market data')
      }
      const data = await response.json()
      setGlobalData(data)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGlobalData()
    // Refresh data every 5 minutes
    const interval = setInterval(fetchGlobalData, refreshInterval)
    return () => clearInterval(interval)
  }, [refreshInterval])

  // Process data for pie chart
  const processPieChartData = () => {
    if (!globalData || !globalData.data) return null

    const { market_cap_percentage } = globalData.data
    
    // Get top 5 cryptos by market cap percentage
    const topCryptos = [
      { name: 'bitcoin', value: market_cap_percentage.btc || 0 },
      { name: 'ethereum', value: market_cap_percentage.eth || 0 },
      { name: 'binancecoin', value: market_cap_percentage.bnb || 0 },
      { name: 'ripple', value: market_cap_percentage.xrp || 0 },
      { name: 'solana', value: market_cap_percentage.sol || 0 }
    ]

    // Calculate others (remaining percentage)
    const top5Total = topCryptos.reduce((sum, crypto) => sum + crypto.value, 0)
    const othersPercentage = Math.max(0, 100 - top5Total)

    // Add others to the data
    const pieChartData = [
      ...topCryptos,
      { name: 'others', value: othersPercentage }
    ]

    return pieChartData
  }

  const pieChartData = processPieChartData()

  return {
    data: pieChartData,
    loading,
    error,
    lastUpdated,
    fetchGlobalData
  }
} 