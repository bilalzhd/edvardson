"use client"

import { useState } from 'react'

export default function TopInformation() {
    const [show, setShow] = useState(true)
    return (
        <div className={`${show ? 'flex' : 'hidden'} bg-[#1F140D] text-white px-4 py-3 items-center justify-between`} role="alert">
            <div className="flex items-center">
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2 0h16a2 2 0 0 1 2 2v16c0 1.1-.9 2-2 2H2a2 2 0 0 1-2-2V2c0-1.1.9-2 2-2zm2 4v2h12V4H4zm0 4v2h12V8H4zm0 4v2h8v-2H4z" /></svg>
                <p className="font-bold">Vi uppdaterar vår hemsida, ber om ursäkt för eventuella besvär</p>
            </div>
            <div className="text-right">
                <button onClick={() => setShow(false)} className="border border-white py-1 px-2 text-white hover:text-red-500 focus:outline-none">Stäng</button>
            </div>
        </div>
    )
}
