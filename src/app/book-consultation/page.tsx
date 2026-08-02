import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
export default function Book() {
  return (
    <>
      <Header />
      <main className="shell py-20 md:py-28 grid lg:grid-cols-[.85fr_1.15fr] gap-12">
        <div>
          <p className="eyebrow">Free consultation</p>
          <h1 className="display text-[56px] sm:text-[72px] mt-6">
            Bring the hard question.
          </h1>
          <p className="text-[17px] leading-7 text-[#667085] mt-7 max-w-md">
            In a focused 30-minute conversation, we’ll understand the
            opportunity, share a useful perspective and outline the most
            practical next step.
          </p>
          <ul className="mt-10 space-y-3 text-sm font-semibold">
            <li>✓ No pitch deck required</li>
            <li>✓ A senior practitioner on the call</li>
            <li>✓ Clear next steps, whether we work together or not</li>
          </ul>
        </div>
        <ContactForm consultation />
      </main>
      <Footer />
    </>
  );
}
