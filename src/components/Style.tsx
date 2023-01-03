import React from 'react'

type Style = {
    name: string,
    preview: string,
}

const Style = (style: Style) => {
    return (
        <div className='cursor-pointer h-96 w-72 flex-none rounded-md bg-slate-200'>
            <p className='text-center text-xl p-2 '>{style.name}</p>
            <img className='h-72' src={style.preview} alt={style.name} />
        </div>
    )
}

export default Style