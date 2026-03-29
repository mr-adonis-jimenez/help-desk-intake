import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn (class name merger)", () => {
  it("returns a single class unchanged", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("merges multiple classes", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes — truthy", () => {
    expect(cn("base", true && "active")).toBe("base active");
  });

  it("handles conditional classes — falsy", () => {
    expect(cn("base", false && "active")).toBe("base");
  });

  it("handles undefined and null gracefully", () => {
    expect(cn("base", undefined, null)).toBe("base");
  });

  it("deduplicates Tailwind conflicting utilities", () => {
    // tailwind-merge should resolve p-2 vs p-4 → p-4 wins (last one)
    const result = cn("p-2", "p-4");
    expect(result).toBe("p-4");
  });

  it("merges conditional objects", () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
  });

  it("handles empty input", () => {
    expect(cn()).toBe("");
  });
});
