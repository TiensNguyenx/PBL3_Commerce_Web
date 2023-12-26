import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import styles from './CreateProduct.module.scss';
import classNames from 'classnames/bind';
import { UserContext } from "~/context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from '~/Services/AdminServices';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
function CreateProduct() {
    const navigate = useNavigate();
    const { isRenderUserContext } = useContext(UserContext);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [productCode, setProductCode] = useState('')
    const [productType, setProductType] = useState('')
    const [connectionStandard, setConnectionStandard] = useState('')
    const [switchType, setSwitchType] = useState('')
    const [durability, setDurability] = useState('')
    const [format, setFormat] = useState('')
    const [guarantee, setGuarantee] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [oldPrice, setOldPrice] = useState('')
    const [image, setImage] = useState('')
    const [type, setType] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [toltalRate, setTotalRate] = useState('')
    const [sold, setSold] = useState('')
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (user.isAdmin === false) {
            navigate('/')
        }
    }, [user])
    const handleCreateProduct = async () => {
        const res = await createProduct(name, description, productCode, productType, connectionStandard, switchType,
            durability, format, guarantee, newPrice, oldPrice, image, type, countInStock, toltalRate, sold)
        console.log(res)
        if (res.data.status === 'success') {
            toast.success('Sửa sản phẩm thành công')
        }
        else {
            toast.error('Sửa sản phẩm thất bại')

        }

        isRenderUserContext();
    }
    return (
        <div className={cx('containner')} style={user.isAdmin === false ? { display: 'none' } : { display: 'block' }} >
            <HeaderAdmin />
            <div className={cx('form-containner')}>
                <Form >
                    <Form.Group as={Row} className="mb-3"  >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Name" size="lg" value={name} onChange={(e) => setName(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Description
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Desription" size="lg" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Produdct Code
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Produdct Code" size="lg" value={productCode} onChange={(e) => setProductCode(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Product Type
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Product Type" size="lg" value={productType} onChange={(e) => setProductType(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Connection Standard
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Connection Standard" size="lg" value={connectionStandard} onChange={(e) => setConnectionStandard(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Switch Type
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Switch Type" size="lg" value={switchType} onChange={(e) => setSwitchType(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Durability
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Durability" size="lg" value={durability} onChange={(e) => setDurability(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Format
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Format" size="lg" value={format} onChange={(e) => setFormat(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Guarantee
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Guarantee" size="lg" value={guarantee} onChange={(e) => setGuarantee(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            New price
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="New price" size="lg" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Old Price
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Old Price" size="lg" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Image
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Image" size="lg" value={image} onChange={(e) => setImage(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Type
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder=" Type" size="lg" value={type} onChange={(e) => setType(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Count In Stock
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Count In Stock" size="lg" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Total rate
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Total rate" size="lg" value={toltalRate} onChange={(e) => setTotalRate(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Sold
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Sold" size="lg" value={sold} onChange={(e) => setSold(e.target.value)} />
                        </Col>
                    </Form.Group>
                </Form>
                <div className={cx('btn-containner')}>
                    <Button variant="success" size="lg" onClick={handleCreateProduct}>Create</Button>{' '}
                </div>
            </div>


        </div>
    );
}

export default CreateProduct;