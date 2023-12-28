import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Container } from 'react-bootstrap';
import styles from './ModalWatchDetailOrderAdmin.module.scss';
import classNames from 'classnames/bind';
import { getDetailOrder, getDetailOrderUser } from '~/Services/AdminServices'
const cx = classNames.bind(styles)
function ModalWatchDetailOrderAdmin({ show, handleClose, idOrder, idUser }) {
    const [detailOrders, setDetailOrders] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [timePayment, setTimePayment] = useState('')
    const [index, setIndex] = useState(0)
    const renderDetailOrder = async () => {
        if (idOrder) {
            const res = await getDetailOrder(idOrder)
            console.log(res)
            if (res.data) {
                setDetailOrders(res.data.orderItems)
                setTotalPrice(res.data.totalPrice)
                setTimePayment(res.data.createdAt)
            }
        }
        else {
            const res = await getDetailOrderUser(idUser)
            console.log(res)
            if (res.data) {
                setDetailOrders(res.data)

            }
        }

    }
    function formatVietnameseDateTime(dateTimeString) {

        const date = new Date(dateTimeString);
        const formattedDate = new Intl.DateTimeFormat('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            month: 'numeric',
            year: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',

        }).format(date);

        return formattedDate;
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
                    <Col style={{ fontWeight: '700', marginBottom: '10px' }} >Số lượng Order: {detailOrders?.length > 0 ? detailOrders.length : 0}</Col>

                </Row>
                <Row style={detailOrders?.length > 0 ? { display: 'flex' } : { display: 'none ' }}>
                    <Col className={cx('center-text')} style={{ minWidth: '162px' }}>Id SP</Col>
                    <Col className={cx('center-text')}>Ngày Order</Col>
                    <Col className={cx('center-text')}>Ảnh SP</Col>
                    <Col className={cx('center-text')}>Tên SP</Col>
                    <Col className={cx('center-text')}>Số lượng SP</Col>
                    <Col className={cx('center-text')}>Giá cũ</Col>
                    <Col className={cx('center-text')}>Giá mới</Col>
                    <Col className={cx('center-text')}>Tổng tiền</Col>

                </Row>
                {
                    detailOrders?.length > 0 ? (
                        detailOrders.map((item1, index) => {
                            return (

                                idOrder ? (
                                    <Row key={index} style={{ border: '1px solid #ccc' }}>
                                        <Col className={cx('center-text')} style={{ fontSize: '1.1rem' }}>{item1._id}</Col>
                                        <Col className={cx('center-text')}>{formatVietnameseDateTime(timePayment)}</Col>
                                        <Col className={cx('img')}><img src={item1.image} alt=''></img></Col>
                                        <Col className={cx('center-text')}>{item1.name}</Col>
                                        <Col className={cx('center-text')}>{item1.amount}</Col>
                                        <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item1.old_price)}</Col>
                                        <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item1.new_price)}</Col>
                                        <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</Col>

                                    </Row>
                                )
                                    : (

                                        item1.orderItems.map((item, index) => {

                                            return (

                                                <Row key={index} style={{ border: '1px solid #ccc' }}>
                                                    <Col className={cx('center-text')} style={{ fontSize: '1.1rem' }}>{item._id}</Col>
                                                    <Col className={cx('center-text')}>{formatVietnameseDateTime(item1.createdAt)}</Col>
                                                    <Col className={cx('img')}><img src={item.image} alt=''></img></Col>
                                                    <Col className={cx('center-text')}>{item.name}</Col>
                                                    <Col className={cx('center-text')}>{item.amount}</Col>
                                                    <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.old_price)}</Col>
                                                    <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.new_price)}</Col>
                                                    <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item1.totalPrice)}</Col>
                                                </Row>
                                            )

                                        })
                                    )

                            )
                        })
                    )
                        : (
                            <div>Không có sản phẩm nào</div>
                        )
                }

            </Modal.Body>
            <Modal.Footer>

                <Button variant="primary" size='lg' onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal >
    );
}

export default ModalWatchDetailOrderAdmin;