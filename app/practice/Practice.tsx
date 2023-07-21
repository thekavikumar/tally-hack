"use client"

import React from 'react'

import Image from 'next/image'
import avatar from '../../public/avatar-placeholder.png'
type Props = {}

const Practice = (props: Props) => {
  let x = " lorem ipsum dolor sit amet";
  const [text, setText] = React.useState(x)
  const [score, setScore] = React.useState(0)
  const [time, setTime] = React.useState(0)
  const [name, setName] = React.useState('')
  

  return (
    <div className='flex justify-center'>
        <div className=' w-5/6 h-4/6 min-h-fit min-w-fit outline-dashed outline-1 rounded-lg p-4 flex flex-col justify-center items-center'>
            <h1 className=' text-lg font-medium'>Practice</h1>
            <br/>
            <div className=' border outline-1 rounded-md w-3/5 '>
              <div className='flex justify-evenly'>
                <div className='p-3 w-1/3 text-center hover:bg-slate-900'>
                    <h3>1 min Practice</h3>
                </div>
                <div className='p-3 w-1/3 text-center hover:bg-slate-900'>
                    <h3>3 min Practice</h3>
                </div>
                <div className='p-3 w-1/3 text-center hover:bg-slate-900'>
                    <h3>5 min Practice</h3>
                </div>
              </div>
              <hr/>
              <div className='p-8'>
                <div className=' flex justify-evenly align-middle'>
                  <div className='border outline-4 w-1/5 p-4 rounded-full outline-slate-700 flex '>
                    <Image src={avatar} alt='avatar'/>
                  </div>
                  <h3 className='text-center'>User Name: <span>{name}</span></h3>
                </div>
                  <hr/>
                <div>
                  <h3 className='text-center'>Score: <span>{score}</span></h3>
                  <h3 className='text-center'>Time: <span>{time}</span></h3>

                </div>

              </div>
            </div>
            <br/>
            <div className=' border outline-1 rounded-md w-4/5 bg-slate-300 dark:bg-black p-3 justify-evenly'>
              <div className='p-3'>
                <p id="typing-input">{text}</p>
              </div>
              <hr/>
              <div className='p-3'>
                <input
                  type='text-area' id='practice-input'  className=' dark:text-white min-w-full min-h-full text-black bg-inherit outline-none'
                />
              </div>
            </div>
            <button>Refresh</button>
        </div>
    </div>
  )
}

export default Practice