import React from "react"
import { useOutletContext } from "react-router-dom"
import ItemCard from "./ItemCard"
import NewItem from "./NewItem"



function Item() {

     const [categories, items, handleAddItem ,handleDeleteItem, handleUpdateItem, , ,marketPlaces] = useOutletContext()
    
     
     return (
        <div>
         <main>
              <h1>Inventory</h1>
               <NewItem handleAddItem={handleAddItem} categories={categories} marketPlaces={marketPlaces}/>
               {items.map(item => (
                    <ItemCard key={item.id} item={item} onDeleteClick={handleDeleteItem} onEditClick={handleUpdateItem} categories={categories} marketPlaces={marketPlaces} />
               ))}
         </main>
        </div> 
     )

}

export default Item