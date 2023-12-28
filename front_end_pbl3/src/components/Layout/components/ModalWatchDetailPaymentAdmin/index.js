import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Container } from 'react-bootstrap';
import styles from './ModalWatchDetailPaymentAdmin.module.scss';
import classNames from 'classnames/bind';
import { getDetailPayment, getDetailPaymentUser } from '~/Services/AdminServices'
const cx = classNames.bind(styles)
function ModalWatchDetailPaymentAdmin({ show, handleClose, idOrder, idUser }) {
    const [detaiPayment, setDetailPayment] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [timePayment, setTimePayment] = useState('')
    const renderDetailOrder = async () => {
        if (idOrder) {
            const res = await getDetailPayment(idOrder)
            if (res.data) {
                setDetailPayment(res.data.orderItems)
                setTotalPrice(res.data.totalPrice)
                setTimePayment(res.data.createdAt)
                console.log(res)
            }
        }
        else {
            const res = await getDetailPaymentUser(idUser)
            console.log(res)
            if (res.data) {
                console.log(res)
                setDetailPayment(res.data)


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
                <Modal.Title><h3>Thông tin payment</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col style={{ fontWeight: '700', marginBottom: '10px' }} >Số lượng Payment: {detaiPayment?.length ? detaiPayment.length : 0}</Col>
                </Row>
                <Row style={detaiPayment?.length > 0 ? { display: 'flex' } : { display: 'none' }}>
                    <Col className={cx('center-text')} style={{ minWidth: '160px' }}>Id SP</Col>
                    {idOrder && <Col className={cx('center-text')} >Ngày thanh toán</Col>}
                    <Col className={cx('center-text')} style={{ minWidth: '135px' }}>Ảnh SP</Col>
                    <Col className={cx('center-text')} style={{ minWidth: '200px' }}>Tên SP</Col>
                    <Col className={cx('center-text')}>Số lượng</Col>
                    <Col className={cx('center-text')}>Giá </Col>
                    {idOrder && <Col className={cx('center-text')}>Giá cũ</Col>}
                    {idUser && <Col className={cx('center-text')}>Đã thanh toán</Col>}
                    {idUser && <Col className={cx('center-text')}>Ngày thanh toán</Col>}
                    {idUser && <Col className={cx('center-text')}>Hình thức thanh toán</Col>}
                    {idUser && <Col className={cx('center-text')}>Hình thức nhận hàng</Col>}
                    <Col className={cx('center-text')}>Tổng tiền</Col>

                </Row>
                {detaiPayment?.length > 0 ?
                    (

                        detaiPayment.map((item1, index) => {
                            return (
                                idOrder ? (
                                    <Row key={index} style={{ border: '1px solid #ccc' }}>
                                        <Col className={cx('center-text')} style={{ fontSize: '1rem', minWidth: '160px' }}>{item1._id}</Col>
                                        <Col className={cx('center-text')}>{formatVietnameseDateTime(timePayment)}</Col>
                                        <Col className={cx('img')}><img src={item1.image} alt=''></img></Col>
                                        <Col className={cx('center-text')} >{item1.name}</Col>
                                        <Col className={cx('center-text')}>{item1.amount}</Col>
                                        <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item1.new_price)}</Col>
                                        <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item1.old_price)}</Col>
                                        <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</Col>
                                    </Row>
                                )
                                    : (
                                        item1.orderItems.map((item, index) => {
                                            return (
                                                <Row key={index} style={{ border: '1px solid #ccc' }}>
                                                    <Col className={cx('center-text')} style={{ fontSize: '1.1rem' }}>{item._id}</Col>
                                                    <Col className={cx('img')}><img src={item.image} alt=''></img></Col>
                                                    <Col className={cx('center-text')} style={{ minWidth: '200px' }}>{item.name}</Col>
                                                    <Col className={cx('center-text')}>{item.amount}</Col>
                                                    <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.new_price)}</Col>
                                                    <Col className={cx('center-text')}>{item1.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</Col>
                                                    <Col className={cx('center-text')}>{formatVietnameseDateTime(item1.createdAt)}</Col>
                                                    <Col className={cx('center-text')}>{item1.paymentMethod}</Col>
                                                    <Col className={cx('center-text')}>{item1.shippingMethod}</Col>
                                                    <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item1.totalPrice)}</Col>
                                                </Row>
                                            )
                                        })
                                    )

                            )
                        })
                    ) : (
                        <div>   Không có sản phẩm nào</div>
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

export default ModalWatchDetailPaymentAdmin;