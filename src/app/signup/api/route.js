import { ConnectDB } from "@/lib/ConnectDB";
import bcrypt from 'bcrypt'
export const POST = async (request) => {
    try {
        const newUser = await request.json();
        const db = await ConnectDB();
        const usersCollection = db.collection('users');

        const exist = await usersCollection.findOne({ email: newUser.email });
        if (exist) {
            return new Response(JSON.stringify({ message: 'User already exists' }), { status: 304 });
        }
        const hashedPass = bcrypt.hashSync(newUser.password, 7);
        const res = await usersCollection.insertOne({ ...newUser, password: hashedPass });
        return new Response(JSON.stringify({ message: 'User created successfully', data: res }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Something went wrong', error: error.message }), { status: 404 });
    }
};
