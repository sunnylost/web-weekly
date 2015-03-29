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
        bodyEl = $("body")[0],
        articleEl = $("#article")[0],
        zombieEl = $("#zombie")[0],
        cached = {},
        rdate = /(\d{4}\-\d{2}\-\d{2})/,
        isArchivesShown = false,
        hasArchives = false,
        ARCHIVES = "archives",
        ARCHIVES_SHOWN = "archives-shown",
        LOAD_CLASS = "loaded",
        listData = undefined,
        archivesEl = undefined;

    fetch("datas.json?t=" + +new Date()).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        listData = data;
        navigate(location.hash.substring(1));
        generatearchives();
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
        } else {
            issue = last;
        }

        if (cached[issue]) {
            return articleEl.innerHTML = cached[issue];
        }

        htmlEl.classList.remove(LOAD_CLASS);
        fetch("contents/indeterminate/" + issue + ".html").then(function (resp) {
            return resp.text();
        }).then(function (html) {
            cached[issue] = html;
            articleEl.innerHTML = html;
            setTimeout(function () {
                htmlEl.classList.add(LOAD_CLASS);
            }, 1000);
        })["catch"](function (err) {
            return console.log(err);
        });
    }

    function generatearchives() {
        var htmls = "";
        archivesEl = document.createElement("ul");

        archivesEl.className = "archives";
        archivesEl.innerHTML = (function () {
            listData.forEach(function (d, i) {
                htmls += "<li><a href=\"#" + d + "\">#" + (i + 1) + "</a></li>";
            });
            return htmls;
        })();

        bodyEl.appendChild(archivesEl);

        hasArchives = true;
        archivesEl.onclick = function (e) {
            if (e.target.tagName.toLocaleLowerCase() == "a") {
                toggleArchives();
            }
        };

        if (location.hash.substring(1) == ARCHIVES) {
            showArchives();
        }
    }

    function toggleArchives() {
        if (hasArchives) {
            isArchivesShown ? hideArchives() : showArchives();
        }
    }

    function hideArchives() {
        htmlEl.classList.remove(ARCHIVES_SHOWN);
        isArchivesShown = false;
    }

    function showArchives() {
        htmlEl.classList.add(ARCHIVES_SHOWN);
        isArchivesShown = true;
    }

    $("#archives")[0].onclick = toggleArchives;

    global.onkeyup = function (e) {
        e.keyCode == 27 && hideArchives();
    };

    global.onhashchange = function (e) {
        var hash = undefined;
        zombieEl.href = e.newURL;
        hash = zombieEl.hash.substring(1);

        if (hash == ARCHIVES) {
            showArchives();
        } else {
            hideArchives();
            navigate(hash);
        }
    };
})(window);