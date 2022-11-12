import React, {useState, useEffect} from 'react';
import { Dialog } from '@headlessui/react';

export default function GroceryList(props) {
    let [list, setList] = useState(null);
    let [viewList, setViewList] = useState(null);
    let [isLoading, setLoading] = useState(true);
    let [refresh, setRefresh] = useState(false);

    const toggleRefresh = () => {
        setRefresh(!refresh);
    }

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/grocerylist')
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setList(data);
                setLoading(false);
            })
    }, [refresh]);

    const handleItemClick = async (item) => {
        const data = {
            name: item.Name,
            unit: item.Unit,
            number: item.Number,
        }

        const jsonData = JSON.stringify(data)

        const endpoint = "http://localhost:8080/grocerylist/subtractItem"
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
        if (result.status == 200) {
            alert(item.Name + ' was removed from grocery list!')
            toggleRefresh()
        } else {
            alert('There was an issue, item could not removed from list')
        }
    }

    if (isLoading) return <p>Loading...</p>
    if (!list) return <p>No data found!</p>

    return (
        <div className="w-full justify-center items-center">
            <h0 className="text-6xl font-bold bg-cyan-800 mb-0 rounded-t-2xl p-3">
                Grocery List
            </h0>
            <div className="w-full grid grid-cols-1 justify-center bg-cyan-800 rounded-2xl">
                <table className="table-auto bg-cyan-800 border-collapse rounded-2xl w-full mt-5 text-left">
                    <thead>
                        <tr className="grid grid-cols-12">
                            <th className="p-2 col-span-5">Name</th>
                            <th className="p-2 col-span-2">Unit</th>
                            <th className="p-2 col-span-2">Amount</th>
                            <th className="p-2 col-span-2">Cost</th>
                            <th className="p-2 col-span-1">{' '}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list && list.Items && list.Items.length > 0 && list.Items.map((item, i) => 
                            <tr className="grid grid-cols-12" key={i}>
                                <td className="p-2 col-span-5">{item.Name}</td>
                                <td className="p-2 col-span-2">{item.Unit}</td>
                                <td className="p-2 col-span-2">{item.Number}</td>
                                <td className="p-2 col-span-2">${item.Number * item.Cost}</td>
                                <td className="p-2 col-span-1 text-right"><button onClick={() => handleItemClick(item)} className="bg-stone-400 rounded-full p-1 px-5 bg-opacity-70 text-white hover:bg-opacity-50 hover:bg-stone-300 hover:shadow-2xl">X</button></td>
                            </tr>
                        )}
                        {list && list.TotalCost != 0 &&
                            <tr key="last" className="grid grid-cols-12 text-xl font-bold">
                                <td className="p-2 col-span-5">Total Cost:</td>
                                <td className="p-2 col-span-2">{' '}</td>
                                <td className="p-2 col-span-2">{' '}</td>
                                <td className="p-2 col-span-2">${list.TotalCost.toFixed(2)}</td>
                                <td className="p-2 col-span-1">{' '}</td>
                            </tr>
                        }
                    </tbody>
                </table>
                {list && list.Items && list.Items.length == 0 && 
                    <p className="text-3xl font-bold p-3 text-center">Your list is empty!</p>
                }
            </div>
        </div>
    )
}