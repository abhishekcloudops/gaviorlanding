import { beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

describe("admin secret encryption", () => {
  beforeAll(() => {
    process.env.ADMIN_ENCRYPTION_KEY = Buffer.alloc(32, 7).toString("base64");
  });

  it("round-trips a secret without storing plaintext", async () => {
    const { decryptSecret, encryptSecret } = await import("../src/lib/admin/security");
    const plaintext = "test-gemini-key-123456789";
    const encrypted = encryptSecret(plaintext);
    expect(encrypted.ciphertext).not.toContain(plaintext);
    expect(decryptSecret({ ...encrypted, auth_tag: encrypted.authTag })).toBe(plaintext);
  });

  it("rejects tampered ciphertext", async () => {
    const { decryptSecret, encryptSecret } = await import("../src/lib/admin/security");
    const encrypted = encryptSecret("test-gemini-key-123456789");
    const bytes = Buffer.from(encrypted.ciphertext, "base64");
    bytes[0] ^= 1;
    expect(() => decryptSecret({ ...encrypted, ciphertext: bytes.toString("base64"), auth_tag: encrypted.authTag })).toThrow();
  });
});
