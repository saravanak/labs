export function clamp(input: string, length: number = 72): string {
  return `${input.slice(0, length)}${input.length > length ? "..." : ""}`;
}
