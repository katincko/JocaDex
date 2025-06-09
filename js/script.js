const url = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0" // URL da API para buscar 50 Pokémons
const pokemonList = document.getElementById("lista-pokemon") // Seleciona o elemento UL onde os Pokémons serão exibidos



// Função que recebe os dados de um Pokémon e retorna o HTML para exibir na lista
function converter(pokemon){
   
    return `<li class="pokemon ${pokemon.types[0].type.name}">
                <p >${pokemon.name}</p>
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
            </li>
            `
}

// Função que busca detalhes de cada Pokémon usando a URL individual
function pokeDetails(pokemon){
    console.log(pokemon)
    return fetch(pokemon.url)
        .then((response) => response.json())
}

// Busca a lista de Pokémons, pega detalhes de cada um e exibe na tela
fetch(url)
    .then((response) => response.json()) // Converte resposta para JSON
    .then((jsonresponse) => jsonresponse.results) // Pega o array de Pokémons
    .then((list) => list.map(pokeDetails)) // Para cada Pokémon, busca detalhes
    .then((details) => Promise.all(details)) // Espera todos os detalhes serem carregados
    .then((newList) => pokemonList.innerHTML = newList.map(converter).join("")) // Monta o HTML e coloca na página
    .catch((error) => console.log(error)) // Mostra erro no console se algo der errado
