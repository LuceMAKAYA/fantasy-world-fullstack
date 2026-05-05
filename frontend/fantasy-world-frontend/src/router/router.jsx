import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import de tes pages
import AventuriersList from "../pages/AventurierList/AventuriersList";
import AventurierDetail from "../pages/AventurierDetail/AventurierDetail";
import AventurierCreate from "../pages/AventurierCreate/AventurierCreate";
import AventurierEdit from "../pages/AventurierEdit";
import CompetencesList from "../pages/CompetencesList/CompetencesList";
import CompetenceDetail from "../pages/CompetenceDetail/CompetenceDetail";
import CompetenceCreate from "../pages/CompetenceCreate/CompetenceCreate";
import CompetenceEdit from "../pages/CompetenceEdit/CompetenceEdit";
import AccessDenied from "../pages/AccessDenied/AccessDenied";

// Un petit composant pour protéger les routes Admin
const AdminRoute = ({ role, children }) => {
  return role === "ROLE_ADMIN" ? children : <Navigate to="/forbidden" />;
};

const AppRouter = ({ role }) => {
  return (
    <Routes>
      {/* --- ROUTES AVENTURIERS --- */}
      <Route path="/" element={<Navigate to="/aventuriers" />} />
      <Route path="/aventuriers" element={<AventuriersList canDelete={role === "ROLE_ADMIN"} />} />
      <Route path="/aventuriers/:id" element={<AventurierDetail role={role} />} />
      
      <Route path="/aventuriers/create" element={
        <AdminRoute role={role}><AventurierCreate /></AdminRoute>
      } />
      
      <Route path="/aventuriers/edit/:id" element={
        <AdminRoute role={role}><AventurierEdit /></AdminRoute>
      } />

      {/* --- ROUTES COMPÉTENCES --- */}
      <Route path="/competences" element={<CompetencesList role={role} />} />
      <Route path="/competences/:id" element={<CompetenceDetail role={role} />} />
      
      <Route path="/competences/create" element={
        <AdminRoute role={role}><CompetenceCreate /></AdminRoute>
      } />
      
      <Route path="/competences/edit/:id" element={
        <AdminRoute role={role}><CompetenceEdit /></AdminRoute>
      } />

      {/* --- AUTRES --- */}
      <Route path="/forbidden" element={<AccessDenied />} />
      <Route path="*" element={<Navigate to="/aventuriers" />} />
    </Routes>
  );
};

export default AppRouter;