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
        fetch = global.fetch,
        hash = location.hash,
        rdate = /^#\d{4}\-\d{2}\-\d{2}$/;

    fetch("datas.json").then(function (resp) {
        return resp.json();
    }).then(function (data) {
        var match = undefined,
            issue = undefined;

        if (match = hash.match(rdate)) {
            match = match[0];

            issue = data.filter(function (date) {
                return match == date;
            });

            issue = issue.length ? issue[0] : data.pop();
        } else {
            issue = data.pop();
        }

        return fetch("contents/indeterminate/" + issue + ".html");
    }).then(function (resp) {
        return resp.text();
    }).then(function (html) {
        $("#article")[0].innerHTML = html;
        setTimeout(function () {
            return $("html")[0].classList.add("loaded");
        }, 1000);
    })["catch"](function (err) {
        return console.log(err);
    });
})(window);