import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import styles from './CreateUser.module.scss';
import classNames from 'classnames/bind';
import { UserContext } from "~/context/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from '~/Services/AdminServices';
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
function CreateUser() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    useEffect(() => {
        if (user.isAdmin === false) {
            navigate('/')
        }

    }, [user])
    const handleCreateUser = async () => {
        const res = await createUser(name, phone, email, password)
        if (res.data.status === 'success') {
            toast.success('Tạo tài khoản thành công')
            setName('')
            setPhone('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            
        }
        else {
            toast.error('Tạo tài khoản thất bại')
        }
    }
    return (
        <div className={cx('containner')} style={user.isAdmin === false ? { display: 'none' } : { display: 'block' }}>
            <HeaderAdmin />
            <div className={cx('form-containner')}>
                <Form >
                    <Form.Group as={Row} className="mb-3"  >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Name" size="lg" onChange={(e) => setName(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }} >
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Email" size="lg" onChange={(e) => setEmail(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }} >
                            Phone
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="phone" placeholder="Phone" size="lg" onChange={(e) => setPhone(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2" style={{ fontSize: '14px' }} >
                            Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Password" size="lg" onChange={(e) => setPassword(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }} >
                            Confirm Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="ConfirmPassword" size="lg" onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Col>
                    </Form.Group>

                </Form>
                <div className={cx('btn-containner')}>
                    <Button onClick={handleCreateUser} variant="success" size="lg">Create</Button>{' '}
                </div>
            </div>


        </div>
    );
}

export default CreateUser;