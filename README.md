# Web Weekly

Collect news about web.

## How to build content

1. Add a markdown file in `contents/source` directory
2. Run `gulp convert`, this will generate a html file under `contents/indeterminate`
3. Update `datas.json`, i know...this's so silly, i will fix this after awhile.

## How to send email

1. Make sure you have a `infos.json` under root directory, it must contains your email address and password.
2. Run `gulp email`, this will generate a html file under `contents/email`
3. Run `iojs index.js`, this will send that html file to the receivers.
