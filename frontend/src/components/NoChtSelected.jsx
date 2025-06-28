import { MessageSquare } from 'lucide-react'
import React from 'react'

const NoChtSelected = () => {
  return (
    <div className='w-full  flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50'>
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="s-16 rounded-2xl animate-bounce bg-primary/10 flex items-center">
              <MessageSquare className='w-8 m-3 h-8 text-pretty ' />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className='text-2xl font-bold'>Welcome to Chatty!</h2>
        <p className="text-base-content/60" >
          Select a conversation from the sidebar to start chartting
        </p>
      </div>
    </div>
  )
}

export default NoChtSelected
