// src/utils/auth.ts

export function getCurrentUser() {
  try {
    const userJson = localStorage.getItem("usuario_actual");
    if (!userJson) return null;
    const user = JSON.parse(userJson);
    if (!user || !user.role) return null;
    return user;
  } catch (error) {
    console.error("Error al obtener usuario actual:", error);
    return null;
  }
}