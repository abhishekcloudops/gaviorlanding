import { describe, expect, it } from "vitest";
import { calculateLine, formatMoney, rupeesToPaise } from "../src/lib/admin/money";

describe("admin money calculations", () => {
  it("converts rupees to integer paise without floating-point drift", () => {
    expect(rupeesToPaise("1999.99")).toBe(199999);
    expect(rupeesToPaise("0.01")).toBe(1);
  });

  it("rejects negative values and excess decimal places", () => {
    expect(() => rupeesToPaise("-1")).toThrow();
    expect(() => rupeesToPaise("10.999")).toThrow();
  });

  it("calculates quantity, tax, and total using integer paise", () => {
    expect(calculateLine("2.5", 10000, 1800)).toEqual({ subtotal: 25000, tax: 4500, total: 29500 });
  });

  it("formats INR consistently", () => {
    expect(formatMoney(123456)).toContain("1,234.56");
  });
});
