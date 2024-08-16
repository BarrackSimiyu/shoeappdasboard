import { useNavigate } from "react-router-dom";    
const ReactLogout = () => {
    //logout function
    const navigation = useNavigate()
    const logout = () => {
        localStorage.clear(); // Clear localStorage
        navigation("/admin_signin") // Redirect to Signin
    };

    return { logout }; // Export the logout function
}
 
export default ReactLogout;  //Export the component