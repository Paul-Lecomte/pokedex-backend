//import de librairies est de modèles
const asyncHandler = require('express-async-handler')
const PokemonModel = require('../models/pokemonModel')

//@get      récupérer tous les pokémon de la bdd
//@route    GET /api/pokemon
//@access   public
const getPokemons = asyncHandler(async (req, res) => {
    const pokemons = await PokemonModel.find()

    if (pokemons.length === 0){
        res.status(400)
        throw new Error("aucun pokemon trouvé coups dur sa")
    }
    res.status(200).json(pokemons)
})

//@get      récupérer un pokemon depuis son nom
//@route    GET /api/pokemon/name
//@access   public
const getSinglePokemon = asyncHandler(async (req, res) =>{
    const pokemon = await  PokemonModel.find({pokemon_name: req.params.name})

    if (pokemon.length === 0){
        res.status(400)
        throw new Error("aucun pokemon trouvé coups dur sa")
    }
    res.status(200).json(pokemon)
})

//@get      récupérer un pokemon depuis son id
//@route    GET /api/pokemon/id
//@access   public
const getPokemonById = asyncHandler(async (req, res) =>{
    const pokemon = await  PokemonModel.findById(req.params.id)

    if (pokemon.length === 0){
        res.status(400)
        throw new Error("aucun pokemon trouvé coups dur sa")
    }
    res.status(200).json(pokemon)
})


//@get      créer un dans pokémon la bdd
//@route    POST /api/pokemon
//@access   private (Admin)
const createPokemon = asyncHandler(async (req, res) => {
    //ici on stocke les infos du formulaire
    const inputs = req.body

    //on contrôle que les infos du formulaire ne sont pas valide
    if (!inputs || !inputs.pokemon_name || !inputs.pokemon_num){
        res.status(400)
        throw new Error("Merci de remplir les champs obligatoire.")
    }

    //on demande a la bdd si le pokemons existe
    const pokemonExists = await PokemonModel.findOne({pokemon_name : inputs.pokemon_name})
    if (pokemonExists){
        res.status(400)
        throw new Error("Ce pokémon existe déjà.")
    }

    //ici on crée le pokemon dans la bdd
    const pokemon = await PokemonModel.create({
        pokemon_num: inputs.pokemon_num,
        pokemon_name : inputs.pokemon_name
    })

    //on controle que le pokémon a bien été créer
    if (pokemon){
        res.status(201).json({message: `Le pokémon ${inputs.pokemon_name} a bien été créer.`})
    } else {
        res.status(400)
        throw new Error("Erreur lors de la création du pokemon veuiller recommencé.")
    }
})

//@get      Mettre a jour un pokemon dans la bdd
//@route    PUT /api/pokemon/id
//@access   private (Admin)
const updatePokemon = asyncHandler(async(req, res) => {
    //on récupère les infos du formulaire qui vient du frontend
    const {num, name} = req.body

    //on controle que les champs du formulaire soient remplie
    if (!num || num === "" || !name || name === ""){
        res.status(400)
        throw new Error("Merci de remplir les champs obligatoire.")
    }
    //on vérifie que le pokeom existe
    const pokemon = await PokemonModel.findById(req.params.id)
    if (!pokemon){
        res.status(400)
        throw new Error("aucun pokemon trouvé")
    }

    //on modifie le pokemon
    const updatePokemon = await PokemonModel.findByIdAndUpdate(req.params.id, {
        pokemon_num : num,
        pokemon_name : name
    })
    updatePokemon.save()
    res.status(201).json({message: `le pokemon ${pokemon.pokemon_name} a bien été modifié.`})
})

//@get      supprimer un pokemon dans la bdd
//@route    DELETE /api/pokemon/id
//@access   private (Admin)
const deletepokemon =asyncHandler(async(req, res)=>{
    const pokemon = await PokemonModel.findById(req.params.id)
    if (!pokemon){
        res.status(400)
        throw new Error("aucun pokemon trouvé")
    }

    const removedPokemon = await PokemonModel.findByIdAndDelete(req.params.id)
    res.status(200).json({message: `le pokemon ${removedPokemon.pokemon_name} a bien été supprimer`})
})


module.exports = {
    getPokemons,
    createPokemon,
    getSinglePokemon,
    getPokemonById,
    updatePokemon,
    deletepokemon
}