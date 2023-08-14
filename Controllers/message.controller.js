const responseRouter = require('express').Router();
const responseModel = require('../models/response.model');
var nodemailer = require('nodemailer');

responseRouter.post('/', (req, res, next) => {
    const data = req.body;
    const NewMessage = new responseModel({ ...data });
    NewMessage.save()
        .then(response => {
            if (response && response._id) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: `${process.env.NODEMAILER_EMAIL_ADDRESS}`,
                        pass: `${process.env.NODEMAILER_PASSWORD}`
                    }
                });

                var mailOptions = {
                    from: `"parthiban" <${process.env.NODEMAILER_EMAIL_ADDRESS}>`,
                    to: `${process.env.NODEMAILER_EMAIL_ADDRESS_FOR_RECEIVER}`,
                    subject: 'Job Offer',
                    text: `Name : ${response.name}
                    Email : ${response.email}
                    Message : ${response.message}`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return res.status(401).json({
                            success: false,
                            message: "Email send Failed due to internet connectivity"
                        })
                    } else {
                        return res.status(200).json({
                            success: true,
                            message: "Email send Successfully"
                        })
                    }
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: "Enter Message...."
                })
            }
        })
})

module.exports = responseRouter;