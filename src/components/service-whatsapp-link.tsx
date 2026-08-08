import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";

type ServiceWhatsAppLinkProps = {
  serviceName: string;
  label?: string;
  className?: string;
};

export function ServiceWhatsAppLink({
  serviceName,
  label = "Ask on WhatsApp",
  className = "button bg-[#25D366] text-[#082d17] hover:bg-[#2ee06f]",
}: ServiceWhatsAppLinkProps) {
  const message = `Hi Gavior, I am interested in ${serviceName}.\n\nI found this service on your website. Please share the recommended scope, timeline, starting price and next steps.`;

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      className={className}
      aria-label={`Ask Gavior about ${serviceName} on WhatsApp`}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {label}
    </a>
  );
}
