import { ConnectDB } from "@/lib/ConnectDB"

export const GET = async() =>{
    const db = await ConnectDB();
    const servicesCollection = db.collection('services')
    try {
        const services = await servicesCollection.find().toArray();
        return Response.json({services});
    } catch (error) {
        console.log(error)
    }
}