import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Container } from 'react-bootstrap';
import styles from './ModalWatchDetailPaymentAdmin.module.scss';
import classNames from 'classnames/bind';
import { getDetailPayment } from '~/Services/AdminServices'
const cx = classNames.bind(styles)
function ModalWatchDetailPaymentAdmin({ show, handleClose, idOrder }) {
    const [detaiPayment, setDetailPayment] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const renderDetailOrder = async () => {
        const res = await getDetailPayment(idOrder)
        setDetailPayment(res.data.orderItems)
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
                    <Col style={{ fontWeight: '700', marginBottom: '10px' }} >Số lượng Order: {detaiPayment.length}</Col>
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
                    detaiPayment.map((item, index) => {
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

export default ModalWatchDetailPaymentAdmin;