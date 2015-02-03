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
        htmlEl = $("html")[0],
        articleEl = $("#article")[0],
        rdate = /#(\d{4}\-\d{2}\-\d{2})/,
        LOAD_CLASS = "loaded",
        listData = undefined;

    fetch("datas.json").then(function (resp) {
        return resp.json();
    }).then(function (data) {
        listData = data;
        navigate(location.hash);
    });

    function filterName(data, name) {
        return data.filter(function (date) {
            return name == date;
        });
    }

    function navigate(hash) {
        var match = undefined,
            issue = undefined,
            last = listData[listData.length - 1];

        if (match = hash.match(rdate)) {
            match = match[1];

            issue = filterName(listData, match);

            issue = issue.length ? issue[0] : last;
        } else if (hash == "entries") {} else {
            issue = last;
        }

        htmlEl.classList.remove(LOAD_CLASS);
        fetch("contents/indeterminate/" + issue + ".html").then(function (resp) {
            return resp.text();
        }).then(function (html) {
            articleEl.innerHTML = html;
            setTimeout(function () {
                return htmlEl.classList.add(LOAD_CLASS);
            }, 1000);
        })["catch"](function (err) {
            return console.log(err);
        });
    }

    global.onhashchange = function (e) {
        navigate(e.newURL);
    };
})(window);
//TODO