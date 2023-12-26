import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './HomeUser.module.scss';
import classNames from 'classnames/bind';
import { getAllUser } from '../../../Services/AdminServices'
import ModalEditUserAdmin from "~/components/Layout/components/ModalEditUserAdmin";
import ModalCreateUserAdmin from "~/components/Layout/components/ModalCreateUserAdmin";
import { deleteUser } from '../../../Services/AdminServices'
import { UserContext } from "~/context/UserContext";
const cx = classNames.bind(styles)
function HomeUser() {
    const navigate = useNavigate();
    const [userRender, setUserRender] = useState([])
    const [show, setShow] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [idUser, setIdUser] = useState('')
    const { isRenderUserContext, user } = useContext(UserContext)
    useEffect(() => {
        if (user.isAdmin === false) {
            navigate('/')
        }
    }, [user])
    const renderUser = async () => {
        const res = await getAllUser()
        setUserRender(res.data.data)
    }
    useEffect(() => {
        renderUser()
    }, [])
    const handleEditUser = (idUser) => {
        setIdUser(idUser)
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
        setShowCreate(false)
    }
    const handleDeleteUser = async (idUser) => {
        const res = await deleteUser(idUser)
        renderUser()
    }
    useEffect(() => {
        renderUser()
    }, [isRenderUserContext])
    const handleCreateUser = (idUser) => {
        setShowCreate(true)
    }
    function formatVietnameseDateTime(dateTimeString) {

        const date = new Date(dateTimeString);
        const formattedDate = new Intl.DateTimeFormat('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            month: 'numeric',
            year: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',

        }).format(date);

        return formattedDate;
    }
    return (
        <div style={user.isAdmin === false ? { display: 'none' } : { display: 'block' }}>
            <HeaderAdmin />
            <div className={cx('product-containner')}>
                <Container style={{ maxWidth: '100%' }}>
                    <Row>
                        <Col className={cx('center')}>ID</Col>
                        <Col className={cx('center')}>Ngày tạo tài khoản</Col>
                        <Col className={cx('center')}>Email</Col>
                        <Col className={cx('center')}>Tên</Col>
                        <Col className={cx('center')}>Số điện thoại</Col>
                        <Col className={cx('center')}>Action</Col>

                    </Row>
                    {userRender.map((item, index) => {
                        return (
                            <Row key={index} style={{ border: '1px solid #ccc' }}>
                                <Col className={cx('center')} style={{ fontSize: '1.2rem' }}>{item._id}</Col>
                                <Col className={cx('center')}>{formatVietnameseDateTime(item.updatedAt)}</Col>
                                <Col className={cx('center')}>{item.email}</Col>
                                <Col className={cx('center')}>{item.name}</Col>
                                <Col className={cx('center')} >{item.phone}</Col>
                                <Col className={cx('center')}>
                                    <Button onClick={() => handleCreateUser()} style={{ marginRight: '10px' }} variant="success" size="lg">Tạo</Button>
                                    <Button onClick={() => handleEditUser(item._id)} style={{ marginRight: '10px' }} variant="primary" size="lg">Sửa</Button>
                                    <Button onClick={() => handleDeleteUser(item._id)} variant="danger" size="lg">Xóa</Button>
                                </Col>
                            </Row>
                        )
                    })}


                </Container>
            </div>
            <ModalEditUserAdmin show={show} handleClose={handleClose} idUser={idUser} />
            <ModalCreateUserAdmin show={showCreate} handleClose={handleClose} />
        </div>
    );
}

export default HomeUser;