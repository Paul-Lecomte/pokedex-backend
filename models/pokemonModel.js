//on importe la librairie mongoose
const mongoose = require('mongoose')

//on définit le schéma de données que l'on souhaite pour nos pokémons
const pokemonSchema = mongoose.Schema({
    pokemon_num: {
        type : String,
        required : true
    },
    pokemon_name: {
        type : String,
        required : true,
        unique : true,
        trim : true
    }
}, {timestamps : true})

module.exports = mongoose.model('Pokemon', pokemonSchema)