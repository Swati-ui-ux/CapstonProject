import { Route, Routes } from "react-router-dom";

import Signup from "../auth/Signup";
import Login from "../auth/Login";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import AddProperty from "../pages/AddProperty";
import MyProperties from "../pages/MyProperties";
import PropertyDetails from "../pages/PropertyDetail";
import MyRoom from "../pages/MyRoom";
import OwnerPayments from "../pages/OwnerPayment";

import Navbar from "../Navbar";

import ProtectedRoute from "./ProtectedRoute";
import OwnerRoute from "./OwnerRoute";
import TenantRoute from "./TenantRoute";
import ForgotPassword from "../auth/ForgotPassword"
import ResetPassword from "../auth/ResetPassword"
import OwnerDashboard from "../pages/OwnerDashboard"
import EditProperty from "../pages/EditProperty"
import VerifyOtp from "../auth/VerifyOtp"

import OwnersList from "../components/OwnerList";
const AuthRoutes = () => {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public Routes */}
       <Route path="/" element={<OwnersList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/owners' element={<OwnersList />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />}
/>
        {/* Protected */}

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Owner Only */}

        <Route
          path="/add-property"
          element={
            <ProtectedRoute>
              <OwnerRoute>
                <AddProperty />
              </OwnerRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-properties"
          element={
            <ProtectedRoute>
              <OwnerRoute>
                <MyProperties />
              </OwnerRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner-payments"
          element={
            <ProtectedRoute>
              <OwnerRoute>
                <OwnerPayments />
              </OwnerRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <OwnerRoute>
                <OwnerDashboard />
              </OwnerRoute>
            </ProtectedRoute>
          }
        />
        <Route
  path="/edit-property/:id"
          element={<ProtectedRoute>
            <OwnerRoute>
            <EditProperty/>
            </OwnerRoute>
          </ProtectedRoute>}
/>

        {/* Tenant Only */}

        <Route
          path="/my-room"
          element={
            <ProtectedRoute>
              <TenantRoute>
                <MyRoom />
              </TenantRoute>
            </ProtectedRoute>
          }
        />

        {/* Common */}

        <Route
          path="/property/:id"
          element={
            <ProtectedRoute>
              <PropertyDetails />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
};

export default AuthRoutes;