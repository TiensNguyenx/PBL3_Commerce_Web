import classNames from "classnames/bind";
import styles from "./HomeOrderManagement.module.scss";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import { UserContext } from "~/context/UserContext";
import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";

import socket from "~/pages/socket";
const cx = classNames.bind(styles);

function HomeOrderManagement() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [allOrder, setAllOrder] = useState([]);
    const [allPayment, setAllPayment] = useState({});
    const [distinctYears, setDistinctYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    useEffect(() => {
        if (!user.isAdmin) {
            navigate('/');
        } else {
            socket?.on('userPayment', (msg) => {
                fetchAllOrderData();
                fetchOrderDataByYear(selectedYear);
            });
            fetchAllOrderData();
            fetchOrderDataByYear(selectedYear);
        }
    }, [user, navigate, selectedYear]);

    const fetchAllOrderData = async () => {
        try {
            const response = await fetch('https://be-pbl3.onrender.com/admin/order/all-order-chart');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAllOrder(data.allOrder);
            setAllPayment(data.allPayment);
            setDistinctYears(data.distinctYears);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    const fetchOrderDataByYear = async (year) => {
        try {
            const response = await fetch(`https://be-pbl3.onrender.com/admin/order/all-order-chart-by-year?year=${year}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAllOrder(data.allOrder);
            setAllPayment(data.allPayment);
            setDistinctYears(data.distinctYears);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const chartData = [
        ["Tháng", "Số Đơn Hàng", { role: "style" }]
    ];

    for (let month = 1; month <= 12; month++) {
        const orderCount = allOrder.find(order => order._id.month === month && order._id.year === parseInt(selectedYear))?.orderCount || 0;
        const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
        chartData.push([`Tháng ${month}`, orderCount, color]);
    }

    const options = {
        title: `Số Đơn Hàng Năm ${selectedYear}`,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    const pieChartData = [
        ['Tình trạng', 'Số lượng'],
        ['Thanh toán bằng Paypal', allPayment.paidPayments],
        ['Thanh toán bằng COD', allPayment.unpaidPayments],
    ];

    const pieChartOptions = {
        title: `Phân Loại Thanh Toán Năm ${selectedYear}`,
        is3D: true,
    };

    return (
        <div className={cx('containner')} style={user.isAdmin ? { display: 'block' } : { display: 'none' }}>
            <HeaderAdmin />
            <div>
                <label htmlFor="yearSelect">Chọn năm: </label>
                <select id="yearSelect" value={selectedYear} onChange={handleYearChange}>
                    {distinctYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={chartData}
                options={options}
            />
            <Chart
                chartType="PieChart"
                data={pieChartData}
                options={pieChartOptions}
                width="100%"
                height="400px"
            />
        </div>
    );
}

export default HomeOrderManagement;