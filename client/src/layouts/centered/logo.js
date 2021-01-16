import React from 'react'
import Link from 'next/link'

const Logo = () => {
 
  return (
    <div
      className="logo flex flex-row items-center uppercase font-bold text-lg tracking-wider justify-center mb-4">
      <Link href="/">
        <a className="flex flex-row items-center justify-start children-x-1">
        <div className="flex-shrink-0 w-40">
            <img
              src={'/images/logo.png'}
             
            />
          </div>
        </a>
      </Link>
    </div>
  )
}

export default Logo
