import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import styles from './HomeProduct.module.scss';
import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import { getAllProductService, getProductByNameService } from "~/Services/ProductServices";
import { useNavigate } from "react-router-dom";
import { handleSortService } from '~/Services/ProductServices'
import ModalWatchRatingAdmin from "~/components/Layout/components/ModalWatchRatingAdmin";
import { deleteProduct } from '~/Services/AdminServices'
import ModalEditProduct from "~/components/Layout/components/ModalEditProduct";
import { UserContext } from "~/context/UserContext";

const cx = classNames.bind(styles);
function HomeProduct() {
    const navigate = useNavigate();
    const { isRenderUserContext, user } = useContext(UserContext);
    const [sortType, setSortType] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [isShowModalRating, setIsShowModalRating] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [idProduct, setIdProduct] = useState('');
    useEffect(() => {
        if (!user.isAdmin) {
            navigate('/')
        }
    }, [user]);
    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        renderProduct();
    }, [isRenderUserContext])
    const renderProduct = async () => {
        const res = await getAllProductService(0, 100);
        setProduct(res.data.data);
    }
    const handleTypeSearch = (e) => {
        setSearch(e.target.value);
    }
    const handleSearch = async () => {
        const res = await getProductByNameService(search);
        setProduct(res.data.data);
        setSearch('');
    }
    const handleChange = (e) => {
        if (e.target.value === 'Tên A-Z') {
            setSortBy('name');
            setSortType('asc');
        } else if (e.target.value === 'Tên Z-A') {
            setSortBy('name');
            setSortType('desc');
        }
        else if (e.target.value === 'Giá tăng dần') {
            setSortBy('new_price');
            setSortType('asc');
        } else if (e.target.value === 'Giá giảm dần') {
            setSortBy('new_price');
            setSortType('desc');
        } else if (e.target.value === 'Mới nhất') {
            setSortBy('createdAt');

        }
    }
    const handleSortProduct = async () => {
        if (sortBy === 'createdAt') {
            getAllProductService(0, 100).then((res) => {
                setProduct(res.data.data);
            });
        } else {
            const rest = await handleSortService(0, 100, sortBy, sortType);
            setProduct(rest.data.data);
        }
    }
    const handleDeleteProduct = async (id) => {
        await deleteProduct(id);
        renderProduct();
    }
    const handleClose = () => {
        setIsShowModalRating(false);
        setIsShowModalEdit(false);
    }
    const handleWatchRating = async (id) => {
        setIsShowModalRating(true);
        setIdProduct(id);
    }
    const handleEditProduct = (id) => {
        setIsShowModalEdit(true);
        setIdProduct(id);
    }
    return (
        <div className={cx('containner')} style={!user.isAdmin ? { display: 'none' } : { display: 'block' }}>
            <HeaderAdmin />
            <div className={cx('form-containner')}>
                <Form >
                    <Form.Group as={Row} className="mb-3 "  >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Tên sản phẩm
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" placeholder=" Tên sản phẩm" size="lg" value={search} onChange={(e) => handleTypeSearch(e)} />

                        </Col>
                        <Col sm="2" >
                            <Button variant="success" size="lg" onClick={handleSearch}>Tìm kiếm</Button>{' '}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 "  >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Sắp xếp theo
                        </Form.Label>
                        <Col sm="8">
                            <Form.Select size="lg" onChange={(e) => handleChange(e)}>
                                <option >Tên A-Z</option>
                                <option>Tên Z-A</option>
                                <option>Mới nhất</option>
                                <option>Cũ nhất</option>
                                <option>Giá tăng dần</option>
                                <option>Giá giảm dần</option>
                                <option>Số lượng còn lại tăng dần</option>
                                <option>Số lượng còn lại giảm dần</option>
                                <option>Đánh giá tăng dần</option>
                                <option>Đánh giá giảm dần</option>
                                <option>Số lượng đã bán tăng dần</option>
                                <option>Số lượng đã bán giảm dần</option>

                            </Form.Select>

                        </Col>
                        <Col sm="2" >
                            <Button variant="success" size="lg" onClick={handleSortProduct}>Sắp xếp</Button>{' '}
                        </Col>
                    </Form.Group>
                </Form>

            </div>
            <div className={cx('product-containner')}>
                <Container style={{ maxWidth: '100%' }}>
                    <Row>
                        <Col className={cx('center-text')}>ID</Col>
                        <Col className={cx('center-text')}>Ảnh</Col>
                        <Col className={cx('center-text')}>Tên</Col>
                        <Col className={cx('center-text')}>Giá mới</Col>
                        <Col className={cx('center-text')}>Giá cũ</Col>
                        <Col className={cx('center-text')}>Loại</Col>
                        <Col className={cx('center-text')}>Còn lại</Col>
                        <Col className={cx('center-text')}>Đã bán</Col>
                        <Col>Actions</Col>
                    </Row>
                    {product.map((item, index) => {
                        return (
                            <Row key={index} style={{ border: '1px solid #ccc' }}>

                                <Col style={{ fontSize: '1.3rem', margin: 'auto' }} >{item._id}</Col>
                                <Col ><img alt='' className={cx('img')} src={item.image}></img></Col>

                                <Col className={cx('center-text')}>{item.name}</Col>
                                <Col className={cx('center-text')} >{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.new_price)}</Col>
                                <Col className={cx('center-text')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.old_price)}</Col>
                                <Col className={cx('center-text')}>{item.type}</Col>
                                <Col className={cx('center-text')}>{item.countInStock}</Col>
                                <Col className={cx('center-text')}>{item.sold}</Col>
                                <Col style={{ marginTop: '5px' }}>
                                    <Row> <Button variant="success" size="lg" style={{ width: '100px', marginBottom: '10px' }} onClick={() => handleEditProduct(item._id)}>Sửa</Button>{' '}</Row>
                                    <Row><Button variant="danger" size="lg" style={{ width: '100px', marginBottom: '10px' }} onClick={() => handleDeleteProduct(item._id)}>Xóa</Button>{' '}</Row>
                                    <Row> <Button variant="info" size="lg" style={{ width: '100px', marginBottom: '10px' }} onClick={() => handleWatchRating(item._id)}>Xem đánh giá </Button>{' '}</Row>
                                </Col>

                            </Row>
                        )
                    })}
                </Container>
            </div>
            <ModalWatchRatingAdmin show={isShowModalRating} handleClose={handleClose} idProduct={idProduct} />
            <ModalEditProduct show={isShowModalEdit} handleClose={handleClose} idProduct={idProduct} />
        </div>
    );
}

export default HomeProduct;