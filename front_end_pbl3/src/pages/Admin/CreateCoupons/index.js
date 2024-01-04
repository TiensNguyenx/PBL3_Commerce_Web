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
import { createCoupon } from "~/Services/AdminServices";
import { useState } from "react";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
function CreateCoupons() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [name, setName] = useState('')
    const [methodDisCount, setMethodDisCount] = useState('')
    const [description, setDescription] = useState('')
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [value, setValue] = useState(0)
    const [image, setImage] = useState('')
    useEffect(() => {
        if (user.isAdmin === false) {
            navigate('/')
        }
    }, [user])
    const handleCreateCoupon = async () => {
        await createCoupon(name, methodDisCount, description, dateStart, dateEnd, value, image)
        toast.success('Tạo mã giảm giá thành công')
        setName('')
        setMethodDisCount('')
        setDescription('')
        setDateStart('')
        setDateEnd('')
        setValue(0)
        setImage('')

    }
    return (
        <div className={cx('containner')} style={!user ? { display: 'none' } : { display: 'block' }} >
            <HeaderAdmin />
            <div className={cx('form-containner')}>
                <Form>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '1.5rem' }}>
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control value={name} type="text" placeholder="Tên" size='lg' onChange={(e) => setName(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '1.5rem' }}>
                            Method DisCount
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control value={methodDisCount} type="text" placeholder="Method DisCount" size='lg' onChange={(e) => setMethodDisCount(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '1.5rem' }}>
                            Description
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control value={description} type="text" placeholder="Description" size='lg' onChange={(e) => setDescription(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '1.5rem' }}>
                            Date Start
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control value={dateStart} type="text" placeholder="Date Start" size='lg' onChange={(e) => setDateStart(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '1.5rem' }}>
                            Date End
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control value={dateEnd} type="text" placeholder="Date End" size='lg' onChange={(e) => setDateEnd(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '1.5rem' }}>
                            Value
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control value={value} type="text" placeholder="Value" size='lg' onChange={(e) => setValue(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '1.5rem' }}>
                            Image
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control value={image} type="text" placeholder="Value" size='lg' onChange={(e) => setImage(e.target.value)} />
                        </Col>
                    </Form.Group>
                </Form>
                <div className={cx('btn-containner')}>
                    <Button variant="success" size="lg" onClick={handleCreateCoupon}>Create</Button>{' '}
                </div>
            </div>


        </div>
    );
}

export default CreateCoupons;