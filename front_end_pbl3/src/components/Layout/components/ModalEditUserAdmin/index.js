
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import { Form, Row, Col } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import { editUser } from '../../../../Services/AdminServices'
import { toast } from 'react-toastify';
import { UserContext } from '~/context/UserContext';
import { getDetailUserAdmin } from '../../../../Services/AdminServices'
const cx = classNames.bind()
function ModalEditUserAdmin({ show, handleClose, idUser }) {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState({})
    const { isRenderUserContext } = useContext(UserContext)

    const handleEditUser = async () => {
        await editUser(idUser, name, phone, email)
        toast.success('Cập nhật thành công')
        handleClose()
        isRenderUserContext()
    }
    const renderUser = async () => {
        const res = await getDetailUserAdmin(idUser)
        console.log(res)
        setEmail(res.data.email)
        setName(res.data.name)
        setPhone(res.data.phone)

    }
    useEffect(() => {
        if (show) {
            renderUser()
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
                                Phone
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control value={phone} type="phone" placeholder="Số điện thoại" size='lg' onChange={(e) => setPhone(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2" style={{ fontSize: '1.5rem' }}>
                                Email
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control value={email} type="text" placeholder="Email" size='lg' onChange={(e) => setEmail(e.target.value)} />
                            </Col>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className={cx('btn-lg')}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()} className={cx('btn-lg')}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditUserAdmin;