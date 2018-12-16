import common from "../Locales/ja";
import components from "../Locales/Components/ja";
import flatten from "flat";

export const ja = (() => {
  return flatten({
    ...common,
    ...components
  });
})();
