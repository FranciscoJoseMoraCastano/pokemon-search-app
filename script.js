const pokemonID = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const generationInfo = document.getElementById('generation-info'); // Nuevo elemento para la generación
const spriteContainer = document.getElementById('sprite-container');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const separator = document.getElementById('separator');

// Ocultar el separador al inicio
separator.classList.add('hidden');

const getGeneration = (id) => {
  switch (true) {
    case (id >= 1 && id <= 151):
      return "1st Generation - Kanto";
    case (id >= 152 && id <= 251):
      return "2nd Generation - Johto";
    case (id >= 252 && id <= 386):
      return "3rd Generation - Hoenn";
    case (id >= 387 && id <= 493):
      return "4th Generation - Sinnoh";
    case (id >= 494 && id <= 649):
      return "5th Generation - Unova";
    case (id >= 650 && id <= 721):
      return "6th Generation - Kalos";
    case (id >= 722 && id <= 809):
      return "7th Generation - Alola";
    case (id >= 810 && id <= 898):
      return "8th Generation - Galar";
    case (id >= 899 && id <= 1008):
      return "9th Generation - Paldea";
    default:
      return "Unknown Generation";
  }
};

const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
    );
    const data = await response.json();

    // Convertir altura y peso a cm y kg
    const convertedHeight = data.height * 10; // Decímetros a centímetros
    const convertedWeight = data.weight / 10; // Hectogramos a kilogramos

    // Set Pokémon info
    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonID.textContent = `#${data.id}`;
    generationInfo.textContent = getGeneration(data.id); // Mostrar generación
    weight.textContent = `Weight: ${convertedWeight.toFixed(1)} kg`;
    height.textContent = `Height: ${convertedHeight} cm`;

    // Mostrar el separador si hay datos de peso y altura
    separator.classList.remove('hidden');

    spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
    `;

    // Set stats
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // Set types
    types.innerHTML = data.types
      .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
      .join('');
  } catch (err) {
    resetDisplay();
    alert('Pokémon not found');
    console.log(`Pokémon not found: ${err}`);
  }
};

const resetDisplay = () => {
  const sprite = document.getElementById('sprite');
  if (sprite) sprite.remove();

  // Reset stats
  pokemonName.textContent = '';
  pokemonID.textContent = '';
  types.innerHTML = '';
  height.textContent = '';
  weight.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';

  // Ocultar el separador al reiniciar el display
  separator.classList.add('hidden');
};

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  getPokemon();
});
