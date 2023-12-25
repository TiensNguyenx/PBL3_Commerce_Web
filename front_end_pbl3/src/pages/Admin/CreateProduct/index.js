import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import styles from './CreateProduct.module.scss';
import classNames from 'classnames/bind';
import { UserContext } from "~/context/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
function CreateProduct() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (!localStorage.getItem('isAdmin')) {
            navigate('/')
        }
    }, [])
    return (
        <div className={cx('containner')} style={!localStorage.getItem('isAdmin') ? { display: 'none' } : { display: 'block' }} >
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
                            Description
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Desription" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Produdct Code
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Produdct Code" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Product Type
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Product Type" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Connection Standard
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Connection Standard" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Switch Type
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Switch Type" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Durability
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Durability" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Format
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Format" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Guarantee
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Guarantee" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            New price
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="New price" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Old Price
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Old Price" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Image
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Image" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Type
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder=" Type" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Count In Stock
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Count In Stock" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Total rate
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Total rate" size="lg" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Sold
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Sold" size="lg" />
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

export default CreateProduct;