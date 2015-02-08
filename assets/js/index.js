~function( global ) {
    "use strict"

    let $     = global.$,
        fetch = global.fetch,

        htmlEl    = $( 'html' )[ 0 ],
        articleEl = $( '#article' )[ 0 ],
        rdate     = /#(\d{4}\-\d{2}\-\d{2})/,

        LOAD_CLASS = 'loaded',

        listData

    fetch( 'datas.json' )
        .then( resp =>
            resp.json()
        )
        .then( data => {
            listData = data
            navigate( location.hash )
        })

    function filterName( data, name ) {
        return data.filter( date =>
            name == date
        )
    }

    function navigate( hash ) {
        let match, issue,
            last = listData[ listData.length - 1 ]

        if ( match = hash.match( rdate ) ) {
            match = match[ 1 ]

            issue = filterName( listData, match )

            issue = issue.length ? issue[ 0 ] : last

        } else if ( hash == 'entries' ) {
            //TODO
        } else {
            issue = last
        }

        htmlEl.classList.remove( LOAD_CLASS )
        fetch( `contents/indeterminate/${ issue }.html` )
            .then( resp => resp.text() )
            .then( html => {
                articleEl.innerHTML = html
                setTimeout( () =>
                    htmlEl.classList.add( LOAD_CLASS )
                ,1000 )
            })
            .catch( err => console.log( err ) )
    }

    global.onhashchange = ( e ) => {
        navigate( e.newURL )
    }
}( window )
