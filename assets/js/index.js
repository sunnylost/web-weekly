~function( global ) {
    "use strict"

    let $ = global.$

    setTimeout( () => {
        $( '#overlay' )[ 0 ].classList.add( 'hide' )
    }, 1000 )
}( window )
