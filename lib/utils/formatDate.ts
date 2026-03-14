import { format } from "date-fns";

export function formatDate(value: string) {
  return format(new Date(value), "MMMM d, yyyy");
}
