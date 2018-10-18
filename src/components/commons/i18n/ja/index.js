import common from "../locales/ja.json";
import components from "../locales/components/ja.json";
import flatten from "flat";

export const ja = (() => {
  return flatten({
    ...common,
    ...components
  });
})();
