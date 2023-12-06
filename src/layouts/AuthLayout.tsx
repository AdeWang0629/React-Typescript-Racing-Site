import React, { FC, ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f5deb3'}}>
      {children}
    </div>
  )
};

export default AuthLayout;
