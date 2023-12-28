import { useEffect, useState, useContext } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { editCoupon, getDetailCoupon } from '../../../../Services/AdminServices'
import { UserContext } from '~/context/UserContext';
import { toast } from 'react-toastify';
function ModalEditCouponAdmin({ show, handleClose, idCoupon }) {
    const [name, setName] = useState('')
    const [methodDiscount, setMethodDisCount] = useState('')
    const [description, setDescription] = useState('')
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [value, setValue] = useState('')
    const [image, setImage] = useState('')
    const { isRenderUserContext } = useContext(UserContext);
    const renderCoupon = async () => {
        const res = await getDetailCoupon(idCoupon)
        console.log(res)
        setName(res.data.name || '')
        setMethodDisCount(res.data.methodDiscount || '')
        setDescription(res.data.description || '')
        setDateStart(res.data.dateStart || '')
        setDateEnd(res.data.dateEnd || '')
        setValue(res.data.value || '')
        setImage(res.data.image || '')


    }
    const handleEditCoupon = async () => {
        const res = await editCoupon(idCoupon, name, methodDiscount, description, dateStart, dateEnd, value, image)
        console.log(res)
        handleClose()
        isRenderUserContext()
        toast.success('Chỉnh sửa mã giảm giá thành công')
    }
    useEffect(() => {
        if (show) {
            renderCoupon()
        }
    }, [show])
    return (
        <>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Chỉnh sửa thông tin</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                <Form.Control value={methodDiscount} type="text" placeholder="Method DisCount" size='lg' onChange={(e) => setMethodDisCount(e.target.value)} />
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} size='lg'>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleEditCoupon()} size='lg'>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditCouponAdmin;