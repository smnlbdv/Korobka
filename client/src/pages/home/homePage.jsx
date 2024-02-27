import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Footer from '../../components/footer/footer.jsx'
import Header from '../../components/header/header.jsx'
import Loading from "../../components/loading/loading.jsx";

const HomePage = () => {
    
    return ( 
        <>
            <Header/>
                <Suspense fallback={<Loading />}>
                    <Outlet/>
                </Suspense>
            <Footer/>
        </>
     );
}
 
export default HomePage;