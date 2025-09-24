// src/components/PrivateRoute.tsx

import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

interface PrivateRouteProps extends RouteProps {
  allowedRole: string; // Rol requerido (ej. "admin" o "cliente")
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  allowedRole,
  component: Component,
  ...rest
}) => {
  const user = getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          user.role === allowedRole ? (
            <Component {...props} />
          ) : (
            <Redirect to="/home" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;