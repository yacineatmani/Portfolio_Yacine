// ...existing code from utils.ts...
// Utilitaire de composition de classes conditionnelles
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
