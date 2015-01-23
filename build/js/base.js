"use strict";

~(function (global) {
  var doc = global.document,
      base = undefined;

  base = {
    $: function $(selector) {
      return doc.querySelectorAll(selector);
    }
  };
})(window);
//# sourceMappingURL=base.js.map