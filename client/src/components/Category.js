import React from "react"
import { useFormik } from "formik"
import * as yup from "yup";
import { useOutletContext } from "react-router-dom"


function Category() {

    const [categories, , , , ,handleAddCategory, handleDeleteCategory, , , , ] = useOutletContext()
    
    console.log(categories)

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
    onSubmit: (values, {resetForm}) =>  {
            fetch('/categories', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
             })
            .then((r) => r.json())
            .then((data) => handleAddCategory(data))
                resetForm()
          }
        })
        
    
    
    return (
        <div> 
         <main>
          <h1>Categories</h1>
          <form onSubmit={formik.handleSubmit}>
            <input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
            />
             <p style={{ color: "red" }}> {formik.errors.name}</p>
            <button type='submit'>Add Category</button>
          </form>
           {categories.map((cat) => (
            <div key={cat.id}>
               <h4>{cat.name}</h4>
            </div>
            ))}
         </main>

        </div> 
     )
}

export default Category 