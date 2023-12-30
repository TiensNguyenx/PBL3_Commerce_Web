import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { Link } from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrNotification, GrLogout } from "react-icons/gr";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai"
import { GrUserAdmin } from "react-icons/gr";
import { BsCartCheck } from "react-icons/bs"
import { BiUserCircle } from "react-icons/bi"
import { BsNewspaper } from "react-icons/bs"
import avatarUser from '../../../../assets/images/avatarUser.jpg'
import ModalConfirmLogout from '../ModalConfirmLogout/ModalConfirmLogout';
import { useContext, useState } from 'react';
import { UserContext } from '~/context/UserContext';
import Search from '../Search';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)
function Header() {
    const { user, lengthCart, getLengthCartContext } = useContext(UserContext);
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        setIsShowModalConfirm(true);
    }
    function handleClose() {
        setIsShowModalConfirm(false);
    }
    getLengthCartContext()
    function navigateChat() {
        if (localStorage.getItem('userId')) {
            navigate(user.isAdmin && user.auth ? '/admin/chat' : '/chat')
        }
        else {
            toast.error('Vui lòng đăng nhập để sử dụng chức năng này')
            navigate('/login')
        }
    }
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div >
                    <Link to={user.isAdmin ? '/admin' : '/'}><img className={cx('logo')} src={require('../../../../assets/images/logoShop.png')} alt=''></img></Link>
                </div>
                <div className={cx('input')} >
                    <div className={cx('btn-list')} ><span style={{ fontSize: '1.5rem' }}>Tất cả danh mục  </span>  <div ><AiOutlineDown /></div></div>
                    <Search />
                </div>
                <div className={cx('list-item')} >
                    {!user.isAdmin && <Link to="/news" className={cx('item')}>
                        <button className={cx('icon')}>  <BsNewspaper /></button>
                        <span className={cx('subtiltle')}>Tin tức</span>

                    </Link>}
                    {user.isAdmin && <Link to="/admin" className={cx('item')} >
                        <button className={cx('icon')}>  <GrUserAdmin /></button>
                        <span className={cx('subtiltle')}>Admin</span>

                    </Link>}
                    <Link to="/cart" className={cx('item')} >
                        <button className={cx('icon')}> <AiOutlineShoppingCart /></button>
                        <span className={cx('subtiltle')}>Giỏ hàng</span>
                        {user && user.auth === true ? (<div className={cx('count-cart')}>{lengthCart}</div>) : ''}

                    </Link>
                    <div onClick={navigateChat} className={cx('item')}>
                        <button className={cx('icon')}>  <BsChatDots /></button>
                        <span className={cx('subtiltle')}>Liên hệ</span>
                    </div>
                    {user && user.auth === true ? (
                        <div className={('item')}  >
                            <div >
                                <div className={cx('whenlogin')}>

                                    {/* <button className={cx('icon')}> <AiOutlineUser  /></button> */}
                                    <div className={cx('avatar-user')}>   <img src={avatarUser} alt='avatar' />   <span className={cx('username')} > {user.name} </span></div>
                                    <div>
                                        <ul className={cx('nav')}>
                                            <Link to='/information'> <li className={cx('subnav')}><button> <span className={cx('icon-subnav')}><BiUserCircle /></span>Thông tin tài khoản</button></li></Link>
                                            <Link to='/cart'>      <li className={cx('subnav')}><button><span className={cx('icon-subnav')}><BsCartCheck /></span>Quản lý giỏ hàng</button></li></Link>
                                            <li className={cx('subnav')}><button><span className={cx('icon-subnav')}><GrNotification /></span>Thông báo</button></li>
                                            <li className={cx('subnav')}><button onClick={handleLogout} > <span className={cx('icon-subnav', 'last-icon')}><GrLogout /></span>Đăng xuất</button></li>
                                        </ul>
                                    </div >
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('containner')} >
                            <Link to='/login'>   <button className={cx('icon')}> <AiOutlineUser /></button></Link>
                            <span className={cx('subtiltle')}>Đăng nhập</span>
                        </div>
                    )}
                </div>
                {/* Logo,search,icon */}
            </div>
            <ModalConfirmLogout
                handleClose={handleClose}
                show={isShowModalConfirm}
            />
        </header>

    );
}

export default Header;