function exponentialFormat(num, precision, mantissa = true) {
  let e = num.log10().floor()
  let m = num.div(Decimal.pow(10, e))
  if (num.gte("ee9")) mantissa = false
  if (m.toStringWithDecimalPlaces(precision) == 10) {
    m = decimalOne
    e = e.add(1)
  }
  e = e.gte(1e9) ? format(e, 3) : e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0)
  if (mantissa) return m.toStringWithDecimalPlaces(precision) + 'e' + e
  else return 'e' + e
}

function commaFormat(num, precision) {
  if (num === null || num === undefined) return 'NaN'
  if (num.mag < 0.001) return (0).toFixed(precision)
  let init = num.toStringWithDecimalPlaces(precision)
  let portions = init.split('.')
  portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  if (portions.length == 1) return portions[0]
  return portions[0] + '.' + portions[1]
}

function regularFormat(num, precision) {
  if (num === null || num === undefined) return 'NaN'
  if (num.mag < 0.0001) return (0).toFixed(precision)
  if (num.mag < 0.1 && precision !== 0) precision = Math.max(precision, 4)
  return num.toStringWithDecimalPlaces(precision)
}

function fixValue(x, y = 0) {
  return x || new Decimal(y)
}

function sumValues(x) {
  x = Object.values(x)
  if (!x[0]) return decimalZero
  return x.reduce((a, b) => Decimal.add(a, b))
}

function format(decimal, precision = 3) {
  decimal = new Decimal(decimal)
  if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
    player.hasNaN = true
    return 'NaN'
  }
  if (decimal.sign < 0) return '-' + format(decimal.neg(), precision, small)
  if (decimal.mag == Number.POSITIVE_INFINITY) return 'Infinity'
  if (decimal.gte('eeee1000')) {
    var slog = decimal.slog()
    if (slog.gte(1e6)) return 'F' + format(slog.floor())
    else return Decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + 'F' + commaFormat(slog.floor(), 0)
  } else if (decimal.gte(1e9)) return exponentialFormat(decimal, precision)
  else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
  else if (decimal.gte(0.001)) return regularFormat(decimal, precision)
  else if (decimal.gte('eeee-1000')) return exponentialFormat(decimal, precision)
  else if (decimal.gt(0)) return '1/' + format(decimal.recip())
  else if (decimal.eq(0)) return (0).toFixed(precision)
}

function formatWhole(decimal) {
  decimal = new Decimal(decimal)
  if (decimal.gte(1e9)) return format(decimal, 3)
  if (decimal.lte(0.99) && !decimal.eq(0)) return format(decimal, 3)
  return format(decimal, 0)
}

function formatTime(s) {
  if (s < 60) return format(s) + 's'
  else if (s < 3600) return formatWhole(Math.floor(s / 60)) + 'm ' + format(s % 60) + 's'
  else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + 'h ' + formatWhole(Math.floor(s / 60) % 60) + 'm ' + format(s % 60) + 's'
  else if (s < 31536000)
    return (
      formatWhole(Math.floor(s / 86400) % 365) +
      'd ' +
      formatWhole(Math.floor(s / 3600) % 24) +
      'h ' +
      formatWhole(Math.floor(s / 60) % 60) +
      'm ' +
      format(s % 60) +
      's'
    )
  else
    return (
      formatWhole(Math.floor(s / 31536000)) +
      'y ' +
      formatWhole(Math.floor(s / 86400) % 365) +
      'd ' +
      formatWhole(Math.floor(s / 3600) % 24) +
      'h ' +
      formatWhole(Math.floor(s / 60) % 60) +
      'm ' +
      format(s % 60) +
      's'
    )
}

function toPlaces(x, precision, maxAccepted) {
  x = new Decimal(x)
  let result = x.toStringWithDecimalPlaces(precision)
  if (new Decimal(result).gte(maxAccepted)) {
    result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
  }
  return result
}
