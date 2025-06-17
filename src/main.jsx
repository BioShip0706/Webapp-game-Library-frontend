import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
//import App from './App.jsx'
import Test from './components/AllGames'
import "./global.css"
import AllGames from './components/AllGames'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GameFull from './components/GameFull'
import FilteredGames from './components/FilteredGames'
import Register from './components/Register'
import Login from './components/Login'
import FavoriteGames from './components/FavoriteGames'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllGames></AllGames>,
  },
  {
    path: "/register",
    element: <Register></Register>
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  // {
  //   path: "/AllGames/:gameId",
  //   element: <GameFull></GameFull>
  // },
  {
    path: "/game/:gameId",
    element: <GameFull></GameFull>
  },
  {
    path: "/game/filters",
    element: <FilteredGames></FilteredGames>
  },
  {
    path: "/preferiti",
    element: <FavoriteGames></FavoriteGames>
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router ={router}/>
  </StrictMode>,
)
