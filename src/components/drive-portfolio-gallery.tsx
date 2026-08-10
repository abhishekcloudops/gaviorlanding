"use client";
/* eslint-disable @next/next/no-img-element -- Drive thumbnails use rotating public URLs. */

import { ArrowUpRight, ChevronLeft, ChevronRight, LoaderCircle, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type PortfolioItem = {
  id: string;
  name: string;
  mimeType: string;
  category: string;
  createdTime: string | null;
  thumbnailUrl: string;
  previewUrl: string;
};

type PortfolioResponse = { items: PortfolioItem[]; message?: string };

const DRIVE_FOLDER_EMBED_URL = "https://drive.google.com/embeddedfolderview?id=19tjBL1C1EVX6SaSxYpNh0wmgKkORDZgf#grid";
const VIDEO_FOLDER_EMBED_URL = "https://drive.google.com/embeddedfolderview?id=12UUndHghS6xXGkns4LdAL3SNiowxOFot#grid";
const categories = ["All work", "Social media posts", "Videos"];

function cleanTitle(name: string) {
  return name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ");
}

function ItemCard({ item, onOpen }: { item: PortfolioItem; onOpen: () => void }) {
  const isVideo = item.mimeType.startsWith("video/");

  return (
    <button type="button" className="drive-portfolio-card" onClick={onOpen}>
      <span className="drive-portfolio-image">
        <img src={item.thumbnailUrl} alt="" loading="lazy" />
        {isVideo && <span className="drive-portfolio-video-label">Video</span>}
      </span>
      <span className="drive-portfolio-card-footer">
        <span>
          <span className="drive-portfolio-card-type">{item.category}</span>
          <span className="drive-portfolio-card-title">{cleanTitle(item.name)}</span>
        </span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </span>
    </button>
  );
}

export function DrivePortfolioGallery() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("All work");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/portfolio")
      .then(async (response) => {
        const payload = (await response.json()) as PortfolioResponse;
        if (!response.ok) throw new Error(payload.message ?? "Unable to load the portfolio.");
        if (!cancelled) {
          setItems(payload.items);
          setState("ready");
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setMessage(error instanceof Error ? error.message : "Unable to load the portfolio.");
          setState("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);
  const move = useCallback((direction: number) => {
    setActiveIndex((current) => current === null ? null : (current + direction + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, close, move]);

  const active = activeIndex === null ? null : items[activeIndex];
  const visibleItems = items
    .filter((item) => category === "All work" || item.category === category)
    .sort((a, b) => sortOrder === "newest"
      ? (b.createdTime ?? "").localeCompare(a.createdTime ?? "")
      : (a.createdTime ?? "").localeCompare(b.createdTime ?? ""));

  return (
    <>
      {state === "loading" && <div className="drive-portfolio-state"><LoaderCircle className="animate-spin" size={22} /> Loading the latest work…</div>}
      {state === "error" && (
        <div className="drive-portfolio-fallback">
          <div className="drive-portfolio-controls drive-portfolio-fallback-controls">
            <div className="drive-portfolio-filters" aria-label="Portfolio category">
              {categories.filter((value) => value !== "All work").map((value) => <button type="button" key={value} className={category === value ? "is-active" : ""} onClick={() => setCategory(value)}>{value}</button>)}
            </div>
          </div>
          <iframe
            src={category === "Videos" ? VIDEO_FOLDER_EMBED_URL : DRIVE_FOLDER_EMBED_URL}
            title={category === "Videos" ? "Gavior video portfolio" : "Gavior social media portfolio"}
            className="drive-portfolio-folder-embed"
          />
          <p className="drive-portfolio-fallback-help">{message} Add GOOGLE_DRIVE_API_KEY to enable Gavior&apos;s image and video popups.</p>
        </div>
      )}
      {state === "ready" && items.length === 0 && <div className="drive-portfolio-state">New social media work will appear here soon.</div>}
      {state === "ready" && items.length > 0 && (
        <>
          <div className="drive-portfolio-controls">
            <div className="drive-portfolio-filters" aria-label="Portfolio category">
              {categories.map((value) => <button type="button" key={value} className={category === value ? "is-active" : ""} onClick={() => setCategory(value)}>{value}</button>)}
            </div>
            <label className="drive-portfolio-sort">Sort by <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as "newest" | "oldest")}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label>
          </div>
          {visibleItems.length ? <div className="drive-portfolio-grid">
            {visibleItems.map((item) => <ItemCard item={item} key={item.id} onOpen={() => setActiveIndex(items.findIndex((entry) => entry.id === item.id))} />)}
          </div> : <div className="drive-portfolio-state">No {category.toLowerCase()} have been added yet.</div>}
        </>
      )}

      {active && activeIndex !== null && (
        <div className="drive-portfolio-modal" role="dialog" aria-modal="true" aria-label={`Preview: ${cleanTitle(active.name)}`} onMouseDown={close}>
          <div className="drive-portfolio-modal-content" onMouseDown={(event) => event.stopPropagation()}>
            <div className="drive-portfolio-modal-topbar">
              <div><p>{active.category}</p><h2>{cleanTitle(active.name)}</h2></div>
              <button type="button" className="drive-portfolio-icon-button" onClick={close} aria-label="Close preview"><X size={22} /></button>
            </div>
            <iframe src={active.previewUrl} title={cleanTitle(active.name)} className="drive-portfolio-preview" allow="autoplay" />
            {items.length > 1 && <>
              <button type="button" className="drive-portfolio-nav drive-portfolio-nav-prev" onClick={() => move(-1)} aria-label="Previous post"><ChevronLeft size={25} /></button>
              <button type="button" className="drive-portfolio-nav drive-portfolio-nav-next" onClick={() => move(1)} aria-label="Next post"><ChevronRight size={25} /></button>
            </>}
          </div>
        </div>
      )}
    </>
  );
}
