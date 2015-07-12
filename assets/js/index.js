let global          = window,
    $               = global.$,
    fetch           = global.fetch,

    htmlEl          = $( 'html' )[ 0 ],
    bodyEl          = $( 'body' )[ 0 ],
    articleEl       = $( '#article' )[ 0 ],
    zombieEl        = $( '#zombie' )[ 0 ],

    cached          = {},

    rdate           = /(\d{4}\-\d{2}\-\d{2})/,
    isArchivesShown = false,
    hasArchives     = false,

    ARCHIVES        = 'archives',
    ARCHIVES_SHOWN  = 'archives-shown',
    LOAD_CLASS      = 'loaded',
    newDate         = +( new Date ),

    navigate, generatearchives, toggleArchives, hideArchives, showArchives,
    listData, archivesEl

fetch( `datas.json?t=${newDate}` )
    .then( resp => resp.json() )
    .then( data => {
        listData = data
        navigate( location.hash.substring( 1 ) )
        generatearchives()
    } )

navigate = hash => {
    let match, issue,
        last = listData[ listData.length - 1 ]

    if ( match = hash.match( rdate ) ) {
        match = match[ 1 ]
        issue = listData.filter( date => date == match )
        issue = issue.length ? issue[ 0 ] : last
    } else {
        issue = last
    }

    if ( cached[ issue ] ) {
        return articleEl.innerHTML = cached[ issue ]
    }

    htmlEl.classList.remove( LOAD_CLASS )

    fetch( `contents/indeterminate/${ issue }.html` )
        .then( resp => resp.text() )
        .then( rawHtml => {
            cached[ issue ] = articleEl.innerHTML = rawHtml
            setTimeout( () => htmlEl.classList.add( LOAD_CLASS ), 1000 )
        } )
}

generatearchives = () => {
    archivesEl           = document.createElement( 'ul' )
    archivesEl.className = 'archives'
    archivesEl.innerHTML = listData.map( ( value, i ) => {
        return `<li><a href="#${value}">#${i + 1}</a></li>`
    } ).join( '' )
    bodyEl.appendChild( archivesEl )

    hasArchives        = true
    archivesEl.onclick = ( e ) => {
        if ( e.target.tagName.toLocaleLowerCase() == 'a' ) {
            toggleArchives()
        }
    }

    if ( location.hash.substring( 1 ) == ARCHIVES ) {
        showArchives()
    }
}

toggleArchives = () => hasArchives && isArchivesShown ? hideArchives() : showArchives()

hideArchives = () => {
    htmlEl.classList.remove( ARCHIVES_SHOWN )
    isArchivesShown = false
}

showArchives = () => {
    htmlEl.classList.add( ARCHIVES_SHOWN )
    isArchivesShown = true
}

$( '#archives' )[ 0 ].onclick = toggleArchives

global.onkeyup = e => e.keyCode == 27 && hideArchives()

global.onhashchange = e => {
    let hash
    zombieEl.href = e.newURL
    hash          = zombieEl.hash.substring( 1 )

    if ( hash == ARCHIVES ) {
        showArchives()
    } else {
        hideArchives()
        navigate( hash )
    }
}
