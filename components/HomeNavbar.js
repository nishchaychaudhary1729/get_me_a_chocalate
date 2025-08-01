'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const HomeNavbar = ({ username }) => {
  const router = useRouter()

  const handleSignOut = () => {
    // Remove auth cookie
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    // Redirect to home page
    router.push('/')
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-yellow-600">Coffee for Code☕</h1>
        <span className="text-sm text-gray-600">Welcome, {username}!</span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleSignOut}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </nav>
  )
}

export default HomeNavbar
