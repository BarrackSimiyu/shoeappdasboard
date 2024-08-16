import Sidebar from "./sidebar";
import TopBar from "./TopBar";
// This will render side bar and topbar
const Layout = () => {
    return (  
        <div>
            <Sidebar />
            <TopBar/>
        </div>
    );
}
 
export default Layout;