import React, {useState, useEffect} from 'react';
import { Dialog } from '@headlessui/react';
import { AddGroceryItem } from './add-grocery-item';

export default function GroceryItems(props) {
    let [items, setItems] = useState(null);
    let [isLoading, setLoading] = useState(true);
    let [isAddItemToListOpen, setAddItemToListOpen] = useState(false);
    let [selected, setSelected] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/groceryitems?name=')
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setItems(data);
                setLoading(false);
            })
    }, [props.refresh]);

    const handleItemClick = (item) => {
        setAddItemToListOpen(true)
        setSelected(item)
        console.log(item)
    }

    if (isLoading) return <p>Loading...</p>
    if (!items) return <p>No data found!</p>

    return (
        <div className="w-full flex justify-center bg-cyan-800 rounded-2xl">
            <table className="table-auto bg-cyan-800 border-collapse rounded-2xl w-full mt-5 text-left">
                <thead>
                    <tr>
                        <th className="p-2 w-1/2">Name</th>
                        <th className="p-2 w-1/6">Unit</th>
                        <th className="p-2 w-1/6">Cost</th>
                        <th className="p-2 w-1/6">{' '}</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item, i) => 
                        <tr key={i}>
                            <td className="p-2">{item.Name}</td>
                            <td className="p-2">{item.Unit}</td>
                            <td className="p-2">${item.Cost}</td>
                            <td className="p-2 text-right"><button onClick={() => handleItemClick(item)} className="bg-stone-400 rounded-full p-1 px-5 bg-opacity-70 text-white hover:bg-opacity-50 hover:bg-stone-300 hover:shadow-2xl">add</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <AddGroceryItem
                isOpen={isAddItemToListOpen}
                setOpen={setAddItemToListOpen}
                item={selected}
            />
        </div>
    )
}