export function toDate(dateStr: string): Date {
  return new Date(dateStr.substring(0, dateStr.length - 5));
}
