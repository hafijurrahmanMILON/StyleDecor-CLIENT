import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import RouteError from "../Components/RouteError";
import Services from "../Pages/Services";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import ServiceDetails from "../Components/ServiceDetails";
import Coverage from "../Pages/Coverage";
import DashLayout from "../Layout/DashLayout";
import MyBookings from "../Pages/Dashboard/MyBookings";
import MyProfile from "../Pages/Dashboard/MyProfile";
import PrivateRoute from "../Private/PrivateRoute";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/PaymentCancel";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import BeADecorator from "../Pages/BeADecorator";
import DecoratorRequest from "../Pages/Dashboard/DecoratorRequests";
import ApprovedDecorators from "../Pages/Dashboard/ApprovedDecorators";
import ServiceManagement from "../Pages/Dashboard/ServiceManagement";
import AddService from "../Pages/Dashboard/AddService";
import BookingManagement from "../Pages/Dashboard/BookingManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <RouteError></RouteError>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/services",
        Component: Services,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/coverage",
        Component: Coverage,
      },
      {
        path: "/be-a-decorator",
        Component: BeADecorator,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/service-details/:id",
        Component: ServiceDetails,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashLayout></DashLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-bookings",
        Component: MyBookings,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancel",
        Component: PaymentCancel,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "decorator-request",
        Component: DecoratorRequest,
      },
      {
        path: "approved-decorators",
        Component: ApprovedDecorators,
      },
      {
        path: "service-management",
        Component: ServiceManagement,
      },
      {
        path: "add-service",
        Component: AddService,
      },
      {
        path: "booking-management",
        Component: BookingManagement,
      },
    ],
  },
]);
