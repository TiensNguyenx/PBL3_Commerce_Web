import styles from './HeaderAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link, } from 'react-router-dom';
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
function HeaderAdmin() {
    const [activeLink, setActiveLink] = useState('');
    return (
        <div className={cx('containner')}>
            <div className={cx(activeLink === 'admin' ? 'active' : '')}
                onClick={() => setActiveLink('admin')}>
                <Link to='/admin'>Home Users</Link>
            </div>
            <div className={cx(activeLink === 'createuser' ? 'active' : '')}
                onClick={() => setActiveLink('createuser')}>
                <Link to='/admin/createuser'>Create User</Link>
            </div >
            <div className={cx(activeLink === 'product' ? 'active' : '')}
                onClick={() => setActiveLink('product')}
            >
                <Link to='/admin/product'>Home Products</Link>
            </div>
            <div className={cx(activeLink === 'createproduct' ? 'active' : '')}
                onClick={() => setActiveLink('createproduct')}>
                <Link to='/admin/createproduct'>Create Product</Link>
            </div>
            <div className={cx(activeLink === 'coupons' ? 'active' : '')}
                onClick={() => setActiveLink('coupons')}
            >
                <Link to='/admin/coupons'>Home Coupons</Link>
            </div >
            <div className={cx(activeLink === 'createcoupon' ? 'active' : '')}
                onClick={() => setActiveLink('createcoupon')}
            >
                <Link to='/admin/createcoupons'>Create Coupon</Link>
            </div>
            <div className={cx(activeLink === 'order' ? 'active' : '')}
                onClick={() => setActiveLink('order')}
            >
                <Link to='/admin/order'>Home Orders</Link>
            </div>
            <div className={cx(activeLink === 'payment' ? 'active' : '')}
                onClick={() => setActiveLink('payment')}
            >
                <Link to='/admin/payment'>Home Payments</Link>
            </div>
            <div className={cx(activeLink === 'ordermanagement' ? 'active' : '')}
                onClick={() => setActiveLink('ordermanagement')}
            >
                <Link to='/admin/ordermanagement'>Home Order Management</Link>
            </div>
            <div>
                <Link>Log out</Link>
            </div>
        </div>
    );
}

export default HeaderAdmin;