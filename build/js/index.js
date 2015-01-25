"use strict";

~(function (global) {
  "use strict";

  var doc = global.document,
      base = undefined;

  base = {
    $: function $(selector) {
      return doc.querySelectorAll(selector);
    }
  };

  for (var key in base) {
    global[key] = base[key];
  }
})(window);
"use strict";

~(function (global) {
  "use strict";

  var $ = global.$;

  setTimeout(function () {
    $("#overlay")[0].classList.add("hide");
  }, 1000);
})(window);
//# sourceMappingURL=index.js.map