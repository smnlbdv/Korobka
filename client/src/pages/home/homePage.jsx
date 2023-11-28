import Footer from '../../components/footer/footer.jsx'
import Header from '../../components/header/header.jsx'
import Main from '../main/main.jsx'
import ReadyGifts from '../readyGifts/readyGifts.jsx';
import { Route, Routes } from "react-router-dom";

const HomePage = () => {
    return ( 
        <>
            <Header/>
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="ready-gifts" element={<ReadyGifts/>} />
                </Routes>
            <Footer/>
        </>
     );
}
 
export default HomePage;