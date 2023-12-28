import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";
import { UserContext } from "~/context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './HomePayment.module.scss';
import { getAllPayment } from "~/Services/AdminServices";
import { Form } from 'react-bootstrap';
import { sortPayment } from "~/Services/AdminServices";
import ModalWatchDetailPaymentAdmin from "~/components/Layout/components/ModalWatchDetailPaymentAdmin";
const cx = classNames.bind(styles)
function HomePayment() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [listPayment, setListPayment] = useState([])
    const [sortBy, setSortBy] = useState('totalPrice')
    const [sortType, setSortType] = useState('asc')
    const [isShowModal, setIsShowModal] = useState(false)
    const [idPayment, setIdPayment] = useState('')
    useEffect(() => {
        if (user.isAdmin === false) {
            navigate('/')
        }
    }, [user])
    const renderPayment = async () => {

        const res = await getAllPayment()
        console.log(res)
        setListPayment(res.data)
    }
    useEffect(() => {
        renderPayment()
    }, [])
    const handleChange = (e) => {
        if (e.target.value === 'Tổng tiền tăng dần') {
            setSortBy('totalPrice')
            setSortType('asc')
        }
        else if (e.target.value === 'Tổng tiền giảm dần') {
            setSortBy('totalPrice')
            setSortType('desc')
        }
        else if (e.target.value === 'Thanh toán khi nhận hàng') {
            setSortBy('thanh toan khi nhan hang')

        }
        else {
            setSortBy('thanh toan bang paypal')

        }
    }
    const handleSortPayment = async () => {
        const res = await sortPayment(sortBy, sortType)
        setListPayment(res.data)
    }
    const handleGetDetail = (id) => {
        setIsShowModal(true)
        setIdPayment(id)
    }
    const handClose = () => {
        setIsShowModal(false)
    }
    return (
        <div style={user.isAdmin === false ? { display: 'none' } : { display: 'block' }}>
            <HeaderAdmin />
            <div className={cx('product-containner')}>
                <Form className={cx('form-containner')}>
                    <Form.Group as={Row} className="mb-3 "  >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Sắp xếp theo
                        </Form.Label>
                        <Col sm="8">
                            <Form.Select size="lg" onChange={(e) => handleChange(e)}>
                                <option>Tổng tiền tăng dần</option>
                                <option>Tổng tiền giảm dần</option>
                                <option>Thanh toán khi nhận hàng</option>
                                <option>Thanh toán bằng paypal</option>
                            </Form.Select>

                        </Col>
                        <Col sm="2" >
                            <Button variant="success" size="lg" onClick={handleSortPayment}>Lọc</Button>{' '}
                        </Col>
                    </Form.Group>
                </Form>
                <Container style={{ maxWidth: '100%' }}>
                    <Row>
                        <Col className={cx('center-text')} style={{ minWidth: '150px' }}>ID</Col>
                        <Col className={cx('center-text')} style={{ minWidth: '200px' }} >Email</Col>
                        <Col className={cx('center-text')}>Tên</Col>
                        <Col className={cx('center-text')}>Số điện thoại</Col>
                        <Col className={cx('center-text')}>Phương thức giao hàng</Col>
                        <Col className={cx('center-text')}>Phương thức thanh toán</Col>
                        <Col className={cx('center-text')}>Mã giảm giá</Col>
                        <Col className={cx('center-text')}>Phí vận chuyển</Col>
                        <Col className={cx('center-text')}>Tổng tiền</Col>
                        <Col className={cx('center-text')}>Đã thanh toán</Col>
                        <Col className={cx('center-text')}>Actions</Col>
                    </Row>
                    {
                        listPayment.map((item, index) => {
                            return (
                                <Row key={index} style={{ border: '1px solid #ccc' }}>
                                    <Col style={{ fontSize: '1.1rem', margin: 'auto', minWidth: '150px' }}>{item._id}</Col>
                                    <Col className={cx('center-text')} style={{ minWidth: '200px', fontSize: '1.3rem' }}>{item.email}</Col>
                                    <Col className={cx('center-text')}>{item.name}</Col>
                                    <Col className={cx('center-text')}>{item.phone}</Col>
                                    <Col className={cx('center-text')}>{item.shippingMethod}</Col>
                                    <Col className={cx('center-text')}>{item.paymentMethod}</Col>
                                    <Col className={cx('center-text')}>{`${item.coupon.couponPrice}%` || `${item.coupon.couponShipping}đ`}</Col>
                                    <Col className={cx('center-text')}>{item.shippingPrice || 0}</Col>
                                    <Col className={cx('center-text')}>{item.totalPrice}</Col>
                                    <Col className={cx('center-text')}>{item.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</Col>
                                    <Col className={cx('center-text')} style={{ marginTop: '5px' }} >
                                        <Row className={cx('center')}> <Button variant="success" size="lg" style={{ width: '100px', marginBottom: '10px' }} onClick={() => handleGetDetail(item._id)} >Xem chi tiết</Button>{' '}</Row>


                                    </Col>
                                </Row>
                            )
                        })
                    }


                </Container>
            </div>
            <ModalWatchDetailPaymentAdmin show={isShowModal} handleClose={handClose} idOrder={idPayment} />
        </div>
    );
}

export default HomePayment;