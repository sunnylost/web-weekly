# Web Weekly

Collect news about web.

## How to build content

1. Add a markdown file in `contents/source` directory
2. Run `gulp run`, this contains two steps:
    1. it will generate a html file under `contents/indeterminate`
    2. and generate a html file under `contents/email`

## How to send email

1. Make sure you have a `infos.json` under root directory, it must contains your email address and password.
2. Run `iojs index.js`, this will send that html file to the receivers.

## Content Sources

All contents are coming from these sites:

* [Web Platform Daily](http://webplatformdaily.org/)
* [JavaScript Weekly](http://javascriptweekly.com/)
* [CSS Weekly](http://css-weekly.com/)
* [HTML5 Weekly](http://html5weekly.com/)
* [Mobile Web Weekly](http://mobilewebweekly.co/)
* [Node Weekly](http://nodeweekly.com/)
* [Web Operations Weekly](http://webopsweekly.com/)
* [Web Design Weekly](https://web-design-weekly.com/)
* [Echo JS](http://www.echojs.com/)
* [Twitter](http://twitter.com)
* [Smashing Magazine](http://www.smashingmagazine.com/)
* [GitHub Trending](https://github.com/trending?l=javascript)
* [Chromium Status](http://www.chromestatus.com/features)
* [IE Status](https://status.modern.ie/)

