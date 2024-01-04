import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "~/context/UserContext";
import { authorizeAdmin } from '~/Services/AdminServices'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import socket from "~/pages/socket";

function HomeAdmin() {
    const { user } = useContext(UserContext)
    const token = localStorage.getItem('token')
    const [notifications, setNotifications] = useState([]);
    const [messageShown, setMessageShown] = useState(false);
    const { logout } = useContext(UserContext);
    const navigate = useNavigate()
    useEffect(() => {
        const checkActive = localStorage.getItem('userId');
        const checkAdmin = localStorage.getItem('isAdmin');
        if (checkActive) {
            socket?.emit('addUser', checkActive);
            socket?.on('checkUserLogin', (msg) => {
                alert(msg);
                logout();
                navigate('/');
                window.location.reload();
            });
            socket?.on('chatStarted', (msg) => {
                toast.success(msg);
            });
            if (!messageShown) {
                socket?.on('getMessage', (user) => {
                    toast.success(`Shop đã gửi tin nhắn cho bạn`);
                });
            }
            socket?.on('getMessageToAdmin', (user) => {
                if (checkAdmin === 'true') {
                    toast.success(`${user.nameUser} đã gửi tin nhắn cho bạn`);
                    postNotification(`${user.nameUser} đã gửi tin nhắn cho bạn`);
                    getNotification()
                }
            });
            socket?.on('userPayment', (msg) => {
                if (checkAdmin === 'true') {
                    toast.success(msg);
                    postNotification(msg);
                    getNotification()
                }
            });
        }
        if (user) {
            authUser()
            getNotification()
        }
        return () => {
            socket?.off('chatStarted');
            socket?.off('getMessage');
            socket?.off('getMessageToAdmin');
            socket?.off('userPayment');
        };
    }, [user, socket, messageShown])
    const postNotification = async (content) => {
        try {
            await fetch('https://be-pbl3.onrender.com/admin/post-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });
        } catch (error) {
            console.error('Error while fetching notifications:', error);
        }
    };
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
    const getNotification = async () => {
        try {
            const res = await fetch('https://be-pbl3.onrender.com/admin/get-notification', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            setNotifications(data.notifications); // Assuming data is an array of notifications
            console.log(data);
        } catch (error) {
            console.error("Error while fetching notifications:", error);
        }
    };
    const notificationContainerStyle = {
        maxHeight: '300px',
        overflowY: 'auto',
        border: '1px solid #ddd',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '10px',
    };

    const notificationListStyle = {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    };

    const notificationItemStyle = {
        borderBottom: '1px solid #ddd',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const notificationContentStyle = {
        flex: '1',
        marginRight: '10px',
    };

    const notificationDateStyle = {
        color: '#888',
    };
    return (
        <>
            <div style={!user.isAdmin || !user ? { display: 'none' } : { display: 'block' }}>
                <HeaderAdmin />
                <div>
                    <h2 style={{ color: '#1877f2' }}>Notifications</h2>
                    <div style={notificationContainerStyle}>
                        <ul style={notificationListStyle}>
                            {notifications.map((notification) => (
                                <li key={notification._id} style={notificationItemStyle}>
                                    <span style={notificationContentStyle}>{notification.content}</span>
                                    <span style={notificationDateStyle}>
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );


}

export default HomeAdmin;