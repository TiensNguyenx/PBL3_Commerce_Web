import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Row, Col } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import { getDetailProduct } from '~/Services/AdminServices'
import { editProduct } from '~/Services/AdminServices';
import { toast } from 'react-toastify';
import { UserContext } from '~/context/UserContext';
function ModalEditProduct({ show, handleClose, idProduct }) {
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
    const [newPrice, setNewPrice] = useState(0)
    const [oldPrice, setOldPrice] = useState(0)
    const [image, setImage] = useState('')
    const [type, setType] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [toltalRate, setTotalRate] = useState(0)
    const [sold, setSold] = useState(0)
    const handleEditProduct = async () => {
        const res = await editProduct(idProduct, name, description, productCode, productType, connectionStandard, switchType,
            durability, format, guarantee, newPrice, oldPrice, image, type, countInStock, toltalRate, sold)
        console.log(res)
        if (res.data.status === 'success') {
            toast.success('Sửa sản phẩm thành công')
        }
        else {
            toast.error('Sửa sản phẩm thất bại')

        }
        handleClose();
        isRenderUserContext();
        console.log(toltalRate)
    }

    const renderDetailProduct = async () => {
        const res = await getDetailProduct(idProduct);
        console.log(res.data.total_rate)
        setCountInStock(res.data.countInStock || '')
        setGuarantee(res.data.guarantee || '')
        setImage(res.data.image || '')
        setNewPrice(res.data.new_price || '')
        setOldPrice(res.data.old_price || '')
        setSold(res.data.sold || '')
        setTotalRate(res.data.total_rate || 0)
        setType(res.data.type || '')
        setConnectionStandard(res.data.description.connection || '')
        setDurability(res.data.description.durability || '')
        setFormat(res.data.description.format || '')
        setDescription(res.data.description.name_description || '')
        setProductCode(res.data.description.product_code || '')
        setProductType(res.data.description.product_type || '')
        setSwitchType(res.data.description.switch_type || '')
        setName(res.data.name || '')
    }
    useEffect(() => {
        if (show) {
            renderDetailProduct();
        }
    }, [show])
    return (
        <>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Chỉnh sửa thông tin sản phẩm</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>

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
                                <Form.Control type="number" placeholder="Total rate" size="lg" value={toltalRate} onChange={(e) => setTotalRate(e.target.value)} />
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

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleEditProduct()} >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditProduct;