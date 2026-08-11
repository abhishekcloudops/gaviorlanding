import { NextResponse } from "next/server";

const FOLDERS = [
  { id: "19tjBL1C1EVX6SaSxYpNh0wmgKkORDZgf", category: "Graphics" },
  { id: "12UUndHghS6xXGkns4LdAL3SNiowxOFot", category: "Videos" },
] as const;
const DRIVE_FILES_URL = "https://www.googleapis.com/drive/v3/files";

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  createdTime?: string;
  modifiedTime?: string;
};

export async function GET() {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { items: [], message: "Portfolio feed is not configured yet." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const folderResults = await Promise.all(FOLDERS.map(async (folder) => {
      const query = new URLSearchParams({
        key: apiKey,
        q: `'${folder.id}' in parents and trashed = false and (mimeType contains 'image/' or mimeType contains 'video/')`,
        fields: "files(id,name,mimeType,createdTime,modifiedTime)",
        orderBy: "modifiedTime desc",
        pageSize: "100",
      });
      const response = await fetch(`${DRIVE_FILES_URL}?${query}`, { next: { revalidate: 300 } });
      if (!response.ok) throw new Error(`Google Drive folder request failed: ${response.status}`);
      const payload = (await response.json()) as { files?: DriveFile[] };
      return (payload.files ?? []).map((file) => ({ file, category: folder.category }));
    }));

    const items = folderResults.flat().map(({ file, category }) => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      category,
      modifiedTime: file.modifiedTime ?? file.createdTime ?? null,
      thumbnailUrl: `https://drive.google.com/thumbnail?id=${encodeURIComponent(file.id)}&sz=w1200`,
      previewUrl: `https://drive.google.com/file/d/${encodeURIComponent(file.id)}/preview`,
    })).sort((a, b) => (b.modifiedTime ?? "").localeCompare(a.modifiedTime ?? ""));

    return NextResponse.json(
      { items },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" } },
    );
  } catch (error) {
    console.error("Google Drive portfolio request errored", error);
    return NextResponse.json(
      { items: [], message: "Portfolio posts are temporarily unavailable." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
