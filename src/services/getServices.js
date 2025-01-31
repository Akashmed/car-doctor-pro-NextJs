export const getServices = async () => {
    const data = await fetch('http://localhost:3000/services/api/get-all');
    const services = await data.json();
    return services;
}

export const getServiceDetails = async (id) => {
    const data = await fetch(`http://localhost:3000/services/api/${id}`);
    const service = await data.json();
    return service;
}
