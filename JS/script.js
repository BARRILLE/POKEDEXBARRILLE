// Selecionando elementos do DOM
const pokemonNameElement = document.querySelector('.pokemon_name');
const pokemonNumberElement = document.querySelector('.pokemon_number');
const pokemonImageElement = document.querySelector('.pokemon_image');
const formElement = document.querySelector('.form');
const inputElement = document.querySelector('.input_search');
const buttonPrevElement = document.querySelector('.btn-prev');
const buttonNextElement = document.querySelector('.btn-next');

// Variável para armazenar o número do Pokémon atual
let currentPokemonId = 1;

// Função para buscar dados do Pokémon na API
const fetchPokemon = async (pokemonId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (response.status === 200) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

// Função para renderizar os dados do Pokémon
const renderPokemon = async (pokemonId) => {
    try {
        // Exibir mensagem de carregamento
        pokemonNameElement.innerHTML = 'Loading...';
        pokemonNumberElement.innerHTML = '';

        // Buscar dados do Pokémon
        const pokemonData = await fetchPokemon(pokemonId);

        if (pokemonData) {
            // Exibir dados do Pokémon
            pokemonNameElement.innerHTML = pokemonData.name;
            pokemonNumberElement.innerHTML = pokemonData.id;
            pokemonImageElement.style.display = 'block';
            pokemonImageElement.src = pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default;
            inputElement.value = '';
            currentPokemonId = pokemonData.id;
        } else {
            // Exibir mensagem de Pokémon não encontrado
            pokemonNameElement.innerHTML = 'Not found :c';
            pokemonNumberElement.innerHTML = '';
            pokemonImageElement.style.display = 'none';
        }
    } catch (error) {
        console.error('Error rendering pokemon:', error);
    }
}

// Evento de envio do formulário
formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const userInput = inputElement.value.toLowerCase();
    renderPokemon(userInput);
});

// Evento do botão "Anterior"
buttonPrevElement.addEventListener('click', () => {
    if (currentPokemonId > 1) {
        renderPokemon(currentPokemonId - 1);
    }
});

// Evento do botão "Próximo"
buttonNextElement.addEventListener('click', () => {
    renderPokemon(currentPokemonId + 1);
});

// Renderizar o primeiro Pokémon ao carregar a página
renderPokemon(currentPokemonId);