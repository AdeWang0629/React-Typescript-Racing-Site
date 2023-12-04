import React, { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { IRoute } from "../types/RouteType";
import { routes as default_routes, authRoutes } from "./index";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../components/NotFoundPage";

const ModifiedMainLayout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

const ModifiedAuthLayout = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

const RedirectComponent: FC = (): any => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);
};

const RedirectLoginComponent: FC = (): any => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/signin");
  }, [navigate]);
};

interface IAppRoutesPops {
  isAuthenticated: boolean;
  role: number;
}

const AppRoutes: FC<IAppRoutesPops> = ({isAuthenticated, role}) => {

  return (
    <>
      <Routes>

        <Route element={<ModifiedMainLayout />}>

          {default_routes.map((route: IRoute) => (
            <Route
              key={route.key}
              path={route.path}
              element={
                isAuthenticated ?
                (
                  (route.permission ? route.permission : 4) >= 0 ? (
                    <route.component />
                  ) : (
                    <RedirectComponent />
                  )
                )
                : 
                <RedirectLoginComponent />
              }
            />
          ))}

        </Route>
        
        
        <Route element={<ModifiedAuthLayout />}>

          {authRoutes.map((route: IRoute) => (
            <Route
              key={route.key}
              path={route.path}
              element={<route.component />}
            />
          ))}

        </Route>
        
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </>
  );
};

export default AppRoutes;
