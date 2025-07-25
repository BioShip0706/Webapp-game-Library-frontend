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
import FavoriteContextProvider from './store/FavoriteContext'
import AuthContextProvider from './store/AuthContext'
import GameForm from './components/GameForm'
import SearchedGames from './components/SearchedGames'






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
    path: "/favorites",
    element: <FavoriteGames filterFavorites={true}></FavoriteGames>
  },
  {
    path: "/gameForm",
    element: <GameForm></GameForm>
  },
  {
    path: "/searchedGames",
    element: <SearchedGames></SearchedGames>
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <FavoriteContextProvider>
        <RouterProvider router ={router}/>
      </FavoriteContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
