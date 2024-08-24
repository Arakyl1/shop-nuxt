export function formatPrice(price: number) {
    return new Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
}

export function formatNumber(value: number) {
    return new Intl.NumberFormat('ru', { useGrouping: true }).format(value);
}

export function formatPhone(phone: string) {
    return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
}
