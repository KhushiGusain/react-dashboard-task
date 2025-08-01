import { useState, useEffect } from 'react'

export const useBitcoinData = (refreshInterval = 5 * 60 * 1000) => {
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
    const interval = setInterval(fetchBitcoinData, refreshInterval)
    return () => clearInterval(interval)
  }, [refreshInterval])

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

  return {
    data,
    loading,
    error,
    lastUpdated,
    fetchBitcoinData
  }
} 