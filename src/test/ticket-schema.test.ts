import { describe, it, expect } from "vitest";
import { z } from "zod";

// Mirror the schema from submit-ticket.tsx for isolated testing
const formSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  description: z.string().min(10, "Please provide more details in the description"),
  category: z.string().min(1, "Select a category"),
  priority: z.string().min(1, "Select a priority"),
});

type FormData = z.infer<typeof formSchema>;

const validTicket: FormData = {
  subject: "Cannot log into the portal",
  description: "I have been unable to log in for the past two days. The page shows an error.",
  category: "ACCESS",
  priority: "HIGH",
};

describe("Ticket form schema", () => {
  it("accepts a valid ticket", () => {
    expect(() => formSchema.parse(validTicket)).not.toThrow();
  });

  it("rejects subject shorter than 5 characters", () => {
    const result = formSchema.safeParse({ ...validTicket, subject: "Hi" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("5 characters");
    }
  });

  it("rejects description shorter than 10 characters", () => {
    const result = formSchema.safeParse({ ...validTicket, description: "Short" });
    expect(result.success).toBe(false);
  });

  it("rejects empty subject", () => {
    const result = formSchema.safeParse({ ...validTicket, subject: "" });
    expect(result.success).toBe(false);
  });

  it("rejects missing category", () => {
    const result = formSchema.safeParse({ ...validTicket, category: "" });
    expect(result.success).toBe(false);
  });

  it("rejects missing priority", () => {
    const result = formSchema.safeParse({ ...validTicket, priority: "" });
    expect(result.success).toBe(false);
  });

  it("rejects subject longer than 200 characters", () => {
    const result = formSchema.safeParse({ ...validTicket, subject: "a".repeat(201) });
    expect(result.success).toBe(false);
  });
});
