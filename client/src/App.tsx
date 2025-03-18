import { BrowserRouter as Router,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import PostProperty from "./pages/PostProperty"
import Properties from "./pages/Properties"
import PropertyDetails from "./pages/propertyDetails"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {

  return (
    <>
     <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/postproperty" element={<PostProperty/>}/>
        <Route path="/properties" element={<Properties/>}/>
        <Route path="/propertydetails" element={<PropertyDetails/>}/>
      </Routes>
      <Footer/>
     </Router>
    </>
  )
}

export default App
