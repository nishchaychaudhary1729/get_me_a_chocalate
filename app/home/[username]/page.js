'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import HomeNavbar from '@/components/HomeNavbar'

const UserHome = () => {
  const params = useParams()
  const router = useRouter()
  const username = params.username

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

  const handlePayment = async () => {
    // TODO: Implement payment gateway integration
    console.log('Processing payment for $', amount)
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
              Support Through UPI 🍫
            </h3>
            
            <div className="flex flex-col items-center space-y-8">
              {/* QR Code */}
              <div className="relative w-64 h-64 border-2 border-gray-200 rounded-lg overflow-hidden">
                <Image
                  src="/qr-code.png" // Add your QR code image to the public folder
                  alt="UPI QR Code"
                  layout="fill"
                  objectFit="contain"
                  className="p-2"
                />
              </div>

              {/* UPI ID */}
              <div className="text-center space-y-4">
                <p className="text-lg font-medium text-gray-700">UPI ID:</p>
                <div className="flex items-center justify-center space-x-3">
                  <code className="px-4 py-2 bg-gray-100 rounded-md text-gray-800 font-mono">
                    9971476565@ybl
                  </code>
                </div>
              </div>
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
