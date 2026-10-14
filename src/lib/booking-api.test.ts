import { describe, it, expect } from "vitest";
import { localISO } from "./booking-api";

describe("localISO", () => {
  it("uses local date parts, not UTC", () => {
    expect(localISO(new Date(2026, 0, 5, 23, 30))).toBe("2026-01-05");
  });
});
