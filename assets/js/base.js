~function( global ) {
    "use strict"

    let doc = global.document,
        base

    base = {
        $( selector ) {
            return doc.querySelectorAll( selector )
        }
    }

    for ( let key in base ) {
        global[ key ] = base[ key ]
    }
}( window )
