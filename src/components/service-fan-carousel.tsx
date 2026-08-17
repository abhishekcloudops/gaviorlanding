"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Bot, Braces, Clapperboard, Globe2, Palette, Search, Sparkles, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";

type FanService = {
  title: [string, string];
  copy: string;
  href: string;
  icon: LucideIcon;
  accent: string;
  visual: "web" | "ai" | "saas" | "app" | "design" | "video" | "brand" | "growth";
  image: string;
};

const fanServices: FanService[] = [
  { title: ["WEB", "DEVELOPMENT"], copy: "Business websites, landing pages, e-commerce and modern responsive websites.", href: "/services/website-development", icon: Globe2, accent: "#b68cff", visual: "web", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=82" },
  { title: ["AI", "AUTOMATION"], copy: "Smart automation that reduces repetitive work and improves business efficiency.", href: "/services/ai-automation", icon: Bot, accent: "#9c75ff", visual: "ai", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=82" },
  { title: ["SAAS", "DEVELOPMENT"], copy: "Scalable SaaS platforms, dashboards and custom business software.", href: "/services/saas-development", icon: Braces, accent: "#d7a3ff", visual: "saas", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=82" },
  { title: ["WEB APP", "DEVELOPMENT"], copy: "Custom web applications and business dashboards built around your workflow.", href: "/services/enterprise-applications", icon: Sparkles, accent: "#78d9ff", visual: "app", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=82" },
  { title: ["GRAPHIC", "DESIGN"], copy: "Social creatives, advertising graphics and visual communication that get noticed.", href: "/services/graphic-design", icon: Palette, accent: "#ff9dd1", visual: "design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1000&q=82" },
  { title: ["VIDEO", "EDITING"], copy: "Reels, promotional videos, motion graphics and branded content.", href: "/services/video-editing", icon: Clapperboard, accent: "#ffbc7d", visual: "video", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=82" },
  { title: ["BRANDING &", "CREATIVES"], copy: "Brand identity, campaign creatives and complete visual systems.", href: "/services/branding", icon: Palette, accent: "#ffd36f", visual: "brand", image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1000&q=82" },
  { title: ["DIGITAL", "MARKETING & SEO"], copy: "Growth campaigns, search optimisation and digital visibility.", href: "/services/digital-marketing", icon: Search, accent: "#81e3c1", visual: "growth", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=82" },
];

const getRelativePosition = (index: number, activeIndex: number) => {
  const count = fanServices.length;
  let distance = index - activeIndex;
  if (distance > count / 2) distance -= count;
  if (distance < -count / 2) distance += count;
  return distance;
};

export function ServiceFanCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const touchStart = useRef<number | null>(null);
  const setActive = (index: number) => setActiveIndex((index + fanServices.length) % fanServices.length);
  const move = (direction: number) => setActive(activeIndex + direction);

  return (
    <div className="service-fan-wrap">
      <div
        className="service-fan"
        aria-roledescription="carousel"
        aria-label="Gavior services"
        onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const change = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
          if (Math.abs(change) > 40) move(change < 0 ? 1 : -1);
          touchStart.current = null;
        }}
      >
        {fanServices.map((service, index) => {
          const position = getRelativePosition(index, activeIndex);
          const isVisible = Math.abs(position) <= 1;
          const Icon = service.icon;
          return (
            <article
              key={service.href}
              className="service-fan-card"
              data-position={position}
              data-visible={isVisible}
              aria-hidden={!isVisible}
              style={{ "--fan-accent": service.accent } as React.CSSProperties}
            >
              <button
                className="service-fan-card-select"
                aria-label={`Show ${service.title.join(" ")} details`}
                tabIndex={isVisible ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") move(-1);
                  if (event.key === "ArrowRight") move(1);
                }}
              />
              <div className={`service-fan-art service-fan-art-${service.visual}`} aria-hidden="true">
                <div className="service-fan-image" style={{ backgroundImage: `url(${service.image})` }} />
                <div className="service-fan-art-grid" />
                <div className="service-fan-art-orb" />
                <div className="service-fan-art-window"><i /><i /><i /><b /></div>
                <div className="service-fan-art-flow"><i /><i /><i /></div>
              </div>
              <div className="service-fan-card-content">
                <div className="service-fan-card-meta"><span>0{index + 1}</span><Icon size={18} /></div>
                <h3>{service.title[0]}<br />{service.title[1]}</h3>
                <p>{service.copy}</p>
                <Link href={service.href} tabIndex={isVisible ? 0 : -1}>Explore service <ArrowRight size={15} /></Link>
              </div>
            </article>
          );
        })}
      </div>
      <div className="service-fan-controls">
        <button onClick={() => move(-1)} aria-label="Previous service"><ArrowLeft size={17} /></button>
        <p><b>0{activeIndex + 1}</b> / 0{fanServices.length}</p>
        <button onClick={() => move(1)} aria-label="Next service"><ArrowRight size={17} /></button>
      </div>
    </div>
  );
}
