export function paiseToRupees(paise: number | string | null | undefined): number {
  const p = Number(paise || 0);
  return Math.round(p) / 100;
}

export function rupeesToPaise(rupees: number | string | null | undefined): number {
  const r = typeof rupees === "string" ? parseFloat(rupees.replace(/,/g, "")) : Number(rupees || 0);
  if (isNaN(r) || r < 0) return 0;
  return Math.round(r * 100);
}

export function formatMoney(paise: number | string | null | undefined, currency = "INR"): string {
  const amount = paiseToRupees(paise);
  if (currency === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function calculateLine(
  quantity: number | string,
  unitPricePaise: number,
  taxRateBps = 1800,
  discountPaise = 0,
) {
  const qty = Number(quantity || 0);
  const rawSubtotal = Math.round(qty * unitPricePaise);
  const discountedSubtotal = Math.max(0, rawSubtotal - discountPaise);
  const tax = Math.round((discountedSubtotal * taxRateBps) / 10000);
  const total = discountedSubtotal + tax;

  return {
    subtotalPaise: discountedSubtotal,
    taxPaise: tax,
    totalPaise: total,
  };
}

export function calculateGstSplit(
  supplierStateCode: string | null | undefined,
  clientStateCode: string | null | undefined,
  taxPaise: number,
) {
  const sameState = Boolean(
    supplierStateCode &&
      clientStateCode &&
      supplierStateCode.trim().padStart(2, "0") === clientStateCode.trim().padStart(2, "0"),
  );

  if (sameState) {
    const cgst = Math.round(taxPaise / 2);
    const sgst = taxPaise - cgst;
    return {
      sameState: true,
      cgstPaise: cgst,
      sgstPaise: sgst,
      igstPaise: 0,
    };
  }

  return {
    sameState: false,
    cgstPaise: 0,
    sgstPaise: 0,
    igstPaise: taxPaise,
  };
}
