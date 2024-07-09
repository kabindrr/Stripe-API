import express, { response } from "express";
import cors from "cors";

const app = express();

const PORT = 3000;

import Stripe from "stripe";

app.use(express.json());
app.use(cors());

const stripe = new Stripe(
  "sk_test_51PaSRPRuSgD95vZVF8LyloNKPXFV9UEvyJ2kOqFIToJEPnMf2WzL9AVlc4De9ISj9TaSrnESFWfipRy3OQgSGjcT005ZyUcwlw"
);

app.post("/create-stripe-payment", async (req, res) => {
  try {
    const { amount, currency, paymentMethod } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
      payment_method_types: [paymentMethod],
    });

    console.log("paymentIntent", paymentIntent);
    res.json({ status: "success", clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
});

app.post("/confirm-order", (req, res) => {
  console.log(req.body);

  res.json({
    status: "success",
  });
});

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "stripe is running",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log("server not connected")
    : console.log(`port connected at ${PORT}`);
});
