import { format } from "date-fns";

export const useFormatter = () => ({
  formatDateSimple: (date: string): string => {
    if (!date) return "";
    return format(new Date(date), "dd.MM.yyyy");
  },
});
