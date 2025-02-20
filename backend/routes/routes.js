const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET} = require("../config.js")

const router = express.Router();

// Initialize Razorpay Instance
const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
})

router.get('/', (req, res) => {
    res.send('Hello World');
});

// Route: Create Razorpay Order
router.post("/create-order", async (req,res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100, // Convert to paisa
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        }

        const order = await razorpay.orders.create(options);
        console.log(order)
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.post('/create-plan', async (req, res) => {
  try {
    const { amount, interval, name } = req.body;  // Amount in INR, interval: monthly/yearly, etc.

    // Create the plan
    const plan = await razorpay.plans.create({
      period: interval,    // 'monthly' or 'yearly'
      item: {
        name: name,   // Plan name
        amount: amount * 100,  // Convert to paisa
        currency: 'INR',
        description: `Subscription for ${name} plan`,
      },
      total_count: 12, // Number of payments (12 months for example)
    });

    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to create a subscription
router.post('/create-subscription', async (req, res) => {
    try {
      const { plan_id, customer_email } = req.body;
  
      // Create the subscription
      const subscription = await razorpay.subscriptions.create({
        plan_id: plan_id,
        customer_notify: 1,
        total_count: 12, // Recurring payments for 12 months (Adjust as needed)
        start_at: Math.floor(Date.now() / 1000),
        notes: {
          email: customer_email,
        },
      });
  
      res.json(subscription);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  


module.exports = router;