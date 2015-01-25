var fs         = require( 'fs' ),
    nodemailer = require( 'nodemailer' ),

    fromAddress = 'sunnylost@gmail.com'

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: fromAddress,
        pass: '' //INPUT PASSWORD
    }
})

var mailOptions = {
    from: 'sunnylost<' + fromAddress + '>', // sender address
    to: '', // list of receivers
    subject: 'Web Weekly', // Subject line
    html:  fs.readFileSync( 'contents/datas/2015-01-25.html', 'utf-8' )// html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});
