import common from "../locales/en";
import components from "../locales/components/en";
import flatten from "flat";

export const en = (() => {
  return flatten({
    ...common,
    ...components
  });
})();
