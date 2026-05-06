export function toValidDate(value: any) {
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}
