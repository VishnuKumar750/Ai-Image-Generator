import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Home, CreatePost } from './pages';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <header className={'w-full py-4 shadow-md border-b flex items-center justify-between'}>
        <div className={'flex items-center justify-center'}>
        <Link to={'/'}><img className={'w-14 px-4'} src={'logo.svg'} alt="logo" /></Link>
        <h1 className={'font-manro font-bold text-xl'}>Image AI</h1>
        </div>
        <Link to={'/create-post'}>
        <div className={'px-4 py-2 border-b mx-7 bg-[#8783D1] rounded-md text-white font-manro font-bold uppercase'}>create</div>
        </Link>
      </header>
      <main className="w-full bg-[#f9fafe] min-h-[calc(100vh-73px)] relative">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost /> }/>
        </Routes>
      </main>
    </BrowserRouter>
    )
}

export default App
