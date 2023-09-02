const express = require('express');
const router = express.Router();

const REPLACE_ME = 'HELP REPLACE ME!!!!';

const { getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame } = require('../db/videoGames');

// GET - /api/video-games - get all video games
router.get('/', async (req, res, next) => {
    console.log("api video games")
    try {
        const videoGames = await getAllVideoGames();
        res.send(videoGames);
    } catch (error) {
        next(error);
    }
});

// GET - /api/video-games/:id - get a single video game by id
//extract params id from URL
router.get('/:id', async (req, res, next) => {
    try {
        const videoGame = await getVideoGameById(req.params.id);
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});

// POST - /api/video-games - create a new video game
router.post('/', async (req, res, next) => {
    // LOGIC GOES HERE 
    try {
        const game = await createVideoGame(req.body);
        res.send(game);
    } catch (error) {
        next(error);
    }
});


// PUT - /api/video-games/:id - update a single video game by id
// get game id param from URL and body from post request
router.put('/:gameId', async (req, res, next) => {
    // LOGIC GOES HERE 
    console.log("in put videogames")
    try {
        const game = await updateVideoGame(req.params.gameId, req.body);
        res.send(game);
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/video-games/:id - delete a single video game by id
// get game id from URL param
router.delete('/:gameId', async (req, res, next) => {
    // LOGIC GOES HERE
    try {
        const game = await deleteVideoGame(req.params.gameId);
        res.send(game);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
