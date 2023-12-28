import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Container } from 'react-bootstrap';
import styles from './ModalWatchDetailOrderAdmin.module.scss';
import classNames from 'classnames/bind';
import { getDetailOrder } from '~/Services/AdminServices'
const cx = classNames.bind(styles)
function ModalWatchDetailOrderAdmin({ show, handleClose, idOrder }) {
    const [detailOrders, setDetailOrders] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const renderDetailOrder = async () => {
        const res = await getDetailOrder(idOrder)
        setDetailOrders(res.data.orderItems)
        setTotalPrice(res.data.totalPrice)
    }
    useEffect(() => {
        if (show) {
            renderDetailOrder()
        }
    }, [show])
    return (
        <Modal show={show} onHide={handleClose}
            centered size='xl'>
            <Modal.Header closeButton>
                <Modal.Title><h3>Thông tin order</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col style={{ fontWeight: '700', marginBottom: '10px' }} >Số lượng Order: {detailOrders.length}</Col>
                </Row>
                <Row>
                    <Col className={cx('center-text')}>Id SP</Col>
                    <Col className={cx('center-text')}>Ảnh SP</Col>
                    <Col className={cx('center-text')}>Tên SP</Col>
                    <Col className={cx('center-text')}>Số lượng SP</Col>
                    <Col className={cx('center-text')}>Giá cũ</Col>

                    <Col className={cx('center-text')}>Giá mới</Col>

                    <Col className={cx('center-text')}>Tổng tiền</Col>

                </Row>
                {
                    detailOrders.map((item, index) => {
                        return (

                            <Row key={index} style={{ border: '1px solid #ccc' }}>
                                <Col className={cx('center-text')} style={{ fontSize: '1.1rem' }}>{item._id}</Col>
                                <Col className={cx('img')}><img src={item.image} alt=''></img></Col>
                                <Col className={cx('center-text')}>{item.name}</Col>
                                <Col className={cx('center-text')}>{item.amount}</Col>
                                <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.old_price)}</Col>

                                <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.new_price)}</Col>

                                <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</Col>
                            </Row>
                        )
                    })
                }

            </Modal.Body>
            <Modal.Footer>

                <Button variant="primary" size='lg' onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalWatchDetailOrderAdmin;