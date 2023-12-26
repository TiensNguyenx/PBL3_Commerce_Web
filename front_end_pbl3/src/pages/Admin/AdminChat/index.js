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
const cx = classNames.bind(styles);

function AdminChat() {
    const [socket, setSocket] = useState(null)
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([])
    const [activeUsers, setActiveUsers] = useState([]);
    const [messages, setMessages] = useState({})
    const userId = localStorage.getItem('userId')
    const [receive, setIdReceive] = useState([])
    const chatWrapperRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userName, setUserName] = useState('');
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        setSocket(io("http://localhost:8080"));
    }, []);
    useEffect(() => {
        if (!user.isAdmin) {
            navigate('/')
        }
    }, [user])
    useEffect(() => {
        const checkActive = localStorage.getItem('userId')
        socket?.emit('addUser', checkActive);
        socket?.on('getUsers', (users) => {
            users = users.filter(user => user.nameUser !== 'admin');
            setActiveUsers(users);
            setUsers(users);
        });
        socket?.on('getMessageToAdmin', (user) => {
            fetchMessages(user)
            toast.success(`${user.nameUser} đã gửi tin nhắn cho bạn`);
        })
    }, [socket])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
    }, [messages]);

    const fetchMessages = async (user) => {
        setSelectedUser(user);
        setUserName(user?.nameUser);
        setIdReceive({
            idReceive: user.userId,
            idSocket: user.socketId
        })
        const res = await fetch(`http://localhost:3002/api/conversation/${user.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const resData = await res.json()
        setMessages({ resData, userId: user.userId })
    }

    const handleTypeMessage = (e) => {
        setMessage(e.target.value);
    }
    const sendMessage = async () => {
        const res = await fetch(`http://localhost:3002/admin/conversation/send-message/${receive.idReceive}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
        });
        socket?.emit('sendMessage', receive.idSocket);
        const resData = await res.json()
        setMessages({ resData, userId: userId })
        setMessage('');
    }
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
        <div style={!user.isAdmin ? { display: 'none' } : { display: 'block' }}>
            <div className={cx('wrapper')}>
                <div className={cx('containener')}>
                    <div className={cx('sidebar')}>
                        <div className={cx('sidebar-header')}>
                            Chats
                        </div>
                        <div className={cx('sidebar-search')}>
                            <input type="text" placeholder="Search contact / chat" />
                        </div>
                        <div>
                            <div className='text-primary text-lg'>People</div>
                            <div>
                                {activeUsers.length > 0 ? (
                                    activeUsers.map((user) => (
                                        <div
                                            key={user.userId}
                                            className={cx('user-chat', {
                                                'user-selected': selectedUser?.userId === user.userId,
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
                                                    <div className={cx('user-name')}>{user?.nameUser}</div>
                                                    <div className={cx('user-mess')}>{user?.emailUser}</div>
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
                    <div className={cx('chat-space')}>
                        <div className={cx('option')}>
                            <div className={cx('user-containner')}>
                                {userName ? (<img className={cx('user-img')} src={avatarUser} alt=""></img>) : ''}
                                <div className={cx('user-info')}>
                                    <div className={cx('user-name')}> {userName}</div>
                                    <div className={cx('user-status')}>{userName ? 'Active' : ''}</div>
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