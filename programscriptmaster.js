// email_subscription_service.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let subscribers = [];

// Subscribe to the service
app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        res.status(200).json({ message: 'Subscription successful' });
    } else {
        res.status(400).json({ message: 'Email already subscribed' });
    }
});

// Unsubscribe from the service
app.post('/unsubscribe', (req, res) => {
    const { email } = req.body;
    if (subscribers.includes(email)) {
        subscribers = subscribers.filter(subscriber => subscriber !== email);
        res.status(200).json({ message: 'Unsubscription successful' });
    } else {
        res.status(400).json({ message: 'Email not subscribed' });
    }
});

// Send newsletter to all subscribers
app.post('/sendNewsletter', (req, res) => {
    const { newsletter } = req.body;
    subscribers.forEach(subscriber => {
        console.log(`Sending newsletter to ${subscriber}: ${newsletter}`);
    });
    res.status(200).json({ message: 'Newsletter sent to all subscribers' });
});

// Listen on port
const port = 3000;
app.listen(port, () => {
    console.log(`Email subscription service running on http://localhost:${port}`);
});
