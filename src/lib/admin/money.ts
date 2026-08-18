import Decimal from "decimal.js";

Decimal.set({ precision: 28, rounding: Decimal.ROUND_HALF_UP });

export function rupeesToPaise(value: string) {
  if (!/^\d+(\.\d{1,2})?$/.test(value.trim())) throw new Error("Enter a valid non-negative amount with up to 2 decimals.");
  return new Decimal(value).times(100).toDecimalPlaces(0).toNumber();
}

export function calculateLine(quantity: string, unitPricePaise: number, taxRateBps: number) {
  const qty = new Decimal(quantity);
  if (!qty.isPositive() || qty.decimalPlaces() > 3) throw new Error("Quantity must be positive with up to 3 decimals.");
  const subtotal = qty.times(unitPricePaise).toDecimalPlaces(0).toNumber();
  const tax = new Decimal(subtotal).times(taxRateBps).dividedBy(10000).toDecimalPlaces(0).toNumber();
  return { subtotal, tax, total: subtotal + tax };
}

export function formatMoney(paise: number | string | null | undefined) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(Number(paise || 0) / 100);
}
