
const express = require('express')
const router = express.Router()
// const Mailgun = require('mailgun-js')
const nodemailer = require('nodemailer')
const visitor = require('../models/visitor')
const Settings = require('../models/settings')

router.post('/en/contactsubmit', (req, res, next) => {

      Settings.findOne((err,settings) => {

    // const mailgun = Mailgun ({
    //   apiKey: '41f364dede473e42f69a4463956d0b64-ee13fadb-bc204994',
    //   domain: 'sandbox111f2f4879dd4ae681411647f7d1ef25.mailgun.org'
    // })

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'signaturebusinessmenservices@gmail.com',
        pass: 'signaturepass2020'
      }
    });

    const mailOptions = {
      from: '"Signature" <signature.ae>',
      to: 'info@signature.ae, accounts@signature.ae, support@signature.ae',
      subject: 'Inquiry - Signature',
      html: '<h3>Name: '  + req.body.name + '</h3>' + '<h3>Email: '  + req.body.email + '</h3>' + '<h3>Phone: '  + req.body.phoneNumber + '</h3>' + '<h3>Message: ' + req.body.message + '</h3>',

    }


    // mailgun.messages().send(data, (err, body) => {
    //   if(err)
    transporter.sendMail(mailOptions, (error, info) => {
        if (error)

        // res.render('error')
          return next (error)

          visitor.create(req.body, (err, visitors) => {
        if (err)
            return next(err)

            //return next (err)
        const data = {
            visitors: visitors
        }

        res.render('success', {layout: 'layouten', data: data, sender: req.body.name, settings: settings})
        // res.json(data)

      })
    })
  })
})

router.post('/ar/contactsubmit', (req, res, next) => {

    Settings.findOne((err,settings) => {

    // const mailgun = Mailgun ({
    //   apiKey: '41f364dede473e42f69a4463956d0b64-ee13fadb-bc204994',
    //   domain: 'sandbox111f2f4879dd4ae681411647f7d1ef25.mailgun.org'
    // })

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'signaturebusinessmenservices@gmail.com',
        pass: 'signaturepass2020'
      }
    });

    const mailOptions = {
      from: '"Signature" <signature.ae>',
      to: 'info@signature.ae,accounts@signature.ae,support@signature.ae',
      subject: 'Inquiry - Signature',
      html: '<h3>Name: '  + req.body.name + '</h3>' + '<h3>Email: '  + req.body.email + '</h3>' + '<h3>Phone: '  + req.body.phoneNumber + '</h3>' + '<h3>Message: ' + req.body.message + '</h3>',

    }


    // mailgun.messages().send(data, (err, body) => {
    //   if(err)
    transporter.sendMail(mailOptions, (error, info) => {
        if (error)

        // res.render('error')
          return next (error)

          visitor.create(req.body, (err, visitors) => {
            if (err)

            return next(err)
            //return next (err)

        const data = {
            visitors: visitors
        }

        res.render('arviews/success', {layout: 'layoutar', data: data, sender: req.body.name, settings: settings})
        // re.json(data)

      })
    })
  })
})


module.exports = router
