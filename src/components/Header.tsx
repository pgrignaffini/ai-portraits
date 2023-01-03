import React from 'react'

const Header = () => {
    return (
        <div className='h-20 w-full py-6 px-12 flex justify-between'>
            <p className='text-4xl font-bold text-violet-700'>AI Portraits</p>
            <div className='flex space-x-6 px-12'>
                <p className='text-xl font-semibold text-black'>Home</p>
                <p className='text-xl font-semibold text-black'>Gallery</p>
            </div>
        </div>
    )
}

export default Header