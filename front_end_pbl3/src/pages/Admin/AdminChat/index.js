import classNames from "classnames/bind";
import styles from "./AdminChat.module.scss";
import { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from "~/context/UserContext";
import { AiOutlinePicture } from "react-icons/ai";
import { IoMdVideocam } from "react-icons/io";
import { FaSearch, FaPhoneAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineAddReaction } from "react-icons/md";
import { CiMicrophoneOn } from "react-icons/ci";
import { FaLocationArrow } from "react-icons/fa6";
import Footer from "~/components/Layout/components/Footer";
import logoShop from "../../../assets/images/logoShop.png";
import { toast } from 'react-toastify';
import avatarUser from '../../../assets/images/avatarUser.jpg'
import { io } from 'socket.io-client';
import { useNavigate } from "react-router-dom";
import OnlineIcon from '../../../assets/images/OnlineIcon.png'
import OfflineIcon from '../../../assets/images/offlineIcon.png'
const cx = classNames.bind(styles);

function AdminChat() {
    const [socket, setSocket] = useState(null)
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([])
    const [activeUsers, setActiveUsers] = useState([]);
    const [messages, setMessages] = useState({})
    const userId = localStorage.getItem('userId')
    const [idreceive, setIdReceive] = useState([])
    const [idsocket, setIdSocket] = useState([null])
    const chatWrapperRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userName, setUserName] = useState('');
    const { user } = useContext(UserContext);
    const [allPeople, setAllPeople] = useState([])
    const [userStatus, setUserStatus] = useState({ isUserOnline: false, lastDisconnect: null });
    const navigate = useNavigate();
    useEffect(() => {
        setSocket(io("http://localhost:3002"));
        getAllPeople();
    }, []);
    useEffect(() => {
        if (user.isAdmin === false) {
            navigate('/')
        }
    }, [user])
    useEffect(() => {
        // const checkActive = localStorage.getItem('userId')
        // socket?.emit('addUser', checkActive);
        socket?.on('userStatus', status => {
            setUserStatus({
                isUserOnline: status.isUserOnline,
                lastDisconnect: status.lastDisconnect ? new Date(status.lastDisconnect) : null
            });
        });
        socket?.on('getUsers', (users) => {
            users = users.filter(user => user.nameUser !== 'admin');
            const idSelect = localStorage.getItem('idSelect')
            socket?.emit('checkUserStatus', (idSelect));
            socket?.on('userStatus', status => {
                setUserStatus({
                    isUserOnline: status.isUserOnline,
                    lastDisconnect: status.lastDisconnect ? new Date(status.lastDisconnect) : null
                });
            });
            setActiveUsers(users);
        });
        socket?.on('getMessageToAdmin', (user) => {
            getAllPeople();
            const tempUser = {
                user: user.userId,
                name: user.nameUser,
                socketId: user.socketId,
                email: user.emailUser
            }
            fetchMessages(tempUser)
        })

    }, [socket])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
    }, [messages]);

    const getAllPeople = async () => {
        const res = await fetch(`http://localhost:3002/admin/conversation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const resData = await res.json()
        setAllPeople(resData)
    }


    const fetchMessages = async (user) => {
        socket?.on('getUsers', (users) => {
            users = users.filter(user => user.nameUser !== 'admin');
            setActiveUsers(users);
        });
        const selectUser = activeUsers.find(u => u.userId === user.user);
        setSelectedUser(user);
        setUserName(user?.name);
        setIdReceive(user.user)
        localStorage.setItem('idSelect', user.user)
        socket?.emit('checkUserStatus', (user.user));
        if (selectUser) {
            setIdSocket(selectUser.socketId)
        } else {
            setIdSocket(null)
        }
        const res = await fetch(`http://localhost:3002/api/conversation/${user.user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const resData = await res.json()
        setMessages({ resData, userId: user.user })
    }

    const handleTypeMessage = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage = async () => {
        const res = await fetch(`http://localhost:3002/admin/conversation/send-message/${idreceive}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
        });
        if (idsocket) {
            socket?.emit('sendMessage', idsocket);
        }
        const resData = await res.json()
        setMessages({ resData, userId: userId })
        setMessage('');
    }

    const getUserOfflineDuration = () => {
        if (!userStatus.lastDisconnect) return '';

        const now = new Date();
        const diff = now.getTime() - userStatus.lastDisconnect.getTime();
        const minutes = Math.floor(diff / 60000);
        const seconds = ((diff % 60000) / 1000).toFixed(0);
        return `${minutes} phút, ${seconds} giây`;
    };

    function formatTimeAgo(timeSent) {
        var now = new Date();
        timeSent = new Date(timeSent);
        var timeDifference = now - timeSent;
        var minutesAgo = Math.floor(timeDifference / (1000 * 60));
        var hoursAgo = Math.floor(minutesAgo / 60);
        var daysAgo = Math.floor(hoursAgo / 24);
        if (minutesAgo < 1) {
            return "Vừa gửi";
        } else if (minutesAgo < 60) {
            return "Đã gửi từ " + minutesAgo + " phút trước";
        } else if (hoursAgo < 24) {
            return "Đã gửi từ " + hoursAgo + " giờ trước";
        } else {
            return "Đã gửi từ " + daysAgo + " ngày trước";
        }
    }
    return (
        <div style={user.isAdmin === false ? { display: 'none' } : { display: 'block' }}>
            <div className={cx('wrapper')}>
                <div className={cx('containner')}>
                    <div className={cx('sidebar')}>
                        <div className={cx('sidebar-header')}>
                            Chats
                        </div>
                        <div className={cx('sidebar-search')}>
                            <input type="text" placeholder="Search contact / chat" />
                        </div>
                        <div>
                            <div className='text-primary text-lg mt-4 ' style={{ fontWeight: '700' }}>People</div>
                            <div>
                                {allPeople.length > 0 ? (
                                    allPeople.map((user) => (
                                        <div
                                            key={user.user}
                                            className={cx('user-chat', {
                                                'user-selected': selectedUser?.user === user.user,
                                            })}
                                            onClick={() => fetchMessages(user)}
                                        >
                                            <div className={cx('user-containner')}>
                                                <img
                                                    className={cx('user-img')}
                                                    src={avatarUser}
                                                    alt=""
                                                />
                                                <div className={cx('user-info')}>
                                                    <div className={cx('user-name')}>{user?.name}</div>
                                                    <div className={cx('user-mess')}>{user?.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='text-center text-lg font-semibold mt-24'>No Conversations</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cx('chat-space')} style={selectedUser ? { display: 'block' } : { display: 'none' }}>
                        <div className={cx('option')}>
                            <div className={cx('user-containner')}>
                                {userName ? (<img className={cx('user-img')} src={avatarUser} alt=""></img>) : ''}
                                <div className={cx('user-info')}>
                                    <div className={cx('user-name')}> {userName}</div>

                                    <div className={cx('user-status')}> {userStatus.isUserOnline
                                        ? 'Online'
                                        : `Offline ${getUserOfflineDuration()}`}
                                        <img className={cx('online-icon')} src={userStatus.isUserOnline ? OnlineIcon : OfflineIcon} alt=""></img>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('user-option')}>
                                <button><FaPhoneAlt style={{ width: '20px', height: '20px' }} /></button>
                                <button><IoMdVideocam style={{ width: '20px', height: '20px' }} /></button>
                                <button><FaSearch style={{ width: '20px', height: '20px' }} /></button>
                            </div>
                        </div>
                        <div className={cx('chat-wrapper')} ref={chatWrapperRef}>
                            <div className={cx('history')}>
                                {messages.resData?.message?.map((msg) => (
                                    <div key={msg._id} className={cx('message', { 'message-admin': msg.fullName === 'admin', 'message-user': msg.fullName !== 'admin' })}>
                                        <div className={cx('message-wrapper', msg.fullName === 'admin' ? 'admin-wrapper' : 'user-wrapper')}>
                                            <div className={cx(msg.fullName === 'admin' ? 'avatar-admin' : 'avatar-user', 'col-left')}><img src={msg.fullName === 'admin' ? logoShop : avatarUser} alt=""></img></div>
                                            <div className={cx('col-right')}>
                                                <div className={cx('message-sender')}>{msg.fullName}</div>
                                                <div className={cx('message-content')}>{msg.content}</div>
                                                <div className={cx('message-timestamp')}>{formatTimeAgo(msg.timestamps)}</div>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                        <div className={cx('input-wrapper')}>
                            <button> <IoMdAdd style={{ fontSize: '2rem' }} /></button>
                            <button> <AiOutlinePicture style={{ fontSize: '2rem' }} /></button>
                            <button> <MdOutlineAddReaction style={{ fontSize: '2rem' }} /></button>
                            <input onChange={handleTypeMessage} value={message} />
                            <button><CiMicrophoneOn style={{ fontSize: '2rem' }} /></button>
                            <button onClick={sendMessage}><FaLocationArrow style={{ fontSize: '2.2rem' }} /></button>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );

}

export default AdminChat;