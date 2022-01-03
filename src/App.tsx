import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import routes from './routes'

function App() {
   return (
      <div className='App'>
         <Routes>
            {routes.map((route, index) => {
               return (
                  <Route
                     key={index}
                     path={route.path}
                     element={<route.component />}
                  />
               )
            })}
         </Routes>
      </div>
   )
}

export default App
