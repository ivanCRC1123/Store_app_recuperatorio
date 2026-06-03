import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Solicitar interceptor: agregar token portador desde zustand persist
apiClient.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem("store-auth-storage");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.state?.token) {
        config.headers.Authorization = `Bearer ${parsed.state.token}`;
      }
    }
  } catch {
    // ignorar
  }
  return config;
});

// Interceptor de respuesta: redirigir para iniciar sesión en 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("store-auth-storage");
      // Redirigir solo si aún no ha iniciado sesión o se ha registrado
      const path = window.location.pathname;
      if (path !== "/login" && path !== "/register") {
        window.location.href = "/login";
      }
    }
    console.error("API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  },
);

export default apiClient;
