import Home from "~/pages/Home";
import Product from "~/pages/Card";
import Cart from "~/pages/Cart";
import Login from "~/pages/Login";
import Pay from "~/pages/Pay";
import { HeaderOnly } from "~/components/Layout";
import Register from "~/pages/Register";
import News from "~/pages/News/News";
import ProfileNoti from "~/pages/ProfileNoti";
import ProfileOrder from "~/pages/ProfileOrder";
import ProfilePassword from "~/pages/ProfilePassWord";
import ProfileInformation from "~/pages/ProfileInformation";
import FinishPay from "~/pages/FinishPay";
import ForgotPassword from "~/pages/ForgotPassword";
import ResetPassword from "~/pages/ResetPassword";
import SeeAllProduct from "~/pages/SeeAllProduct";
import Chat from "~/pages/Chat";
import HomeUser from "~/pages/Admin/HomeUser";
import HomeCoupons from "~/pages/Admin/HomeCoupons";
import CreateProduct from "~/pages/Admin/CreateProduct";
import CreateCoupons from "~/pages/Admin/CreateCoupons";
import HomeOrder from "~/pages/Admin/HomeOrder";
import HomePayment from "~/pages/Admin/HomePayment";
import HomeOrderManagement from "~/pages/Admin/HomeOrderManagement";

import AdminChat from "~/pages/Admin/AdminChat";
import DefalutInformation from "~/components/Layout/components/DefaultInformation";
import { Fragment } from "react";
import CreateUser from "~/pages/Admin/CreateUser";
import HomeProduct from "~/pages/Admin/HomeProduct";
const publicRoutes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/cart',
        component: Cart,
        layout: HeaderOnly
    },
    {
        path: '/card',
        component: Product,
        layout: HeaderOnly
    },
    {
        path: '/login',
        component: Login,
        layout: HeaderOnly
    },
    {
        path: '/register',
        component: Register,
        layout: HeaderOnly
    },
    {
        path: '/forgotpassword',
        component: ForgotPassword,
        layout: HeaderOnly
    },
    {
        path: '/resetpassword',
        component: ResetPassword,
        layout: HeaderOnly
    },
    {
        path: '/pay',
        component: Pay,
        layout: HeaderOnly
    },
    {
        path: '/news',
        component: News,
        layout: HeaderOnly
    },

    {
        path: '/noti',
        component: ProfileNoti,
        layout: DefalutInformation

    },
    {
        path: '/order',
        component: ProfileOrder,
        layout: DefalutInformation

    },
    {
        path: '/password',
        component: ProfilePassword,
        layout: DefalutInformation

    },
    {
        path: '/information',
        component: ProfileInformation,
        layout: DefalutInformation
    },
    {
        path: '/checkout',
        component: FinishPay,
        layout: HeaderOnly

    },
    {
        path: '/product',
        component: SeeAllProduct,
        layout: HeaderOnly

    },
    {
        path: '/defalutInformation',
        component: DefalutInformation,
        layout: HeaderOnly
    },
    {
        path: '/chat',
        component: Chat,
        layout: HeaderOnly
    },
    {
        path: '/admin',
        component: HomeUser,
        layout: HeaderOnly

    },
    {
        path: '/admin/coupons',
        component: HomeCoupons,
        layout: HeaderOnly

    },
    {
        path: '/admin/createproduct',
        component: CreateProduct,
        layout: HeaderOnly

    },
    {
        path: '/admin/createcoupons',
        component: CreateCoupons,
        layout: HeaderOnly
    },
    {
        path: '/admin/createuser',
        component: CreateUser,
        layout: HeaderOnly
    },
    {
        path: '/admin/order',
        component: HomeOrder,
        layout: HeaderOnly
    },
    {
        path: '/admin/ordermanagement',
        component: HomeOrderManagement,
        layout: HeaderOnly
    },
    {
        path: '/admin/payment',
        component: HomePayment,
        layout: HeaderOnly
    },
    {
        path: '/admin',
        component: HomeUser,
        layout: HeaderOnly

    },
    {
        path: '/admin/coupons',
        component: HomeCoupons,
        layout: HeaderOnly

    },
    {
        path: '/admin/createproduct',
        component: CreateProduct,
        layout: HeaderOnly
    },
    {
        path: '/admin/createcoupons',
        component: CreateCoupons,
        layout: HeaderOnly

    },

    {
        path: '/admin/payment',
        component: HomePayment,
        layout: HeaderOnly

    },
    {
        path: '/admin/product',
        component: HomeProduct,
        layout: HeaderOnly

    },
    {
        path: '/admin/user',
        component: HomeUser,
        layout: HeaderOnly
    },
    {
        path: '/admin/chat',
        component: AdminChat,
        layout: HeaderOnly
    }

]
const privateRoutes = [

]
export { privateRoutes, publicRoutes }