import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './HomeOrder.module.scss';
import { UserContext } from "~/context/UserContext";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles)

function HomeOrder() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (!user.isAdmin('isAdmin')) {
            navigate('/')
        }
    }, [user])
    return (
        <div style={!user.isAdmin('isAdmin') ? { display: 'none' } : { display: 'block' }}>
            <HeaderAdmin />
            <div className={cx('product-containner')}>
                <Container style={{ maxWidth: '100%' }}>
                    <Row>
                        <Col>ID</Col>
                        <Col style={{ textAlign: 'center' }}>Email</Col>
                        <Col>Tên</Col>
                        <Col style={{ marginLeft: '30px' }}>Số điện thoại</Col>
                        <Col>Địa chỉ</Col>
                        <Col>Ghi chú</Col>
                        <Col>Số lượng order</Col>
                        <Col>Phương thức giao hàng</Col>
                        <Col>Tổng tiền</Col>
                        <Col>Actions</Col>
                    </Row>



                </Container>
            </div>
        </div>
    );
}

export default HomeOrder;