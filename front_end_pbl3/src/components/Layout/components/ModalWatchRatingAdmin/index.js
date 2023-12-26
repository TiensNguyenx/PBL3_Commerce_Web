import { Modal, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ratingProduct } from '~/Services/AdminServices';
import { useEffect, useState } from 'react';
import styles from './ModalWatchRatingAdmin.module.scss'
import classNames from 'classnames/bind'
import { AiFillStar } from 'react-icons/ai'
import { Col, Row } from 'react-bootstrap';
const cx = classNames.bind(styles)
function ModalWatchRatingAdmin({ show, handleClose, idProduct }) {
    const [feedBack, setFeecBack] = useState([]);
    const handleRating = async () => {
        const res = await ratingProduct(idProduct);
        console.log(res)
        if (res.data.length > 0) {
            setFeecBack(res.data)

        }
    }
    useEffect(() => {
        if (show) {
            handleRating();
        }
    }, [show])
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

    function renderStartUser(rate) {
        const startArrayUser = Array.from({ length: rate }, (_, index) => index);
        return startArrayUser.map((item) => (
            <AiFillStar key={item} style={{ color: '#c8191f' }} />
        ))
    }
    return (

        <Modal show={show} onHide={handleClose}
            centered>
            <Modal.Header closeButton>
                <Modal.Title><h3>Đánh giá khách hàng</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className={cx('fb-cmt')}>
                    {
                        feedBack.length > 0 ? (<Container>
                            <Row>
                                <Col className={cx('font-weight')}>Tên  </Col>
                                <Col className={cx('font-weight')}>Số sao</Col>
                                <Col className={cx('font-weight')}>Thời gian</Col>
                                <Col className={cx('font-weight')} >Nội dung</Col>
                            </Row>
                        </Container>) : null
                    }
                    {feedBack.length > 0 ? (
                        feedBack.map((item, index) => (

                            <Container key={index} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>

                                <Row >

                                    <Col >{item.name}</Col>
                                    <Col >{renderStartUser(item.rate)}</Col>
                                    <Col >{formatVietnameseDateTime(item.time_create)}</Col>
                                    <Col>{item.content}</Col>


                                </Row>


                            </Container>
                        ))
                    ) : (
                        <div className={cx('fb-empty')}><img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/shoprating/7d900d4dc402db5304b2090a184404cb.png' alt=''></img><span>Chưa có đánh giá nào</span></div>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>

                <Button variant="primary" size='lg' onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalWatchRatingAdmin;