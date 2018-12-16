import common from "../Locales/en";
import components from "../Locales/Components/en";
import flatten from "flat";

export const en = (() => {
  return flatten({
    ...common,
    ...components
  });
})();
