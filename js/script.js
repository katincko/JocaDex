const url = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0"
const pokemonList = document.getElementById("lista-pokemon")



function converter(pokemon){
   
    return `<li class="pokemon ${pokemon.types[0].type.name}">
                <p >${pokemon.name}</p>
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
            </li>
            `
}

function pokeDetails(pokemon){
    console.log(pokemon)
    return fetch(pokemon.url)
        .then((response) => response.json())
}

fetch(url)
    .then((response) => response.json())
    .then((jsonresponse) => jsonresponse.results)
    .then((list) => list.map(pokeDetails))
    .then((details) => Promise.all(details))
    .then((newList) => pokemonList.innerHTML = newList.map(converter).join(""))
    .catch((error) => console.log(error))
    