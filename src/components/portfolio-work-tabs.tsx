"use client";

import Image from "next/image";
import { useState } from "react";
import { DrivePortfolioGallery } from "@/components/drive-portfolio-gallery";
import type { CSSProperties } from "react";

type WebsiteProject = {
  name: string;
  url: string;
  image: string;
  accent: string;
  ink: string;
};

type PortfolioWorkTabsProps = {
  projects: WebsiteProject[];
};

const tabs = ["Website", "Graphics", "Videos"] as const;
type Tab = (typeof tabs)[number];

export function PortfolioWorkTabs({ projects }: PortfolioWorkTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Website");

  return (
    <section className="shell pb-16 sm:pb-24">
      <div className="portfolio-section-heading">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2 className="display mt-4 text-[38px] sm:text-[52px]">Explore by category.</h2>
        </div>
        <p>Graphics and videos are automatically sorted by their latest modified date.</p>
      </div>

      <div className="portfolio-work-tabs" role="tablist" aria-label="Portfolio categories">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={activeTab === tab ? "is-active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Website" && (
        <div className="website-portfolio-grid" role="tabpanel">
          {projects.map((project) => (
            <a
              className="website-portfolio-card"
              href={project.url}
              key={project.name}
              target="_blank"
              rel="noreferrer"
              style={{ "--project-accent": project.accent, "--project-ink": project.ink } as CSSProperties}
            >
              <div className="website-portfolio-visual" aria-hidden="true">
                <div className="website-browser-bar"><span /><span /><span /><i /></div>
                <div className="website-browser-content">
                  <Image src={project.image} alt="" fill sizes="(max-width: 520px) 100vw, (max-width: 800px) 50vw, 40vw" />
                </div>
              </div>
              <div className="website-portfolio-info"><h3>{project.name}</h3></div>
            </a>
          ))}
        </div>
      )}
      {activeTab === "Graphics" && <div role="tabpanel"><DrivePortfolioGallery category="Graphics" /></div>}
      {activeTab === "Videos" && <div role="tabpanel"><DrivePortfolioGallery category="Videos" /></div>}
    </section>
  );
}
