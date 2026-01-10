import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Pharmacies from "../pages/Pharmacies";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Searchpage from "../pages/Searchpage"
import TestMap from "../TestMap"
import PharmacistDashboard from '../pages/PharmacistDashboard'
import ProtectedRoute from './ProtectedRoute'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/pharmacies" element={<Pharmacies />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/search" element={<Searchpage/>} />
                        <Route path="/test-map" element={<TestMap/>} />
                    <Route 
                        path="/pharmacien/*"
                        element={
                            <ProtectedRoute role="pharmacist">
                            </ProtectedRoute>
                        }
                    />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}