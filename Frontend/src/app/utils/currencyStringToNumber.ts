export function currencyStringToNumber(value: string) {
  const parseFloatValue = value.replace(/\./g, '').replace(',', '.');

  return Number(parseFloatValue);
}