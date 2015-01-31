~function( global ) {
    "use strict"

    let $     = global.$,
        fetch = global.fetch

    fetch( 'contents/indeterminate/2015-01-25.html' )
        .then( resp =>
            resp.text()
        )
        .then( html => {
            $( '#article' )[ 0 ].innerHTML = html
            setTimeout( () =>
                $( 'html' )[ 0 ].classList.add( 'loaded' )
            ,1000 )
        })
}( window )
