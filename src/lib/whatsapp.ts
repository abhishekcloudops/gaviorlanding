export const WHATSAPP_NUMBER = "916291939807";
export const WHATSAPP_DISPLAY_NUMBER = "+91 6291 939 807";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const GENERAL_WHATSAPP_MESSAGE =
  "Hi Gavior, I found you through your website and would like to discuss a project.";
