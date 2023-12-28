import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './HomeOrder.module.scss';
import { UserContext } from "~/context/UserContext";
import { useNavigate } from "react-router-dom";
import { getAllDetailOrder } from "~/Services/AdminServices";
import ModalWatchDetailOrderAdmin from "~/components/Layout/components/ModalWatchDetailOrderAdmin";
import { Form } from 'react-bootstrap';
import { sortOrder } from "~/Services/AdminServices";
const cx = classNames.bind(styles)

function HomeOrder() {
    const navigate = useNavigate();
    const [listOrder, setListOrder] = useState([])
    const [isShowModalDetailOrder, setIsShowModalDetailOrder] = useState(false)
    const [idOrder, setIdOrder] = useState('')
    const { user } = useContext(UserContext);
    const [sortBy, setSortBy] = useState('totalPrice')
    const [sortType, setSortType] = useState('asc')
    useEffect(() => {
        if (user.isAdmin === false) {
            navigate('/')
        }
    }, [user])
    const renderOrcer = async () => {
        const res = await getAllDetailOrder()
        setListOrder(res.data)
        console.log(res)
    }
    useEffect(() => {
        renderOrcer()
    }, [])
    const handleDetailOrder = (id) => {
        setIdOrder(id)
        setIsShowModalDetailOrder(true)

    }
    const handleClose = () => {
        setIsShowModalDetailOrder(false)
    }
    const handleChange = async (e) => {
        if (e.target.value === 'Tổng tiền tăng dần') {
            setSortBy('totalPrice')
            setSortType('asc')
        }
        else if (e.target.value === 'Tổng tiền giảm dần') {
            setSortBy('totalPrice')
            setSortType('desc')
        }
        else if (e.target.value === 'Nhận tại cửa hàng') {
            setSortBy('nhan tai cua hang')

        }
        else {
            setSortBy('giao hang tan noi')

        }

    }
    const handleSortOrder = async () => {
        const res = await sortOrder(sortBy, sortType)
        console.log(res)
        setListOrder(res.data)
    }
    return (
        <div style={user.isAdmin === false ? { display: 'none' } : { display: 'block' }} className={cx('containner')} >
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
                                <option>Nhận tại cửa hàng</option>
                                <option>Giao hàng tận nơi</option>
                            </Form.Select>

                        </Col>
                        <Col sm="2" >
                            <Button variant="success" size="lg" onClick={handleSortOrder}>Lọc</Button>{' '}
                        </Col>
                    </Form.Group>
                </Form>
                <Container style={{ maxWidth: '100%' }}>
                    <Row >
                        <Col className={cx('center-text')}>ID</Col>
                        <Col className={cx('center-text')} style={{ minWidth: '200px' }}>Email</Col>
                        <Col className={cx('center-text')}>Tên</Col>
                        <Col className={cx('center-text')}>Số điện thoại</Col>
                        <Col className={cx('center-text')}>Địa chỉ</Col>
                        <Col className={cx('center-text')}>Ghi chú</Col>
                        <Col className={cx('center-text')}>Số lượng order</Col>
                        <Col className={cx('center-text')}>Phương thức giao hàng</Col>
                        <Col className={cx('center-text')}>Tổng tiền</Col>
                        <Col className={cx('center-text')}>Actions</Col>
                    </Row>
                    {
                        listOrder.map((item, index) => {
                            return (
                                <Row key={index} style={{ border: '1px solid #ccc' }}>
                                    <Col style={{ fontSize: '1.1rem', margin: 'auto', minWidth: '86px' }}>{item._id}</Col>
                                    <Col className={cx('center-text')} style={{ minWidth: '200px', fontSize: '1.3rem' }}>{item.email}</Col>
                                    <Col className={cx('center-text')}>{item.name}</Col>
                                    <Col className={cx('center-text')}>{item.phone}</Col>
                                    <Col className={cx('center-text')}>{item.addressUser}</Col>
                                    <Col className={cx('center-text')}>{item.noteUser || 'Không có'}</Col>
                                    <Col className={cx('center-text')}>{item.orderItems.length}</Col>
                                    <Col className={cx('center-text')}>{item.shippingMethod}</Col>
                                    <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalPrice)}</Col>
                                    <Col className={cx('center-text')} style={{ marginTop: '5px' }} >
                                        <Row className={cx('center')}> <Button variant="success" size="lg" style={{ width: '100px', marginBottom: '10px' }} onClick={() => handleDetailOrder(item._id)}>Xem chi tiết</Button>{' '}</Row>


                                    </Col>
                                </Row>
                            )
                        })
                    }



                </Container>
            </div>
            <ModalWatchDetailOrderAdmin show={isShowModalDetailOrder} handleClose={handleClose} idOrder={idOrder} />
        </div >
    );
}

export default HomeOrder;