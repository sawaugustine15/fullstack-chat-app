import React from 'react'
//... needed
const AuthImagePattern = ({title, subtitle}) => {
  return (
    <div className='hidden lg:flex items-center justify-center bg-gray-900 bg-opacity-0 p-12'>
      <div className="max-w-xs text-center">
        <div className="grid grid-cols-3 gap-3 mb-9">
        {[...Array(9)].map((_, i) => (
            <div 
            key={i}
            className={`aspect-square rounded-2xl bg-orange-900 bg-opacity-0 ${
                i % 2 === 0 ? "animate-pulse" : ""
            }`}
            />
        ))}
        </div>
        <h2 className='text-2.l font-blod mb-4'>{title}</h2>
        <p className='text-2.l'>{subtitle}</p>
      </div>
    </div>
  )
}

export default AuthImagePattern
