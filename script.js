const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pname = document.getElementById("pokemon-name");
const pid = document.getElementById("pokemon-id");
const pweight = document.getElementById("weight");
const pheight = document.getElementById("height");
const ptypes = document.getElementById("types");
const php = document.getElementById("hp");
const pattack = document.getElementById("attack");
const pdefense = document.getElementById("defense");
const pspecialAttack = document.getElementById("special-attack");
const pspecialDefense = document.getElementById("special-defense");
const pspeed = document.getElementById("speed");
const image = document.getElementById("image");

searchButton.addEventListener("click", e => {
    
    e.preventDefault();

    if(searchInput.value === "Red"){
      alert("Pokémon not found");
      return;
    }

    fetchData();

});

const fetchData = async () => {
  try {
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput.value.toLowerCase()}`);
    const data = await res.json();
    showPokemon(data);
  } catch (err) {
    console.log(err);
    alert("Pokémon not found");
  }

}

const showPokemon = (data) => {
  
  console.log(data);
  
  const {height,id,name,sprites,stats,types,weight} = data;
  const [hp,attack,defense,specialAttack,specialDefense,speed] = stats; 
  const link = sprites["front_default"];

  pname.textContent = name[0].toUpperCase() + name.slice(1);
  pid.textContent = `#${id}`;
  pheight.textContent = `Height: ${height}`;
  pweight.textContent = `Weight: ${weight}`;
  php.textContent = `${hp["base_stat"]}`;
  pattack.textContent = attack["base_stat"];
  pdefense.textContent = defense["base_stat"];
  pspecialAttack.textContent = specialAttack["base_stat"];
  pspecialDefense.textContent = specialDefense["base_stat"];
  pspeed.textContent = speed["base_stat"];
  image.innerHTML = `<img id="sprite" src="${link}">`;

  ptypes.innerHTML = types.map(obj => 
    `<p>${obj.type.name[0].toUpperCase() + obj.type.name.slice(1)}</p>`
  ).join(" ");

} 