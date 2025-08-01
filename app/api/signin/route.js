import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please sign up.' },
        { status: 404 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'Sign in successful', userId: user._id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
