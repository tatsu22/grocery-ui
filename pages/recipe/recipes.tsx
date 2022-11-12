import React, { useState } from 'react'

export default function Recipe() {
    const [isOpen, setOpen] = useState(false)
    const [toggle, setToggle] = useState(false)

    const toggleCallback = () => {
        setToggle(!toggle)
    }

    return (
        <div className="w-full justify-center items-center">
            <h0 className="text-6xl font-bold bg-cyan-800 mb-0 rounded-t-2xl p-3 px-5">
                {'    '}My Recipes{'    '}
            </h0>
            {/* <GroceryItems 
                refresh={toggle}
            />
            <div className="w-full flex justify-start">
                <button onClick={() => setOpen(true)} className="mt-2 bg-cyan-800 rounded-full p-1 px-4 text-white bg-opacity-70 hover:bg-cyan-600 hover:shadow-2xl hover:bg-opacity-50">+ New Item</button>
            </div>
            <AddGroceryItemType
                isOpen={isOpen}
                setOpen={setOpen}
                successCallback={toggleCallback}
                /> */}
        </div>
    )
}