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


module.exports = router;