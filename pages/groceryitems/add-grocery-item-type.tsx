import React, {useState, useEffect} from 'react';
import { Dialog } from '@headlessui/react';

const AddGroceryItemType = (props) => {
    const submitItem = async (event) => {
        event.preventDefault()

        const cost = parseFloat(event.target.cost.value)
        if (!cost) {
            alert('Please enter a valid number')
            return false
        }
        
        const name = event.target.name.value
        if (!name) {
            alert('Please enter a valid name')
            return false
        }

        const unit = event.target.unit.value
        if (!unit) {
            alert('Please enter a valid unit')
            return false
        }


        const data = {
            name: name,
            unit: unit, 
            cost: cost,
        }

        const jsonData = JSON.stringify(data)

        const endpoint = "http://localhost:8080/groceryitems"
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        }

        const response = await fetch(endpoint, options)

        const result = await response
        console.log(result)
        if (result.status == 201) {
            alert(name + ' was added as a grocery item type!')
            props.successCallback()
        } else {
            alert('There was an issue, item could not be added to list')
        }
        props.setOpen(false)
    }

    return (
    <Dialog open={props.isOpen} onClose={() => props.setOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex text-slate-300 items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <div className="relative bg-indigo-700 bg-opacity-90 rounded max-w-sm mx-auto p-5">
                <form onSubmit={submitItem}>
                    <Dialog.Title className="text-center text-2xl p-2">Add Item Type</Dialog.Title>
                    <div className="grid grid-cols-1">
                        <div className="p-3 grid grid-cols-3"><p className="">Name: </p><input type="text" id="name" name="name" required className="col-span-2 w-4/5" /></div>
                        <div className="p-3 grid grid-cols-3"><p className="">Unit: </p><input type="text" id="unit" name="unit" required className="col-span-2 w-4/5" /></div>
                        <div className="p-3 grid grid-cols-3"><p className="">Cost: </p><input type="text" id="cost" name="cost" required className="col-span-2 w-4/5" /></div>
                    </div>

                    <div className="flex flex-row-reverse mt-3">
                        <button type="submit" className="rounded-full bg-pink-800 bg-opacity-50 hover:bg-opacity-80 p-2 px-4">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </Dialog>
    );
}

export { AddGroceryItemType };