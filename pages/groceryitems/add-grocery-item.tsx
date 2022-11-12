import React, {useState, useEffect} from 'react';
import { Dialog } from '@headlessui/react';

const AddGroceryItem = (props) => {
    if (!props || !props.item) return (<></>)


    const submitItem = async (event) => {
        event.preventDefault()

        const number = parseFloat(event.target.number.value)

        if (!number) {
            alert('Please enter a valid number')
            return false
        }

        const data = {
            name: props.item.Name,
            unit: props.item.Unit,
            cost: props.item.Cost,
            number: number,
        }

        const jsonData = JSON.stringify(data)

        const endpoint = "http://localhost:8080/grocerylist/addItem"
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
            alert(event.target.number.value + ' ' + props.item.Name + ' added to list')
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
                    <Dialog.Title className="text-center text-2xl p-2">Add Item to Grocery List</Dialog.Title>
                    <div className="grid grid-cols-3">
                        <div>Name: {props.item.Name}</div>
                        <div>Unit: {props.item.Unit}</div>
                        <div>Number: <input type="text" id="number" name="number" required className="w-4/5" /></div>
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

export { AddGroceryItem };