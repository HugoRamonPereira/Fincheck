import { NumericFormat } from 'react-number-format';

export function InputCurrency() {
  return (
    <NumericFormat
      className='w-full text-gray-800 text-[32px] font-Montserrat outline-none'
      thousandSeparator='.'
      decimalSeparator=','
      defaultValue='1.000,00'
    />
  );
}