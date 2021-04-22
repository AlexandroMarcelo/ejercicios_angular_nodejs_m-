const router = require('express').Router();
const { getUsers, insertUser, updateUser, deleteUser } = require('../Handlers/User');

/**
 * Fetch the users from DB
 */
router.get("/", function (req, res) {
    const users = getUsers();
    res.status(200).send({ "status": 200, "data": users });
})

/**
 * Post a user and insert into the DB
 * @param {object} user in the body of the post
 */
router.post("/", function (req, res) {
    const user = req.body;
    // Check the parameters from the body
    if (!user.nombre || !user.correo) {
        return res.status(400).send({ "status": 400, "error": "Bad request" });
    }
    // Prevent injecting unexpected data by passing the exact user properties to the insertion
    const params = {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo
    };
    const insert_user = insertUser(params);
    res.status(200).send(insert_user);
})

/**
 * Update a user properties given the user id
 * @param {object} user in the body of the petition
 */
router.put("/", function (req, res) {
    const user = req.body;
    // Check the parameters from the body, if the id exist and at least one of the properties is given
    if (!user.id || (!user.nombre && !user.correo)) {
        return res.status(400).send({ "status": 400, "error": "Bad request" });
    }
    // Prepare the parameters for the user and only if the parameter is given or not
    const params = {
        id: user.id,
        ...(user.nombre && { nombre: user.nombre }),
        ...(user.correo && { correo: user.correo })
    };
    const update_user = updateUser(params);
    res.status(200).send(update_user);
})

/**
 * Delete a user properties given the user id
 * @param {object} id user id in the body of the petition
 */
router.delete("/", function (req, res) {
    const { id } = req.body;
    // Check the id is given and if the id is 0
    if (!id && id !== 0) {
        return res.status(400).send({ "status": 400, "error": "Bad request" });
    }
    const delete_user = deleteUser(id);
    res.status(200).send(delete_user);
})

module.exports = router;
