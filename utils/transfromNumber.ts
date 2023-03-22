export const transformPrice = (reg:string, option: object, price:number): string => new Intl.NumberFormat(reg, {
    minimumFractionDigits: 0,
    ...option
  }).format(price)