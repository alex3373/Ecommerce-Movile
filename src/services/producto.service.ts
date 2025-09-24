// Muestra algunos productos solo para la vista de invitados
// services/producto.service.ts

export const getPublicProducts = async () => {
  try {
    const res = await fetch('https://cfbackend-r4jl.onrender.com/api');
    if (!res.ok) throw new Error('Error al obtener productos públicos');
    const data = await res.json();
    return data.products || data; // depende del formato
  } catch (error) {
    console.error('❌ Error al traer productos desde la API:', error);
    return [];
  }
};
