var path           = require( 'path' ),
    fs 		       = require( 'fs' ),
    markdown       = require( 'markdown' ).markdown,
    juice          = require( 'juice2' ),

    prefix = '<head><meta charset="utf-8"></head><body><div id="wrap">',

    suffix = '</div></body></html>'

fs.readFile( 'contents/source/2015-01-25.md', 'utf-8', function( err, data ) {
    var html = prefix + markdown.toHTML( data ) + suffix,
        css  = fs.readFileSync( 'build/css/email.css', 'utf-8' ),
        result

    result = juice.inlineContent( html, css )

    fs.writeFile( 'contents/datas/2015-01-25.html', result )
})
