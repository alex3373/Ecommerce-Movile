// src/components/PrivateRoute.tsx
import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

interface PrivateRouteProps extends RouteProps {
  allowedRole?: string; // Opcional
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  allowedRole,
  component: Component,
  ...rest
}) => {
  const user = getCurrentUser(); // Devuelve null si no hay usuario

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          // No hay usuario → redirige a login
          return <Redirect to="/login" />;
        }

        if (allowedRole && user.role !== allowedRole) {
          // Usuario logueado pero no tiene el rol permitido
          return <Redirect to="/home" />;
        }

        // Usuario logueado y rol correcto (o no se requiere rol)
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
