import { instructorsBreakpoints } from "@/data/instructorsBreakpoints";

export const getLimitByWidth = (width) => {
  return instructorsBreakpoints.find((bp) => width <= bp.max).value;
};
