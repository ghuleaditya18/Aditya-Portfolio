/**
 * Dependency-free classname joiner utility.
 * Filters out falsy values and joins valid CSS classes with spaces.
 */
export function cn(...classes: (string | number | undefined | null | false | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}
