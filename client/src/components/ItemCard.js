import React from "react"
import { useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"




function ItemCard({item, onDeleteClick, onEditClick, categories, marketPlaces}) {



    const [isEditing, setIsEditing] = useState(false)

    

    function handleDeleteClick() {
          fetch(`/items/${item.id}`, {
            method:'DELETE',
          })
            .then((r) => r.json())
            .then(() => onDeleteClick(item.id))
    }

    const formSchema = yup.object().shape({
                 name: yup
                 .string()
                 .required("Must be valid name")
                 .matches(/^[a-zA-Z0-9\s]*$/, "Name must not contain special characters"),
                 purchase_price: yup.number().required("Must be valid price"),
                 sell_price: yup.number().required("Must be valid sell price")
             })

            
         
    const formik = useFormik({
                initialValues: {
                    name: item.name,
                     purchase_price: item.purchase_price,
                     sell_price: item.sell_price,
                     category_id: item.category_id,
                     market_place_id: item.market_place_id,
                 },
                 validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {
            fetch(`/items/${item.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                })
            .then(r => r.json())
            .then((updatedItem) => onEditClick(updatedItem))
                setIsEditing(false);
                resetForm()
            }
        })


    return(
        <div>
            {isEditing ? (
                <form onSubmit={formik.handleSubmit}>
                    <input 
                        id="name"
                        name="name" 
                        value={formik.values.name} 
                        onChange={formik.handleChange}
                        placeholder="Edit Name"
                    />
                    <input 
                        id="purchase_price"
                        name="purchase_price"
                        value={formik.values.purchase_price}
                        onChange={formik.handleChange}
                        placeholder="Edit Purchase Price"
                    />
                    <input 
                        id="sell_price"
                        name="sell_price"
                        value={formik.values.sell_price}
                        onChange={formik.handleChange}
                        placeholder="Edit Sell Price"
                    />
                    <select 
                        id="category_id"
                        name="category_id"
                        value={formik.values.category_id}
                        onChange={formik.handleChange}
                        placeholder="Edit Category"
                    >
                        <option value="" label="Select category" />
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <select 
                        id="market_place_id"
                        name="market_place_id"
                        value={formik.values.market_place_id}
                        onChange={formik.handleChange}
                        placeholder="Edit Market Place"
                        >
                        <option value="" label="Select marketplace" />
                        {marketPlaces.map((mp) => (
                            <option key={mp.id} value={mp.id}>
                                {mp.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <>
                    <h3>Name:{item.name} </h3>
                    <h4>Price: ${item.purchase_price} Sell price: ${item.sell_price} Selling At: {item.market_place.name} Category: {item.category.name}</h4>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    )

}

export default ItemCard;