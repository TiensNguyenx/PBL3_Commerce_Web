import React, { useState } from 'react';
import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";
import Col from 'react-bootstrap/Col';

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import styles from './HomeCoupons.module.scss';
import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { useEffect } from "react";
import { getAllCouponService } from "~/Services/CouponServices";
import { useNavigate } from "react-router-dom";
import { UserContext } from '~/context/UserContext';
import { useContext } from 'react';
const cx = classNames.bind(styles);
function HomeCoupons() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (!user.isAdmin) {
            navigate('/')
        }
    }, [user])
    const [coupons, setCoupons] = useState([]);
    const renderCoupons = async () => {
        const res = await getAllCouponService('ship');
        setCoupons(res.data.data);
    }
    useEffect(() => {
        renderCoupons();
    }, []);
    return (
        <div style={!user.isAdmin ? { display: 'none' } : { display: 'block' }}>
            <HeaderAdmin />
            <div className={cx('product-containner')}>
                <Container style={{ maxWidth: '100%' }}>
                    <Row>
                        <Col className={cx('center-text')}>ID</Col>
                        <Col className={cx('center-text')}>Ảnh</Col>
                        <Col className={cx('center-text')}>Tên</Col>
                        <Col className={cx('center-text')}>Loại mã giảm giá</Col>
                        <Col className={cx('center-text')}>Mô tả</Col>
                        <Col className={cx('center-text')}>Ngày bắt đầu</Col>
                        <Col className={cx('center-text')}>Ngày kết thúc</Col>
                        <Col className={cx('center-text')}>Trị giá</Col>
                        <Col className={cx('center-text')}>Actions</Col>
                    </Row>
                    {coupons.map((item, index) => {
                        return (
                            <Row key={index} style={{ border: '1px solid #ccc' }}>
                                <Col className={cx('center-text')} style={{ width: '100px', fontSize: '1.3rem', margin: 'auto' }} >{item._id}</Col>
                                <Col className={cx('center-text')} ><img alt='' className={cx('img')} src={item.image}></img></Col>
                                <Col className={cx('center-text')}>{item.name}</Col>

                                <Col className={cx('center-text')}>{item.methodDiscount}</Col>
                                <Col className={cx('center-text')}>{item.description}</Col>
                                <Col className={cx('center-text')}>{item.dateStart}</Col>
                                <Col className={cx('center-text')}>{item.dateEnd}</Col>
                                <Col className={cx('center-text')}>{item.value}</Col>
                                <Col style={{ marginTop: '5px' }} >
                                    <Row className={cx('center')}> <Button variant="success" size="lg" style={{ width: '100px', marginBottom: '10px' }}>Sửa</Button>{' '}</Row>
                                    <Row className={cx('center')}><Button variant="danger" size="lg" style={{ width: '100px', marginBottom: '10px' }}>Xóa</Button>{' '}</Row>

                                </Col>

                            </Row>
                        )
                    })}
                </Container>
            </div>
        </div>
    );
}

export default HomeCoupons;