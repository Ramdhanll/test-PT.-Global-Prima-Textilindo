import React, { useEffect, useReducer, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import AuthRoute from './components/AuthRoute'
import {
   initialUserState,
   UserContextProvider,
   userReducer,
} from './contexts/user'
import logging from './config/logging'
import { Box } from '@chakra-ui/react'
import AuthService from './services/auth'

function App() {
   const [userState, userDispatch] = useReducer(userReducer, initialUserState)

   const [loading, setLoading] = useState<boolean>(true)

   // Used for Debugging
   const [authStage, setAuthStage] = useState<string>('Checking token ...')

   useEffect(() => {
      setTimeout(() => {
         checkTokenForCredentials()
      }, 1000)
   }, [])

   /**
    * Check to see if we have a token.
    * If we do, verify it with the backend,
    * If not, we are logged out initially
    */

   const checkTokenForCredentials = () => {
      setAuthStage('Checking credentials ...')

      return AuthService.Validate((error, user) => {
         if (error) {
            logging.error(error)
            setAuthStage(`User not valid, logging out ...`)
            userDispatch({ type: 'logout', payload: initialUserState })
            setTimeout(() => {
               setLoading(false)
            }, 1000)
         } else if (user) {
            setAuthStage(`User authenticated.`)
            userDispatch({ type: 'login', payload: { user } })
            setTimeout(() => {
               setLoading(false)
            }, 1000)
         }
      })
   }

   if (loading) {
      return <Box>Loading... {authStage}</Box>
   }

   return (
      <div className='App'>
         <UserContextProvider value={{ userState, userDispatch }}>
            <Routes>
               {routes.map((route, index) => {
                  if (route.auth) {
                     return (
                        <Route
                           key={index}
                           path={route.path}
                           element={
                              <AuthRoute>
                                 <route.component />
                              </AuthRoute>
                           }
                        />
                     )
                  }

                  return (
                     <Route
                        key={index}
                        path={route.path}
                        element={<route.component />}
                     />
                  )
               })}
            </Routes>
         </UserContextProvider>
      </div>
   )
}

export default App
