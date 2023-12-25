import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './HomeUser.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)
function HomeUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState([])
    useEffect(() => {
        if (!localStorage.getItem('isAdmin')) {
            navigate('/')
        }
    }, [])
    useEffect(() => {
        //callApi 
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
                        <Col>Action</Col>

                    </Row>
                    {user.map((item, index) => {
                        return (
                            <Row>
                                <Col>{item.id}</Col>
                                <Col style={{ textAlign: 'center' }}>{item.email}</Col>
                                <Col>{item.name}</Col>
                                <Col style={{ marginLeft: '30px' }}>{item.phone}</Col>
                                <Col>
                                    <Button variant="primary">Sửa</Button>
                                    <Button variant="danger">Xóa</Button>
                                </Col>
                            </Row>
                        )
                    })}


                </Container>
            </div>
        </div>
    );
}

export default HomeUser;