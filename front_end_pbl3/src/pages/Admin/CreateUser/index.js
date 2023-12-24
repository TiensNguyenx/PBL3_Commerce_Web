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
const cx = classNames.bind(styles);
function CreateUser() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (!localStorage.getItem('isAdmin')) {
            navigate('/')
        }

    }, [user.isAdmin])
    return (
        <div className={cx('containner')} >
            <HeaderAdmin />
            <div className={cx('form-containner')}>
                <Form >
                    <Form.Group as={Row} className="mb-3"  >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Name" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Email" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Password" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Confirm Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="ConfirmPassword" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Phone
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="phone" placeholder="Phone" size="lg" />
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

export default CreateUser;