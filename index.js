'use strict'

let fs          = require( 'fs' ),
    nodemailer  = require( 'nodemailer' ),

    config      = JSON.parse( fs.readFileSync( 'infos.json' ) ),

    fromAddress = config.sender.user,

    transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: config.sender
    })


fs.readFile( 'contents/email/2015-01-25.html', 'utf-8', function( err, content ) {
    config.receivers.forEach( function( r ) {
        transporter.sendMail({
            from: 'sunnylost<' + fromAddress + '>',
            to: r,
            subject: 'Web Weekly',
            html:  content
        }, function( err, info ) {
            if ( err ) {
                console.error( err )
            } else {
                console.log( 'Send OK ' + r )
            }
        })
    })
} )
