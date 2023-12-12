import Footer from '../../components/footer/footer.jsx'
import Header from '../../components/header/header.jsx'
import { Outlet } from "react-router-dom";

const HomePage = () => {
    
    return ( 
        <>
            <Header/>
                <Outlet/>
            <Footer/>
        </>
     );
}
 
export default HomePage;