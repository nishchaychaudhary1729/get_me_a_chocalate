'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const Button = ({text}) => {
  const router = useRouter()

  const handleSignIn = () => {
    if(text === 'Sign Up') {
      router.push('/signup')
    } else if(text === 'Sign In') {
      router.push('/signin')
    }
    else if(text === 'Buy Me a Coffee') {
      router.push('/signin')
    }
  }

  return (
    <button 
      onClick={handleSignIn}
      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      {text}
    </button>
  )
}

export default Button