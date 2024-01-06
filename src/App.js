import React from 'react'

import { AppContext } from './context/ContextApi'
import Header from './components/Header'
import Feed from './components/Feed'
import SearchResult from './components/SearchResult'

import { BrowserRouter, Route , Routes } from 'react-router-dom'
import VideoDetails from './components/VideoDetails';
import Premimum from './components/Premimum'
import Sucess from './components/Sucess'
import Cancel from './components/Cancel'

const App = () => {
 
  return (
    <AppContext>
      <BrowserRouter>
        <div className='flex flex-col h-full'>
          <Header />
          <Routes>
             <Route path='/' element={<Feed />} />
             <Route path='/searchresult/:searchquery' element={<SearchResult />} />
             <Route path='/video/:id' element={<VideoDetails />} />
             <Route path='/premium' element={<Premimum />} />
             <Route path='/success' element={<Sucess />} />
             <Route path='/cancel' element={<Cancel />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext>
  )
}

export default App