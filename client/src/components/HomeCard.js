import React from "react"
import { useState, useEffect } from "react"
import { Outlet, useOutletContext } from "react-router-dom"


function HomeCard() {

     const [categories, items, , , , , , marketPlaces] = useOutletContext()

     const [selectedCategory, setSelectedCategory] = useState("All");
     const [selectedMarketPlace, setSelectedMarketPlace] = useState("All");
     const [displayCatItems, setDisplayCatItems] = useState()
     const [displayMPItems, setDisplayMPItems] = useState([])

     useEffect(() => {
          setDisplayCatItems(items)
          setDisplayMPItems(items)
     }, [items])

     const onCategoryChange =  (event) => {
       const newCategory = event.target.value;
       setSelectedCategory(newCategory)
       if (newCategory === "All") {
          setDisplayCatItems(items)
       } else {
            const category = categories.find((c) => c.id === parseInt(newCategory))
            setDisplayCatItems(category.items)
       }
     
     };

     const onMarketplaceChange = (event) => {
          const newMarketPlace = event.target.value;
          setSelectedMarketPlace(newMarketPlace);
          if (newMarketPlace === "All") {
               setDisplayMPItems(items)
          } else {
              const marketPlace = marketPlaces.find((mp) => mp.id === parseInt(newMarketPlace));
              setDisplayMPItems(marketPlace.items); 
          }
          
     };

    return (
        <div> 
         <main>
               <h1>My StockRoom!</h1>
              <div>
                    <label htmlFor="category">Filter by Category:</label>
                    <select id="category" value={selectedCategory} onChange={onCategoryChange}>
                         <option value="All">All</option>
                         {categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                   {cat.name}
                              </option>
                         ))}
                    </select>
              </div>
              <ul>
                    {displayCatItems?.map((item) => (
                         <li key={item.id}>
                              <h4>{item.name}</h4>
                         </li>
                    ))}
              </ul>
              <div>
                    <label htmlFor="marketplace">Filter by Marketplace:</label>
                    <select id="marketplace" value={selectedMarketPlace} onChange={onMarketplaceChange}>
                         <option value="All">All</option>
                         {marketPlaces.map((market) => (
                              <option key={market.id} value={market.id}>
                                   {market.name}
                              </option>
                         ))}
                    </select>
              </div>
              <ul>
                    {displayMPItems?.map((item) => (
                         <li key={item.id}>
                              <h4>{item.name}</h4>
                         </li>
                    ))}
              </ul>
         </main>
        </div> 
     )

}

export default HomeCard