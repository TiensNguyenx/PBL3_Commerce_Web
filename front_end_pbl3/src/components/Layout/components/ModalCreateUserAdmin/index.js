
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import { Form, Row, Col } from 'react-bootstrap';
import { useState, useContext } from 'react';

import { toast } from 'react-toastify';
import { UserContext } from '~/context/UserContext';
import { createUser } from '../../../../Services/AdminServices'
const cx = classNames.bind()
function ModalCreateUserAdmin({ show, handleClose }) {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { isRenderUserContext } = useContext(UserContext)
    const handleCreateUser = async () => {
        const res = await createUser(name, phone, email, password)
        console.log(res)
        if (res.data.status === 'success') {
            toast.success('Tạo tài khoản thành công')
            isRenderUserContext()
            handleClose()
        }
    }


    return (
        <>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Tạo tài khoản</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2" style={{ fontSize: '1.4rem' }}>
                                Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control required value={name} type="text" placeholder="Tên" size='lg' onChange={(e) => setName(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2" style={{ fontSize: '1.4rem' }}>
                                Phone
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control value={phone} type="phone" placeholder="Số điện thoại" size='lg' onChange={(e) => setPhone(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2" style={{ fontSize: '1.4rem' }}>
                                Email
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control value={email} type="text" placeholder="Email" size='lg' onChange={(e) => setEmail(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2" style={{ fontSize: '1.4rem' }}>
                                Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control value={password} type="password" placeholder="Password" size='lg' onChange={(e) => setPassword(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2" style={{ fontSize: '1.4rem' }}>
                                Confirm Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control value={confirmPassword} type="password" placeholder="Confỉm Password" size='lg' onChange={(e) => setConfirmPassword(e.target.value)} />
                            </Col>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className={cx('btn-lg')} >
                        Hủy
                    </Button>
                    <Button disabled={true ? password !== confirmPassword : false} variant="primary" onClick={() => handleCreateUser()} className={cx('btn-lg')}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalCreateUserAdmin;