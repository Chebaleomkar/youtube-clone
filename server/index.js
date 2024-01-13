  const express = require('express');
  const app = express();
  const dotenv = require('dotenv').config();
  const stripe = require('stripe')(process.env.STRIPE_KEY);
  const cors = require('cors');
  const nodemailer = require('nodemailer');
  const { config } = require('dotenv');


  // Middleware
  app.use(cors({ origin: 'http://localhost:3000' }));
  app.use(express.json());

  // Checkout route
  // Checkout route
  app.post('/api/checkout', async (req, res) => {
    try {
      const { items } = req.body;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items.map(item => ({
          price_data: {
            currency: 'inr',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });

      res.json({ sessionId: session.id });
      
    } catch (err) {
      console.error('Error during checkout:', err);
      res.status(500).json({ error: { message: 'Internal Server Error' } });
    }
  });


  // Email route
  app.post('/api/email', async (req, res) => {
    try {
      const { emailAdd, price } = req.body;

      // Create a transporter for sending emails
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'omkarchebale0@gmail.com',
          pass: 'mage vdjk uofv ncxg',
        },
      });

      // Email content
      const mailOptions = {
        from: 'omkarchebale0@gmail.com',
        to: email,
        subject: 'Congratulation , You are Premium Member  ',
        html: `<h1>Thanks for purchasing premium plan </h1>
        <br/>
          <h3>The plan of ${price} </h3> <br/>
        <h5>Enjoy premium benefits </h5> <br/>
        <b>Thank  you </b>
        `
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      // console.error('Error sending email:', error);
      res.status(500).json({ error: { message: 'Internal Server Error' } });
    }
  });

  // Start the server
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
