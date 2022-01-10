function round(number, decimalPlaces) {
  const factorOfTen = Math.pow(10, decimalPlaces)
  return Math.round(number * factorOfTen) / factorOfTen
}

export function normalizeValue(value, decimals = 0) {
  const roundedValue = round(value, decimals);
  let regEx = RegExp(/\d(?=(\d{3})+\.)/g);
  const valueStr = decimals === 0 ? roundedValue.toFixed(1).replace(regEx, '$&\'').slice(0, -2) : roundedValue.toFixed(decimals).replace(regEx, '$&\'');
  return valueStr;
}

export function normalizePrice(price) {
  if (typeof(price) !== "number") {
    return price;
  }
  let normalizedPrice;
  if (price <= 0) {
    normalizedPrice = Math.round(price).toString();
  } else if (price < 0.01) {
    normalizedPrice = price.toFixed(6);
  } else if (price < 0.1) {
    normalizedPrice =  price.toFixed(5);
  } else if (price < 1) {
    normalizedPrice =  price.toFixed(4);
  } else if (price < 1000) {
    normalizedPrice =  price.toFixed(2);
  } else {
    normalizedPrice = Math.round(price).toString();
  }
  return addThousandsSeparator(normalizedPrice);
}

export function addThousandsSeparator(str) {
  let [firstPart, secondPart] = str.split('.');
  firstPart = firstPart.replace(/\B(?=(\d{3})+(?!\d))/g, '\'');
  if (secondPart) {
    return `${firstPart}.${secondPart}`;
  }
  return firstPart;
}

export function convertCurrency(value, targetCurrency, currencyRates) {
  if (currencyRates) {
    const rate = currencyRates[targetCurrency];
    if (rate) {
      return value * rate;
    }
    return value;
  }
}
