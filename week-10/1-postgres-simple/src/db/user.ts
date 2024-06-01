import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    try {
        const values = [username, password, name];
        const queryText = `
        INSERT INTO users(username, password, name) 
        VALUES($1, $2, $3);
        `
        const res = await client.query(queryText,values);
        return res.rows[0];
    } catch (error) {
        console.log(error);
        return new Error('Error in createUser')
    }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    try {
        const values = [userId];
        const queryText = `
        SELECT * 
        FROM users 
        WHERE id = $1
        `
        const res = await client.query(queryText,values);
        return res.rows[0];

    } catch (error) {
        console.log(error);
        return new Error('Error in getUser')
    }
}
