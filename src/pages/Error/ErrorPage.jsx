import React from 'react'
import {Link} from "react-router-dom"
function ErrorPage() {
  return (
    <div>
        <h1>Opps! Page is not found !</h1>

        <button style={{padding :"1rem"}} className="btn">
            <Link style={{color : "white",textDecoration: "none",}} to="/">Back Home</Link>
        </button>
    </div>
  )
}

export default ErrorPage