import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const options = {
        amount: req.body.amount, // amount in paise (5000 = ₹50)
        currency: "INR",
        receipt: "receipt#1",
      };

      const order = await instance.orders.create(options);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
