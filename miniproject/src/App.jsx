import { useState } from 'react'
import AutocompleteSearch from './pages/AutoCompleteSearch/AutocompleteSearch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <AutocompleteSearch />
      </div>
    </>
  )
}

export default App
