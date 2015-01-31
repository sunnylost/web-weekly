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

    var $ = global.$,
        fetch = global.fetch;

    fetch("contents/indeterminate/2015-01-25.html").then(function (resp) {
        return resp.text();
    }).then(function (html) {
        $("#article")[0].innerHTML = html;
        setTimeout(function () {
            return $("html")[0].classList.add("loaded");
        }, 1000);
    });
})(window);