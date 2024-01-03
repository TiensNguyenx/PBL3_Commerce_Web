import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";
import { useEffect, useContext } from "react";
import { UserContext } from "~/context/UserContext";
import { authorizeAdmin } from '~/Services/AdminServices'
import { useNavigate } from 'react-router-dom';
function HomeAdmin() {
    const { user } = useContext(UserContext)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            authUser()
        }
    }, [user])
    const authUser = async () => {
        if (token) {
            const res = await authorizeAdmin(token)
            console.log(res)
            if (res.data.message === "Unauthorized") {
                alert('Bạn không có quyền truy cập vào trang này')
                navigate('/')
            }

        }
        else {
            alert('Bạn không có quyền truy cập vào trang này')
            navigate('/')
        }


    }
    return (
        <>
            <div style={!user.isAdmin || !user ? { display: 'none' } : { display: 'block' }}>
                <HeaderAdmin />
                Home Admin
            </div>
        </>
    );
}

export default HomeAdmin;