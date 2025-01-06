import React from "react"
import { useFormik } from "formik";
import * as yup from "yup"



function NewItem({handleAddItem, categories, marketPlaces}) {


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
                 name: "",
                 purchase_price: 0,
                 sell_price: 0,
                 category_id: "",
                 market_place_id: "",
             },
             validationSchema: formSchema,
         onSubmit: (values,{resetForm}) => {
            fetch('/items', {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
            })
            .then((r) => r.json())
            .then((data) => handleAddItem(data))
                resetForm()
           }
         })

     
    return(
        <form className="input"  onSubmit={formik.handleSubmit}>
            <label htmlFor="imageInput">Name</label>
            <input
                id="name"
                name = "name"
                onChange={formik.handleChange} 
                value={formik.values.name}
            />
            <label htmlFor="purchase price">Purchase Price:</label>
            <input 
                id="purchase_price"
                name="purchase_price" 
                onChange={formik.handleChange} 
                value={formik.values.purchase_price}
            />
            <label htmlFor="sell price">Sell Price:</label>
            <input 
                id="sell_price"
                name="sell_price" 
                onChange={formik.handleChange} 
                value={formik.values.sell_price}
            />
            <select 
                id="category_id"
                name="category_id"
                onChange={formik.handleChange} 
                value={formik.values.category_id} 
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
                onChange={formik.handleChange} 
                value={formik.values.market_place_id} 
            >
                <option value="" label="Select marketplace" />
                {marketPlaces.map((mp) => (
                    <option key={mp.id} value={mp.id}>
                        {mp.name}
                    </option>
                ))}
            </select>
            <button type='submit'>Submit</button>
        </form>
    )
}


export default NewItem