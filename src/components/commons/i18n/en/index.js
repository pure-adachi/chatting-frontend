import common from "../locales/en.json";
import components from "../locales/components/en.json";
import flatten from "flat";

export const en = (() => {
  return flatten({
    ...common,
    ...components
  });
})();
