const API_BASE = 'https://backendecom-gxrc.onrender.com/api';

export interface WooProduct {
  id: number;
  name: string;
  price: string;
  description: string;
  images: {
    id: number;
    src: string;
    name: string;
    alt: string;
  }[];
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  average_rating?: string;
  rating_count?: number;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  image: {
    id: number;
    src: string;
    name: string;
    alt: string;
  } | null;
  parent: number;
  description: string;
  count: number;
}



export const fetchWooProducts = async (
  page: number = 1,
  perPage: number = 30
): Promise<WooProduct[]> => {
  const res = await fetch(`${API_BASE}/products/?page=${page}&per_page=${perPage}`);

  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
};

// Obtener categorías
export const fetchWooCategories = async (): Promise<WooCategory[]> => {
  const res = await fetch(`${API_BASE}/categories/`, {
    method: 'GET',
  });

  if (!res.ok) throw new Error('Error al obtener categorías');
  return res.json();
};


export const fetchWooProductsBySearch = async (
  search: string,
  page: number = 1,
  perPage: number = 30
): Promise<WooProduct[]> => {
  const res = await fetch(
    `${API_BASE}/search/?search=${encodeURIComponent(search)}&page=${page}&per_page=${perPage}`
  );

  if (!res.ok) throw new Error('Error al buscar productos');
  return res.json();
};

// Productos por categoría
export const fetchWooProductsByCategory = async (
  categoryId: number,
  page: number = 1,
  perPage: number = 30
): Promise<WooProduct[]> => {
  const res = await fetch(
    `${API_BASE}/products-by-category/?category_id=${categoryId}&page=${page}&per_page=${perPage}`
  );
  if (!res.ok) throw new Error('Error al obtener productos por categoría');
  return res.json();
};


export const fetchWooProductById = async (id: number): Promise<WooProduct> => {
  const res = await fetch(`${API_BASE}/product/${id}/`, {
    method: 'GET',
  });
  
  if (!res.ok) throw new Error('Error al obtener el producto');
  return res.json();
};


