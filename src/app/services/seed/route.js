import { ConnectDB } from "@/lib/ConnectDB"
import { services } from "@/lib/services";

export const GET = async() =>{
    const db = await ConnectDB();
    const servicesCollection = db.collection('services')
    try {
        await servicesCollection.deleteMany();
        const res = await servicesCollection.insertMany(services);
        return Response.json({message: 'Seeded Successfully'});
    } catch (error) {
        console.log(error)
    }
}