import {ID, Query} from "node-appwrite"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(), 
            user.email, 
            user.phone, 
            undefined, 
            user.name
        );

        console.log("New user created:", newUser); // ✅ Debugging
        return parseStringify(newUser);
    } catch (error: any) {
        console.error("Error creating user:", error); // ✅ Log the exact error

        if (error?.code === 409) {  // Conflict (user already exists)
            const documents = await users.list([
                Query.equal('email', [user.email])
            ]);

            console.log("Existing user found:", documents?.users[0]); // ✅ Debugging
            return documents?.users[0];  
        }

        return null;  // Explicitly return null to prevent undefined issues
    }
};


export const getUser = async(userId: string) => {
    try{
        const user = await users.get(userId);

        return parseStringify(user);
    } catch(error){
        console.log(error)
    }
}