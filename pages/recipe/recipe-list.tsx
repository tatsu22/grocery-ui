import React, {useState, useEffect} from 'react';
import { Dialog } from '@headlessui/react';
import { AddGroceryItem } from './add-grocery-item';

export default function RecipeList(props) {
    let [recipes, setRecipes] = useState(null);
    let [isLoading, setLoading] = useState(true);
    let [isAddRecipeToListOpen, setAddRecipeToListOpen] = useState(false);
    let [selected, setSelected] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/recipes?name=')
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setRecipes(data.Recipes);
                setLoading(false);
            })
    }, [props.refresh]);

    const handleItemClick = (item) => {
        setAddRecipeToListOpen(true)
        setSelected(item)
        console.log(item)
    }

    if (isLoading) return <p>Loading...</p>
    if (!recipes) return <p>No data found!</p>

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
                    {recipes && recipes.map((recipe, i) => 
                        <tr key={i}>
                            <td className="p-2">{recipe.Name}</td>
                            <td className="p-2">{recipe.Unit}</td>
                            <td className="p-2">${recipe.Cost}</td>
                            <td className="p-2 text-right"><button onClick={() => handleItemClick(recipe)} className="bg-stone-400 rounded-full p-1 px-5 bg-opacity-70 text-white hover:bg-opacity-50 hover:bg-stone-300 hover:shadow-2xl">add</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <AddRecipe
                isOpen={isAddRecipeToListOpen}
                setOpen={setAddRecipeToListOpen}
                item={selected}
            />
        </div>
    )
}

const AddRecipe = (props) => {
    const submitItem = async (event) => {
        event.preventDefault()

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
        }

        const jsonData = JSON.stringify(data)

        const endpoint = "http://localhost:8080/recipes"
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