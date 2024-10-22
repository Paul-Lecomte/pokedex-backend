const express = require('express')
const pokemonController = require("../controllers/pokemonController");
const router = express.Router()


//@route    Route pokémons (GET)
//@desc     route pour obtenir tous les pokémons
//@acess    Public
router.route('/').get(pokemonController.getPokemons)

//@route    Route pokémons (GET)
//@desc     route pour obtenir un pokémon despuis son nom
//@acess    Public
router.route('/:name').get(pokemonController.getSinglePokemon)

//@route    Route pokémons (POST)
//@desc     route pour créer un pokemon
//@acess    Private (admin)
router.route('/').post(pokemonController.createPokemon)

//@route    Route pokémons (PUT)
//@desc     route pour Modifier un pokemon
//@acess    Private (admin)
router.route('/:id').put(pokemonController.updatePokemon)

//@route    Route pokémons (DELETE)
//@desc     route pour Supprimer un pokémon de la bdd
//@acess    Private
router.route('/:id').delete(pokemonController.deletepokemon)

//@route    Route pokémons (GET)
//@desc     route pour obtenir un pokémon despuis son id
//@acess    Public
router.route('/single/:id').get(pokemonController.getPokemonById)

module.exports = router