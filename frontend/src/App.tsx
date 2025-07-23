import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/App.css"
import router from "./router";


function App() {
 return <>
 <RouterProvider router={router}/>
       <ToastContainer />

 </>
}

export default App
