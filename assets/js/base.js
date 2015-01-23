~function( global ) {
    let doc = global.document,
        base

    base = {
        $( selector ) {
            return doc.querySelectorAll( selector )
        }
    }
}( window )
