'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import HomeNavbar from '@/components/HomeNavbar'
import Script from 'next/script'

const UserHome = () => {
  const params = useParams()
  const router = useRouter()
  const username = params.username
  const [amount, setAmount] = useState(1) // Default 1 chocolate = ₹1

  useEffect(() => {
    // Check if user is authenticated
    const authToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
    
    if (!authToken) {
      router.push('/signin')
      return
    }

    const userData = JSON.parse(authToken.split('=')[1])
    if (userData.username !== username) {
      router.push('/signin')
    }
  }, [username, router])

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    const res = await initializeRazorpay()
    if (!res) {
      alert('Razorpay SDK failed to load')
      return
    }

    try {
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to create order')

      const options = {
        key: 'rzp_test_RL0WDz71IcBvMC', // Use the key directly here for client-side
        amount: data.amount,
        currency: data.currency,
        name: 'Coffee for Code',
        description: `${amount} Chocolates Support`,
        order_id: data.id,
        handler: function (response) {
          alert('Payment successful! Thank you for your support! 🍫')
        },
        prefill: {
          name: username,
        },
        theme: {
          color: '#F59E0B',
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (error) {
      console.error('Payment error:', error)
      alert('Failed to process payment. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <HomeNavbar username={username} />
      {/* Hero Section */}
      <section className="text-center px-4 py-20 md:py-32">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 max-w-3xl mx-auto">
          Welcome {username}! ☕
        </h2>
        <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto">
          Your support means the world! Choose how many chocolates you'd like to contribute.
        </p>
      </section>

      {/* Payment Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Buy Me Some Chocolates 🍫
            </h3>
            
            <div className="flex flex-col items-center space-y-8">
              {/* Amount Selection */}
              <div className="w-full max-w-md">
                <label htmlFor="amount" className="block text-lg font-medium text-gray-700 mb-2 text-center">
                  How many chocolates? (₹1 each)
                </label>
                <input
                  type="number"
                  id="amount"
                  min="1"
                  max="100"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                className="px-8 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-lg font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Pay ₹{amount}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-semibold text-gray-800 mb-8">What Your Support Enables</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">💻</div>
              <h4 className="text-xl font-semibold mb-2">More Code</h4>
              <p className="text-gray-600">Helping create more open-source projects and tutorials</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📚</div>
              <h4 className="text-xl font-semibold mb-2">Better Content</h4>
              <p className="text-gray-600">Supporting the creation of high-quality learning resources</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🚀</div>
              <h4 className="text-xl font-semibold mb-2">New Features</h4>
              <p className="text-gray-600">Enabling development of new tools and features</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UserHome
