import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const CheckSession = () => {
    const navigation = useNavigate()//**
    console.log("Loads")
    //useEffect runs at least  once when page loads   
        const username = localStorage.getItem("username")
        const admin_id = localStorage.getItem("admin_id")
        const access_token = localStorage.getItem("access_token")
        useEffect(() => {
            console.log("useEffect")
            //check if above are empty
          
            if (!username && !admin_id && !access_token) {
                console.log("Works")
                localStorage.clear();
                return navigation("/signin")
            }
        }, [username, admin_id, access_token, navigation]);
    
    //return your var
    return {username, admin_id, access_token}
}
 
export default CheckSession;