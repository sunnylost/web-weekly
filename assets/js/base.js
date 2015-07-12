let doc = window.document,
    base

base = {
    $( selector ) {
        return doc.querySelectorAll( selector )
    }
}

for ( let key in base ) {
    window[ key ] = base[ key ]
}
