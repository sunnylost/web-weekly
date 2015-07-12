(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.base = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    var doc = window.document,
        base = undefined;

    base = {
        $: function $(selector) {
            return doc.querySelectorAll(selector);
        }
    };

    for (var key in base) {
        window[key] = base[key];
    }
});
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.index = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    var global = window,
        $ = global.$,
        fetch = global.fetch,
        htmlEl = $('html')[0],
        bodyEl = $('body')[0],
        articleEl = $('#article')[0],
        zombieEl = $('#zombie')[0],
        cached = {},
        rdate = /(\d{4}\-\d{2}\-\d{2})/,
        isArchivesShown = false,
        hasArchives = false,
        ARCHIVES = 'archives',
        ARCHIVES_SHOWN = 'archives-shown',
        LOAD_CLASS = 'loaded',
        newDate = +new Date(),
        navigate = undefined,
        generatearchives = undefined,
        toggleArchives = undefined,
        hideArchives = undefined,
        showArchives = undefined,
        listData = undefined,
        archivesEl = undefined;

    fetch('datas.json?t=' + newDate).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        listData = data;
        navigate(location.hash.substring(1));
        generatearchives();
    });

    navigate = function (hash) {
        var match = undefined,
            issue = undefined,
            last = listData[listData.length - 1];

        if (match = hash.match(rdate)) {
            match = match[1];
            issue = listData.filter(function (date) {
                return date == match;
            });
            issue = issue.length ? issue[0] : last;
        } else {
            issue = last;
        }

        if (cached[issue]) {
            return articleEl.innerHTML = cached[issue];
        }

        htmlEl.classList.remove(LOAD_CLASS);

        fetch('contents/indeterminate/' + issue + '.html').then(function (resp) {
            return resp.text();
        }).then(function (rawHtml) {
            cached[issue] = articleEl.innerHTML = rawHtml;
            setTimeout(function () {
                return htmlEl.classList.add(LOAD_CLASS);
            }, 1000);
        });
    };

    generatearchives = function () {
        archivesEl = document.createElement('ul');
        archivesEl.className = 'archives';
        archivesEl.innerHTML = listData.map(function (value, i) {
            return '<li><a href="#' + value + '">#' + (i + 1) + '</a></li>';
        }).join('');
        bodyEl.appendChild(archivesEl);

        hasArchives = true;
        archivesEl.onclick = function (e) {
            if (e.target.tagName.toLocaleLowerCase() == 'a') {
                toggleArchives();
            }
        };

        if (location.hash.substring(1) == ARCHIVES) {
            showArchives();
        }
    };

    toggleArchives = function () {
        return hasArchives && isArchivesShown ? hideArchives() : showArchives();
    };

    hideArchives = function () {
        htmlEl.classList.remove(ARCHIVES_SHOWN);
        isArchivesShown = false;
    };

    showArchives = function () {
        htmlEl.classList.add(ARCHIVES_SHOWN);
        isArchivesShown = true;
    };

    $('#archives')[0].onclick = toggleArchives;

    global.onkeyup = function (e) {
        return e.keyCode == 27 && hideArchives();
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
});
//# sourceMappingURL=data:application/json;base64,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QUFJLGVBQWUsR0FBRyxZQUFZLEVBQUUsR0FBRyxZQUFZLEVBQUU7S0FBQSxDQUFBOztBQUV2RixnQkFBWSxHQUFHLFlBQU07QUFDakIsY0FBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUUsY0FBYyxDQUFFLENBQUE7QUFDekMsdUJBQWUsR0FBRyxLQUFLLENBQUE7S0FDMUIsQ0FBQTs7QUFFRCxnQkFBWSxHQUFHLFlBQU07QUFDakIsY0FBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUUsY0FBYyxDQUFFLENBQUE7QUFDdEMsdUJBQWUsR0FBRyxJQUFJLENBQUE7S0FDekIsQ0FBQTs7QUFFRCxLQUFDLENBQUUsV0FBVyxDQUFFLENBQUUsQ0FBQyxDQUFFLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQTs7QUFFOUMsVUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFBLENBQUM7ZUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxZQUFZLEVBQUU7S0FBQSxDQUFBOztBQUV2RCxVQUFNLENBQUMsWUFBWSxHQUFHLFVBQUEsQ0FBQyxFQUFJO0FBQ3ZCLFlBQUksSUFBSSxZQUFBLENBQUE7QUFDUixnQkFBUSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFBO0FBQ3hCLFlBQUksR0FBWSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBRSxDQUFDLENBQUUsQ0FBQTs7QUFFNUMsWUFBSyxJQUFJLElBQUksUUFBUSxFQUFHO0FBQ3BCLHdCQUFZLEVBQUUsQ0FBQTtTQUNqQixNQUFNO0FBQ0gsd0JBQVksRUFBRSxDQUFBO0FBQ2Qsb0JBQVEsQ0FBRSxJQUFJLENBQUUsQ0FBQTtTQUNuQjtLQUNKLENBQUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgZG9jID0gd2luZG93LmRvY3VtZW50LFxuICAgIGJhc2VcblxuYmFzZSA9IHtcbiAgICAkKCBzZWxlY3RvciApIHtcbiAgICAgICAgcmV0dXJuIGRvYy5xdWVyeVNlbGVjdG9yQWxsKCBzZWxlY3RvciApXG4gICAgfVxufVxuXG5mb3IgKCBsZXQga2V5IGluIGJhc2UgKSB7XG4gICAgd2luZG93WyBrZXkgXSA9IGJhc2VbIGtleSBdXG59XG4iLCJsZXQgZ2xvYmFsICAgICAgICAgID0gd2luZG93LFxuICAgICQgICAgICAgICAgICAgICA9IGdsb2JhbC4kLFxuICAgIGZldGNoICAgICAgICAgICA9IGdsb2JhbC5mZXRjaCxcblxuICAgIGh0bWxFbCAgICAgICAgICA9ICQoICdodG1sJyApWyAwIF0sXG4gICAgYm9keUVsICAgICAgICAgID0gJCggJ2JvZHknIClbIDAgXSxcbiAgICBhcnRpY2xlRWwgICAgICAgPSAkKCAnI2FydGljbGUnIClbIDAgXSxcbiAgICB6b21iaWVFbCAgICAgICAgPSAkKCAnI3pvbWJpZScgKVsgMCBdLFxuXG4gICAgY2FjaGVkICAgICAgICAgID0ge30sXG5cbiAgICByZGF0ZSAgICAgICAgICAgPSAvKFxcZHs0fVxcLVxcZHsyfVxcLVxcZHsyfSkvLFxuICAgIGlzQXJjaGl2ZXNTaG93biA9IGZhbHNlLFxuICAgIGhhc0FyY2hpdmVzICAgICA9IGZhbHNlLFxuXG4gICAgQVJDSElWRVMgICAgICAgID0gJ2FyY2hpdmVzJyxcbiAgICBBUkNISVZFU19TSE9XTiAgPSAnYXJjaGl2ZXMtc2hvd24nLFxuICAgIExPQURfQ0xBU1MgICAgICA9ICdsb2FkZWQnLFxuICAgIG5ld0RhdGUgICAgICAgICA9ICsoIG5ldyBEYXRlICksXG5cbiAgICBuYXZpZ2F0ZSwgZ2VuZXJhdGVhcmNoaXZlcywgdG9nZ2xlQXJjaGl2ZXMsIGhpZGVBcmNoaXZlcywgc2hvd0FyY2hpdmVzLFxuICAgIGxpc3REYXRhLCBhcmNoaXZlc0VsXG5cbmZldGNoKCBgZGF0YXMuanNvbj90PSR7bmV3RGF0ZX1gIClcbiAgICAudGhlbiggcmVzcCA9PiByZXNwLmpzb24oKSApXG4gICAgLnRoZW4oIGRhdGEgPT4ge1xuICAgICAgICBsaXN0RGF0YSA9IGRhdGFcbiAgICAgICAgbmF2aWdhdGUoIGxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKCAxICkgKVxuICAgICAgICBnZW5lcmF0ZWFyY2hpdmVzKClcbiAgICB9IClcblxubmF2aWdhdGUgPSBoYXNoID0+IHtcbiAgICBsZXQgbWF0Y2gsIGlzc3VlLFxuICAgICAgICBsYXN0ID0gbGlzdERhdGFbIGxpc3REYXRhLmxlbmd0aCAtIDEgXVxuXG4gICAgaWYgKCBtYXRjaCA9IGhhc2gubWF0Y2goIHJkYXRlICkgKSB7XG4gICAgICAgIG1hdGNoID0gbWF0Y2hbIDEgXVxuICAgICAgICBpc3N1ZSA9IGxpc3REYXRhLmZpbHRlciggZGF0ZSA9PiBkYXRlID09IG1hdGNoIClcbiAgICAgICAgaXNzdWUgPSBpc3N1ZS5sZW5ndGggPyBpc3N1ZVsgMCBdIDogbGFzdFxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlzc3VlID0gbGFzdFxuICAgIH1cblxuICAgIGlmICggY2FjaGVkWyBpc3N1ZSBdICkge1xuICAgICAgICByZXR1cm4gYXJ0aWNsZUVsLmlubmVySFRNTCA9IGNhY2hlZFsgaXNzdWUgXVxuICAgIH1cblxuICAgIGh0bWxFbC5jbGFzc0xpc3QucmVtb3ZlKCBMT0FEX0NMQVNTIClcblxuICAgIGZldGNoKCBgY29udGVudHMvaW5kZXRlcm1pbmF0ZS8keyBpc3N1ZSB9Lmh0bWxgIClcbiAgICAgICAgLnRoZW4oIHJlc3AgPT4gcmVzcC50ZXh0KCkgKVxuICAgICAgICAudGhlbiggcmF3SHRtbCA9PiB7XG4gICAgICAgICAgICBjYWNoZWRbIGlzc3VlIF0gPSBhcnRpY2xlRWwuaW5uZXJIVE1MID0gcmF3SHRtbFxuICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4gaHRtbEVsLmNsYXNzTGlzdC5hZGQoIExPQURfQ0xBU1MgKSwgMTAwMCApXG4gICAgICAgIH0gKVxufVxuXG5nZW5lcmF0ZWFyY2hpdmVzID0gKCkgPT4ge1xuICAgIGFyY2hpdmVzRWwgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3VsJyApXG4gICAgYXJjaGl2ZXNFbC5jbGFzc05hbWUgPSAnYXJjaGl2ZXMnXG4gICAgYXJjaGl2ZXNFbC5pbm5lckhUTUwgPSBsaXN0RGF0YS5tYXAoICggdmFsdWUsIGkgKSA9PiB7XG4gICAgICAgIHJldHVybiBgPGxpPjxhIGhyZWY9XCIjJHt2YWx1ZX1cIj4jJHtpICsgMX08L2E+PC9saT5gXG4gICAgfSApLmpvaW4oICcnIClcbiAgICBib2R5RWwuYXBwZW5kQ2hpbGQoIGFyY2hpdmVzRWwgKVxuXG4gICAgaGFzQXJjaGl2ZXMgICAgICAgID0gdHJ1ZVxuICAgIGFyY2hpdmVzRWwub25jbGljayA9ICggZSApID0+IHtcbiAgICAgICAgaWYgKCBlLnRhcmdldC50YWdOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT0gJ2EnICkge1xuICAgICAgICAgICAgdG9nZ2xlQXJjaGl2ZXMoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCBsb2NhdGlvbi5oYXNoLnN1YnN0cmluZyggMSApID09IEFSQ0hJVkVTICkge1xuICAgICAgICBzaG93QXJjaGl2ZXMoKVxuICAgIH1cbn1cblxudG9nZ2xlQXJjaGl2ZXMgPSAoKSA9PiBoYXNBcmNoaXZlcyAmJiBpc0FyY2hpdmVzU2hvd24gPyBoaWRlQXJjaGl2ZXMoKSA6IHNob3dBcmNoaXZlcygpXG5cbmhpZGVBcmNoaXZlcyA9ICgpID0+IHtcbiAgICBodG1sRWwuY2xhc3NMaXN0LnJlbW92ZSggQVJDSElWRVNfU0hPV04gKVxuICAgIGlzQXJjaGl2ZXNTaG93biA9IGZhbHNlXG59XG5cbnNob3dBcmNoaXZlcyA9ICgpID0+IHtcbiAgICBodG1sRWwuY2xhc3NMaXN0LmFkZCggQVJDSElWRVNfU0hPV04gKVxuICAgIGlzQXJjaGl2ZXNTaG93biA9IHRydWVcbn1cblxuJCggJyNhcmNoaXZlcycgKVsgMCBdLm9uY2xpY2sgPSB0b2dnbGVBcmNoaXZlc1xuXG5nbG9iYWwub25rZXl1cCA9IGUgPT4gZS5rZXlDb2RlID09IDI3ICYmIGhpZGVBcmNoaXZlcygpXG5cbmdsb2JhbC5vbmhhc2hjaGFuZ2UgPSBlID0+IHtcbiAgICBsZXQgaGFzaFxuICAgIHpvbWJpZUVsLmhyZWYgPSBlLm5ld1VSTFxuICAgIGhhc2ggICAgICAgICAgPSB6b21iaWVFbC5oYXNoLnN1YnN0cmluZyggMSApXG5cbiAgICBpZiAoIGhhc2ggPT0gQVJDSElWRVMgKSB7XG4gICAgICAgIHNob3dBcmNoaXZlcygpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgaGlkZUFyY2hpdmVzKClcbiAgICAgICAgbmF2aWdhdGUoIGhhc2ggKVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==