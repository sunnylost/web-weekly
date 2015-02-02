~function( global ) {
    "use strict"

    let $     = global.$,
        fetch = global.fetch,
        hash  = location.hash,
        rdate = /^#\d{4}\-\d{2}\-\d{2}$/

    fetch( 'datas.json' )
        .then( resp =>
            resp.json()
        )
        .then( data => {
            let match, issue

            if ( match = hash.match( rdate ) ) {
                match = match[ 0 ]

                issue = data.filter( date =>
                    match == date
                )

                issue = issue.length ? issue[ 0 ] : data.pop()
            } else {
                issue = data.pop()
            }

            return fetch( `contents/indeterminate/${ issue }.html` )
        })
        .then( resp =>
            resp.text()
        )
        .then( html => {
            $( '#article' )[ 0 ].innerHTML = html
            setTimeout( () =>
                $( 'html' )[ 0 ].classList.add( 'loaded' )
            ,1000 )
        })
        .catch( err =>
            console.log( err )
        )
}( window )
