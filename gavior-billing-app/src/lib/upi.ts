import QRCode from "qrcode";
import { paiseToRupees } from "./money";

export function generateUpiLink({
  upiId,
  payeeName,
  amountPaise,
  transactionNote,
  invoiceNumber,
}: {
  upiId: string;
  payeeName: string;
  amountPaise: number;
  transactionNote?: string;
  invoiceNumber?: string;
}): string {
  const amountRupees = paiseToRupees(amountPaise).toFixed(2);
  const note = encodeURIComponent(transactionNote || `Invoice ${invoiceNumber || ""}`.trim());
  const name = encodeURIComponent(payeeName || "Gavior");

  return `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${name}&am=${amountRupees}&cu=INR&tn=${note}`;
}

export async function generateUpiQrDataUrl(upiString: string): Promise<string> {
  try {
    return await QRCode.toDataURL(upiString, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 280,
      color: {
        dark: "#17211c",
        light: "#ffffff",
      },
    });
  } catch (error) {
    console.error("Failed to generate UPI QR code", error);
    return "";
  }
}
