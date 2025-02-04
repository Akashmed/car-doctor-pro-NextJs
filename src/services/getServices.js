const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const getServices = async () => {
    const data = await fetch(`${API_BASE_URL}/services/api/get-all`);
    const services = await data.json();
    return services;
}

export const getServiceDetails = async (id) => {
    const data = await fetch(`${API_BASE_URL}/services/api/${id}`);
    const service = await data.json();
    return service;
}
