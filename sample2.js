const format = (num) => {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  const formatted = Number(num).toLocaleString('en', options)
  return formatted
}

console.log(format('20120'))
