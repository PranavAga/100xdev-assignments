import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    try {
        const values = [userId, title, description];
        const queryText = `
        INSERT
        INTO todos(user_id, title, description) 
        VALUES($1, $2, $3)
        RETURNING *;
        `
        const res = await client.query(queryText,values);
        // console.log(res.rows);
        return res.rows[0];

    } catch (error) {
        console.log(error);
        // return new Error(error)
    }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    try {
        const values = [todoId];
        const queryText = `
        UPDATE todos
        SET done = true
        WHERE id = $1
        RETURNING *;
        `
        const res = await client.query(queryText,values);
        return res.rows[0];
        
    } catch (error) {
        console.log(error);
        return new Error('Error in updateTodos')
    }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    // try {
        const values = [userId];
        const queryText = `
        SELECT * 
        FROM todos 
        WHERE user_id = $1
        `
        const res = await client.query(queryText,values);
        return res.rows;

    // } catch (error) {
    //     console.log(error);
    //     return new Error('Error in getTodos')
    // }
}