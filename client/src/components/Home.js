import React from "react"
import { useState } from "react"
import { Outlet, useOutletContext } from "react-router-dom"
import HomeCard from "./HomeCard"


function Home() {

     const [categories, items, , , , , , marketPlaces] = useOutletContext()

   
     return (
        <div> 
         <main>
              <h1>My Stockroom!</h1>
          </main>
          <HomeCard />
        </div> 
     )

}

export default Home