'use strict'

let fs          = require( 'fs' ),
    dateExtend  = require( 'date-extended' ),
    nodemailer  = require( 'nodemailer' ),

    config      = JSON.parse( fs.readFileSync( 'infos.json' ) ),

    fromAddress = config.sender.user,

    transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: config.sender
    }),

    curDate = dateExtend.format( new Date, 'yyyy-MM-dd' ),

    DATA_PATH = 'datas.json'

fs.readFile( DATA_PATH, 'utf-8', function( err, content ) {
    let data = JSON.parse( content )
    if ( curDate != data[ data.length - 1 ] ) {
        data.push( curDate )
        fs.writeFile( DATA_PATH, JSON.stringify( data ) )
    }
})

fs.readFile( `contents/email/${curDate}.html`, 'utf-8', function( err, content ) {
    config.receivers.forEach( function( r ) {
        transporter.sendMail({
            from: `sunnylost<${fromAddress}>`,
            to: r,
            subject: 'Web Weekly',
            html:  content
        }, function( err ) {
            if ( err ) {
                console.error( err )
            } else {
                console.log( `Send OK ${r}` )
            }
        })
    })
} )
