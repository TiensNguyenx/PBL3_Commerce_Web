import classNames from "classnames/bind";
import styles from "./Chat.module.scss";
import { useState, useEffect, useRef } from 'react';

import { AiOutlinePicture } from "react-icons/ai";
import { IoMdVideocam } from "react-icons/io";
import { FaSearch, FaPhoneAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineAddReaction } from "react-icons/md";
import { CiMicrophoneOn } from "react-icons/ci";
import { FaLocationArrow } from "react-icons/fa6";
import Footer from "~/components/Layout/components/Footer";
import logoShop from "../../assets/images/logoShop.png";
import { toast } from 'react-toastify';
import avatarUser from '../../assets/images/avatarUser.jpg'
import socket from "../socket";
import sideBarleft from '../../assets/images/sideBar1.gif'
import sideBarRight from '../../assets/images/sideBar2.gif'
import soundMess from '../../assets/sounds/mess.mp3'
import OnlineIcon from '../../assets/images/OnlineIcon.png'
import OfflineIcon from '../../assets/images/offlineIcon.png'
const cx = classNames.bind(styles);

function Chat() {
    const [adminStatus, setAdminStatus] = useState({ isAdminOnline: false, lastDisconnect: null });
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([])
    const [activeUsers, setActiveUsers] = useState([]);
    const [messages, setMessages] = useState({})
    const userId = localStorage.getItem('userId')
    const chatWrapperRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchMessages(userId)
    }, [])

    useEffect(() => {

        socket?.emit('checkAdminStatus');
        socket?.on('adminStatus', status => {
            setAdminStatus({
                isAdminOnline: status.isAdminOnline,
                lastDisconnect: status.lastDisconnect ? new Date(status.lastDisconnect) : null
            });
        });
        socket?.on('getUsers', (users) => {
            socket?.emit('checkAdminStatus');
            socket?.on('adminStatus', status => {
                setAdminStatus({
                    isAdminOnline: status.isAdminOnline,
                    lastDisconnect: status.lastDisconnect ? new Date(status.lastDisconnect) : null
                });
            });
        });

        //const checkActive = localStorage.getItem('userId')
        //socket?.emit('addUser', checkActive);
        socket?.on('getMessage', (user) => {
            fetchMessages(user)
            toast.success(`Shop đã gửi tin nhắn cho bạn`);
            const sound = new Audio(soundMess)
            sound.play()
        })

        return () => {
            socket?.off('adminStatus');
            socket?.off('getUsers');
            socket?.off('getMessage');
        };
    }, [socket])
    const getAdminOfflineDuration = () => {
        if (!adminStatus.lastDisconnect) return '';

        const now = new Date();
        const diff = now.getTime() - adminStatus.lastDisconnect.getTime();
        const minutes = Math.floor(diff / 60000);
        const seconds = ((diff % 60000) / 1000).toFixed(0);
        return `${minutes} phút, ${seconds} giây`;
    };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
    }, [messages]);

    const fetchMessages = async (user) => {
        const res = await fetch(`https://be-pbl3.onrender.com/api/conversation/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const resData = await res.json()
        setMessages({ resData, userId: user.userId })
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }
    const handleTypeMessage = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage = async () => {
        const res = await fetch(`https://be-pbl3.onrender.com/api/conversation/send-message/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
        });
        socket?.emit('sendMessageToAdmin', userId);
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
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('containener')}>
                    <div className={cx('sidebar-left')}>

                        <img className={cx('img-sidebar')} src={sideBarleft} alt=""></img>
                    </div>
                    <div className={cx('chat-space')}>
                        <div className={cx('option')}>
                            <div className={cx('user-containner')}>
                                <img className={cx('user-img')} src={logoShop} alt=""></img>
                                <div className={cx('user-info')}>
                                    <div className={cx('user-name')}>TB Technology</div>
                                    <div className={cx('user-status')}> {adminStatus.isAdminOnline
                                        ? 'Online'
                                        : `Offline ${getAdminOfflineDuration()}`}
                                        <img className={cx('online-icon')} src={adminStatus.isAdminOnline ? OnlineIcon : OfflineIcon} alt=""></img>
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
                            <input onChange={handleTypeMessage} value={message} onKeyDown={handleKeyDown} />
                            <button><CiMicrophoneOn style={{ fontSize: '2rem' }} /></button>
                            <button onClick={sendMessage}><FaLocationArrow style={{ fontSize: '2.2rem' }} /></button>
                        </div>

                    </div>
                    <div className={cx('sidebar-right')}>
                        <img className={cx('img-sidebar')} src={sideBarRight} alt=""></img>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Chat;