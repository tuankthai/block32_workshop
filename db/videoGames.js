const client = require('./client');
const util = require('util');

const REPLACE_ME = 'HELP REPLACE ME!!!!';

// GET - /api/video-games - get all video games
// replace REPLACE_ME wiht SELECT 
async function getAllVideoGames() {
    try {
        // const { rows: videoGames } = await client.query(`SELECT * FROM videoGames;`);
        const { rows : games } = await client.query(`SELECT * FROM videoGames;`);
        // return videoGames;
        return games;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
// deconstruct body from API request and place them into INSERT statement
async function createVideoGame(body) {
    // LOGIC GOES HERE
    try {
        const { rows: [game] } = await client.query(`
        INSERT INTO videoGames(name, description, price, "inStock", "isPopular", "imgUrl")
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `, [body.name, body.description, body.price, body.inStock, body.isPopular, body.imgUrl]);
        return game;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(gameId, fields = {}) {
    // LOGIC GOES HERE
    // build the set string
    console.log("gameId: ", gameId);
    console.log("fields: ", fields);

    Object.keys(fields).map((key, index) => {
        console.log(`"${key}"=$${index + 1}`);

    });

    //concatenate all the keys of the body (argument name fields)
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    console.log(typeof (setString))

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    //inset string of all keys into UPDATE statement
    //insesrt values of the keys of the body into UPDATE statement
    try {
        const { rows: [game] } = await client.query(`
      UPDATE videoGames
      SET ${setString}
      WHERE id=${gameId}
      RETURNING *;
    `, Object.values(fields));

        return game;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(gameId) {
    // LOGIC GOES HERE
    try {
        const { rows: [game] } = await client.query(`
      DELETE FROM videoGames
      WHERE id=$1
      RETURNING *;
    `, [gameId]);
        return game;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}