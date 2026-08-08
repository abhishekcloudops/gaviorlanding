import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/content/blog-api";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        color: "#171717",
        background: "linear-gradient(135deg, #ffffff 0%, #f2ebff 62%, #dccbff 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 28, fontWeight: 800 }}>GAVIOR</div>
        <div style={{ padding: "10px 18px", borderRadius: 999, background: "#7018ff", color: "white", fontSize: 18 }}>
          {post?.category ?? "Gavior Journal"}
        </div>
      </div>
      <div style={{ display: "flex", maxWidth: 1050, fontSize: 62, lineHeight: 1.04, letterSpacing: "-3px", fontWeight: 800 }}>
        {post?.title ?? "Ideas for businesses in motion"}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#615a69" }}>
        <span>Practical guidance for better digital decisions</span>
        <span>gavior.in</span>
      </div>
    </div>,
    size,
  );
}
