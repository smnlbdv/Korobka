import Footer from './components/footer/footer.jsx'
import Header from './components/header/header.jsx'
import Home from './pages/home/home.jsx'
import ReadyGifts from './pages/readyGifts/readyGifts';
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <Header/>
      <Routes>
          <Route
            path="/"
            element={
              <Home/>
            }
          ></Route>
          <Route
            path="/ready-gifts"
            element={
              <ReadyGifts/>
            }
          ></Route>
          
        </Routes>
      <Footer/>
     </> 
  )
}

export default App
