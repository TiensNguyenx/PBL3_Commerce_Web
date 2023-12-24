import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";
import { UserContext } from "~/context/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './HomePayment.module.scss';
const cx = classNames.bind(styles)
function HomePayment() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (!localStorage.getItem('isAdmin')) {
            navigate('/')
        }
    }, [])
    return (
        <div>
            <HeaderAdmin />
            <div className={cx('product-containner')}>
                <Container style={{ maxWidth: '100%' }}>
                    <Row>
                        <Col>ID</Col>
                        <Col style={{ textAlign: 'center' }}>Email</Col>
                        <Col>Tên</Col>
                        <Col style={{ marginLeft: '30px' }}>Số điện thoại</Col>
                        <Col>Phương thức giao hàng</Col>
                        <Col>Phương thức thanh toán</Col>
                        <Col>Mã giảm giá</Col>
                        <Col>Phí vận chuyển</Col>
                        <Col>Tổng tiền</Col>
                        <Col>Đã thanh toán</Col>
                        <Col>Actions</Col>
                    </Row>



                </Container>
            </div>
        </div>
    );
}

export default HomePayment;