import styles from './HeaderAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link, } from 'react-router-dom';

const cx = classNames.bind(styles);
function HeaderAdmin() {
    const pathname = window.location.pathname;
    return (
        <div className={cx('containner')}>
            <div className={cx(pathname === '/admin' ? 'active' : '')}
            >
                <Link to='/admin' >Home Admin</Link>
            </div>
            <div className={cx(pathname === '/admin/homeuser' ? 'active' : '')}
            >
                <Link to='/admin/homeuser' >Home Users</Link>
            </div>
            <div className={cx(pathname === '/admin/createuser' ? 'active' : '')}
            >
                <Link to='/admin/createuser'>Create User</Link>
            </div >
            <div className={cx(pathname === '/admin/product' ? 'active' : '')}

            >
                <Link to='/admin/product'>Home Products</Link>
            </div>
            <div className={cx(pathname === '/admin/createproduct' ? 'active' : '')}
            >
                <Link to='/admin/createproduct'>Create Product</Link>
            </div>
            <div className={cx(pathname === '/admin/coupons' ? 'active' : '')}

            >
                <Link to='/admin/coupons'>Home Coupons</Link>
            </div >
            <div className={cx(pathname === '/admin/createcoupons' ? 'active' : '')}

            >
                <Link to='/admin/createcoupons'>Create Coupon</Link>
            </div>
            <div className={cx(pathname === '/admin/order' ? 'active' : '')}

            >
                <Link to='/admin/order'>Home Orders</Link>
            </div>
            <div className={cx(pathname === '/admin/payment' ? 'active' : '')}

            >
                <Link to='/admin/payment'>Home Payments</Link>
            </div>
            <div className={cx(pathname === '/admin/ordermanagement' ? 'active' : '')}

            >
                <Link to='/admin/ordermanagement'>Home Order Management</Link>
            </div>
        </div>
    );
}

export default HeaderAdmin;