import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request) {
  if (process.env.RAZORPAY_KEY_ID === undefined || process.env.RAZORPAY_KEY_SECRET === undefined) {
    return NextResponse.json(
      { error: 'Razorpay credentials are not configured' },
      { status: 500 }
    );
  }

  try {
    const { amount } = await request.json();

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in paise (100 = ₹1)
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Razorpay error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}