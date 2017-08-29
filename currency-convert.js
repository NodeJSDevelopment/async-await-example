const axios = require('axios')

const getExchangeRate = async (base, to) => {
  try {
    const response = await axios.get(`http://api.fixer.io/latest?base=${base}`)
    const rate = response.data.rates[to]

    if (rate) {
      return rate
    } else {
      throw new Error()
    }
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${base} and ${to}.`)
  }
}

const getCountries = async currencyCode => {
  try {
    const response = await axios.get(`http://restcountries.eu/rest/v2/currency/${currencyCode}`)

    return response.data.map(country => country.name)
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}`)
  }
}

const convertCurrency = (base, to, amount) => {
  let countries

  return getCountries(to).then(tempCountries => {
    countries = tempCountries
    return getExchangeRate(base, to)
  }).then(rate => {
    const exchangedAmount = amount * rate

    return `${amount} ${base} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`
  })
}

// async await version
const convertCurrencyAsync = async (base, to, amount) => {
  const countries = await getCountries(to)
  const rate = await getExchangeRate(base, to)
  const exchangedAmount = amount * rate

  return `${amount} ${base} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`
}

convertCurrencyAsync('USD', 'CAD', 100)
  .then(res => console.log(res))
  .catch(e => console.log(e))

// convertCurrency('USD', 'CAD', 100)
//   .then(res => console.log(res))

// getExchangeRate('USD', 'CAD').then(rate => {
//   console.log(rate)
// })

// getCountries('USD').then(countries => console.log(countries))
