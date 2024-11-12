"use strict";
const express = require("express");
const router = express.Router();

const gamesController = require("../controllers/games.controller");

//http://localhost:3000/games/all
router.get("/all", ensureAuth, gamesController.getAll);

//http://localhost:3000/games?attribute=platform&value=Wii
router.get("/", ensureAuth, gamesController.getAllByOneAttribute);

//http://localhost:3000/games/5
router.get("/:id", ensureAuth, gamesController.getOneById);

//http://localhost:3000/games/new
router.post("/new", ensureAuth, gamesController.createNew);

function ensureAuth(req, res, next) {
    req.session.returnTo = req.originalUrl;
     if (!req.isAuthenticated()) {
       return res.redirect('/auth/login');
     }  
     next();
   }

module.exports = router;