import React, { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { IRoute } from "../types/RouteType";
import { routes as default_routes, authRoutes } from "./index";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../components/NotFoundPage";

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

const userNavigation = [
  { name: 'トップ', href: '/', current: true },
  { name: 'ランキング', href: '/ranking', current: false },
  { name: '予想バトル', href: '/expected-battle', current: false },
  { name: '育成ゲーム', href: '/training-game', current: false },
]

const adminNavigation = [

  { name: 'トップ', href: '/', current: true },
  { name: 'ランキング', href: '/ranking', current: false },
  { name: '予想バトル', href: '/expected-battle', current: false },
  { name: '育成ゲーム', href: '/training-game', current: false },
  { name: 'レース管理', href: '/race-management', current: false },
]

const superAdminNavigation = [

  { name: 'トップ', href: '/', current: true },
  { name: 'ランキング', href: '/ranking', current: false },
  { name: '予想バトル', href: '/expected-battle', current: false },
  { name: '育成ゲーム', href: '/training-game', current: false },
  { name: 'レース管理', href: '/race-management', current: false },
  { name: '成績管理', href: '/grade-management', current: false },
  { name: 'ユーザー情報', href: '/user-information', current: false },
]

type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
}
interface IAppRoutesPops {
  isAuthenticated: boolean;
  role: number;
}

const AppRoutes: FC<IAppRoutesPops> = ({isAuthenticated, role}) => {

  const [mainNavigationData, setMainNavigationData] = useState<NavigationItem[]>([]);

  useEffect(()=>{

    if (role == 0) {
      setMainNavigationData(userNavigation);
    }else if (role == 1) {
      setMainNavigationData(adminNavigation);
    }else if (role == 2) {
      setMainNavigationData(superAdminNavigation);
    }
    
  },[role]);

  const ModifiedMainLayout = () => {
    return (
      <MainLayout mainNavigationData={mainNavigationData}>
        <Outlet />
      </MainLayout>
    );
  };

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
                  (route.permission ? route.permission : 0) <=  role ? (
                    <route.component />
                  ) : (
                    <NotFoundPage />
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
