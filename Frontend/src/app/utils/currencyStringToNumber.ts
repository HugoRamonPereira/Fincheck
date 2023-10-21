export function currencyStringToNumber(value: string | number) {

  // Added this conditional to verify if the balance value is coming as string or number, if so then just return the value
  if (typeof value === 'number') {
    return value;
  }

  // Otherwise we will use the regex with the replaces to turn the string into a number
  // In the useEditeAccountModalController in the line 53 we were having a problem, this function below
  // is used to turn strings into numbers so that we can send the numeric value to the backend
  // and we were already receiving a number so that was the problem
  const parseFloatValue = value.replace(/\./g, '').replace(',', '.');

  return Number(parseFloatValue);
}