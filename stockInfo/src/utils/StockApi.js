const apiKey = "85e0b59949f37b05b283ad2bff14179b"

export async function getBasicStockInfo(symbol) {
  symbol = symbol.toUpperCase()
  const url = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`
  const response = await fetch(url) 
  const data = response.json()
  return data
}

export async function getFinancialStockInfo(symbol) {
  symbol = symbol.toUpperCase()
  const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`
  const response = await fetch(url) 
  const data = response.json()
  return data
}

export async function getRating(symbol) {
  symbol = symbol.toUpperCase()
  const url = `https://financialmodelingprep.com/api/v3/ratine/${symbol}?apikey=${apiKey}`
  const response = await fetch(url) 
  const data = response.json()
  return data
}