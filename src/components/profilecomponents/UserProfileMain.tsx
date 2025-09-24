import React from "react";
import UserStatsCard from "./UserStatsCard";
import UserInfoActions from "./UserInfoActions";
import UserAvatar from "./UserAvatar";

interface Props {
  userData: {
    nombreCompleto: string;
    email: string;
    foto: string;
    celular: string;
    direccion: { calle: string; ciudad: string };
    stats: { pedidos: number; gastado: number; favoritos: number };
  };
  onEditProfile: () => void;
}

const UserProfileMain: React.FC<Props> = ({ userData, onEditProfile }) => (
  <>
    <UserAvatar
      foto={userData.foto}
      nombre={userData.nombreCompleto}
      email={userData.email}
      onEdit={onEditProfile}
    />
    <UserStatsCard
      pedidos={userData.stats.pedidos}
      gastado={userData.stats.gastado}
      favoritos={userData.stats.favoritos}
    />
    <UserInfoActions
      direccion={userData.direccion}
      celular={userData.celular}
    />
  </>
);

export default UserProfileMain;