import common from "../locales/ja";
import components from "../locales/components/ja";
import flatten from "flat";

export const ja = (() => {
  return flatten({
    ...common,
    ...components
  });
})();
