import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import styles from './CreateCoupons.module.scss';
import { useEffect, useContext } from "react";
import { UserContext } from "~/context/UserContext";
import { useNavigate } from "react-router-dom";
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function CreateCoupons() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (!localStorage.getItem('isAdmin')) {
            navigate('/')
        }
    }, [])
    return (
        <div className={cx('containner')} >
            <HeaderAdmin />
            <div className={cx('form-containner')}>
                <Form >
                    <Form.Group as={Row} className="mb-3"  >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Tên mã giảm giá
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Tên mã giảm giá" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Loại mã giảm giá
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Loại mã giảm giá" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Mô tả
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Mô tả" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Ngày bắt đầu
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Ngày bắt đầu" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Ngày kết thúc
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="phone" placeholder="Ngày kết thúc" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Giá trị
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="phone" placeholder="Giá trị" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Ảnh
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="phone" placeholder="Ảnh" size="lg" />
                        </Col>
                    </Form.Group>
                </Form>
                <div className={cx('btn-containner')}>
                    <Button variant="success" size="lg">Create</Button>{' '}
                </div>
            </div>


        </div>
    );
}

export default CreateCoupons;