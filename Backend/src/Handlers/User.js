let users = [
    {
        "id": 0,
        "nombre": "Alexandro Marcelo",
        "correo": "alex.fcomarcelo@gmail.com"
    },
    {
        "id": 1,
        "nombre": "Francisco Marcelo",
        "correo": "francisco.marcelo@gmail.com"
    },
    {
        "id": 2,
        "nombre": "Isabel González",
        "correo": "isabel.gonzalez@gmail.com"
    }
];
// Carry on the last id on the DB to be assigned to new users. I think is a good practice to not repeat the id even if the previous user was deleted and his id is available.
let last_available_id = users.length;

const getUsers = () => {
    return users;
}

/**
 * Inserts a new user in DB
 * @param {object} user {id: number, nombre: string, correo: string}
 * @returns {object} {status: number, data:string||object}
 */
const insertUser = (user) => {
    let new_user = { ...user, "id": last_available_id };
    last_available_id++;
    // Verify the insertion of the user, this could be the response from the DB. This was made for practical purposes
    const old_db_length = users.length;
    const new_db_length = users.push(new_user);
    // If the old length of the users array + 1 is the new length, the insertion was successfully maded
    if ((old_db_length + 1) === new_db_length) {
        return { status: 200, data: { id: last_available_id - 1 } };;
    }
    return { status: 500, data: "Unexpected error" };
}

/**
 * Update the properties of the user given the user id
 * @param {object} id user id 
 * @returns {object} {status: number, data:string}
 */
const updateUser = (data) => {
    // As the Doc says, I suppose to use array.find(), but I could use findIndex and use that index to retrieve and update the user
    let user = users.find(user => user.id === data.id);
    if (!user) {
        return { status: 404, data: "Not found" };
    }
    // Object.keys(data).forEach(prop => {
    //     user[prop] = data[prop];
    // });
    user = { ...user, ...data };
    // Get the index of the user to update the data
    const index = users.findIndex(user => user.id == data.id);
    users[index] = user;
    return { status: 200, data: "Updated successfully" };
}

/**
 * Delete a user in the DB given the user id
 * @param {number} id user id
 * @returns {object} {status: number, data?:string}
 */
const deleteUser = (id) => {
    let user = users.find(user => user.id === id);
    if (!user) {
        return { status: 404, data: "Not found" };
    }
    // Get the index of the user to update the data
    const index = users.findIndex(user => user.id == id);
    // Remove the user by the index in the array and just delete one after that
    users.splice(index, 1);
    return { status: 200, data: "Deleted successfully" };
}

module.exports = {
    getUsers,
    insertUser,
    updateUser,
    deleteUser
}
