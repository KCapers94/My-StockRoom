import React from "react"
import { useOutletContext } from "react-router-dom"
import { useFormik } from "formik"
import * as yup from "yup";


function MarketPlace() {

    const [categories, , , , , , , marketPlaces, handleAddMarketPlace, handleDeleteMarketPlace] = useOutletContext()

    const formSchema = yup.object().shape({
        name: yup
        .string()
        .required("Must be valid name")
        .matches(/^[a-zA-Z0-9\s]*$/, "Name must not contain special characters"),
    })

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: formSchema,
    onSubmit: (values, {resetForm}) => {
        fetch('/marketplaces', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
         })
        .then((r) => r.json())
        .then((data) => handleAddMarketPlace(data))
            resetForm()
      }
    })

    
    return (
        <div> 
         <main>
          <h1>Market Places</h1>
          <form onSubmit={formik.handleSubmit}>
            <input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
            />
             <p style={{ color: "red" }}> {formik.errors.name}</p>
            <button type='submit'>Add Market Place</button>
          </form>
           {marketPlaces.map((item) => (
            <div key={item.id}>
               <h4>{item.name}</h4>
            </div>
            ))}
         </main>

        </div> 
     )
}

export default MarketPlace