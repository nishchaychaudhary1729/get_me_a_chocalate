'use client'

import React from 'react'
import Button from "@/components/button"

const Navbar = () => {

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      <h1 className="text-xl font-bold text-yellow-600">Coffee for Code☕</h1>
      
        <div className="space-x-4">
          <Button variant="outline" text="Sign In" />
          <Button text="Sign Up" />
        </div>
      
    </nav>
  )
}

export default Navbar
