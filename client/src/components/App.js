import React from "react"
import {Outlet} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

function App() {

  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [marketPlaces, setMarketPlace] = useState([])

  useEffect(() => {
    fetch("/categories")
      .then((r) => r.json())
      .then((data) => setCategories(data))
  }, []);


  useEffect(() => {
    fetch('/items')
      .then((r) => r.json())
      .then((data) => setItems(data))
  }, []);

  useEffect(() => {
    fetch('/marketplaces')
      .then((r) => r.json())
      .then((data) => setMarketPlace(data))
  }, []);
      
function handleAddItem(newItem){
  setItems([...items, newItem])
}

function handleDeleteItem(itemId) {
  setItems(items.filter(item => item.id !== itemId));
}

function handleAddCategory(newCategory) {
  setCategories([...categories, newCategory])
}
  
function handleDeleteCategory(categoryId) {
  setCategories(categories.filter(data => data.id !== categoryId));
}

function handleAddMarketPlace(newMarketPlace) {
  setMarketPlace([...marketPlaces, newMarketPlace])
}
  
function handleDeleteMarketPlace(marketId) {
  setMarketPlace(marketPlaces.filter(data => data.id !== marketId));
}




function handleUpdateItem(updatedItem){
  const updatedItems = items.map((item) => {
    if(item.id === updatedItem.id) {
      return updatedItem;
    } else {
      return item;
    }
  });
  setItems(updatedItems)
}


  return(
    <div>
      <header className="header">
        <NavBar />
      </header> 
      <Outlet context= {[
          categories, 
          items, 
          handleAddItem,
          handleDeleteItem, 
          handleUpdateItem, 
          handleAddCategory, 
          handleDeleteCategory, 
          marketPlaces, 
          handleAddMarketPlace, 
          handleDeleteMarketPlace]} />
    </div>

  )
}

export default App;
