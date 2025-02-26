import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AutocompleteSearch = () => {
    const [input, setInput] = useState("")

    const [result, setResult] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://dummyjson.com/recipes/search?q=${input}`);
            console.log(response);

            setResult(response?.data?.recipes);  // Correct way to access data
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {

        fetchData()

    }, [input])
    return (
        <>
            <div className='flex justify-center align-middle   h-100vh'>
                <div className='flex-col items-center justify-center align-middle   h-100vh'>
                    <div className="bg-white mt-5 shadow-lg p-6 rounded-2xl w-96">
                        <h1 className="text-2xl font-semibold text-gray-700 mb-3">Autocomplete Search</h1>
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <div className="bg-gray-200 mt-2 max-h-90 overflow-scroll  shadow-lg p-6 rounded-2xl w-96">
                        {result.map((results) => (
                            <span className=' text-gray-700 p-1.5 block hover:bg-gray-100' key={results.id}>{results.name}</span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AutocompleteSearch