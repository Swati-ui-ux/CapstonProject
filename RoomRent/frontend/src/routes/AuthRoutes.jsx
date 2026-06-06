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

const AuthRoutes = () => {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public Routes */}

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected */}

        <Route
          path="/"
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