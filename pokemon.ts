let pokemonInfo;
let pokemonInfo2;
function showPokemonInfo() {
    let y = document.querySelectorAll("#title");
    for (let i = 0; i < y.length; i++)
        y[i].innerHTML = `<dt>Nazwa</dt><dd>${pokemonInfo2.name}</dd>`

    let x = document.querySelectorAll("#opisPokemona");
    for (let i = 0; i < x.length; i++)
        x[i].innerHTML = `<dt>Nazwa</dt><dd>${pokemonInfo2.name}</dd>
    <dt>Waga</dt><dd>${pokemonInfo2.weight}</dd>
    <dt>Wzrost</dt><dd>${pokemonInfo2.height}</dd>
    <dt>Typy</dt><dd>${pokemonInfo.type_id}</dd>`
}

let pokemonId = localStorage.getItem("id");
console.log(pokemonId);

let req = {
    "id": pokemonId,
};

function fetch2() {
    fetch('http://localhost:3003/post2', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(req), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .then(function (response) {
            pokemonInfo2 = response[0];
            showPokemonInfo();
        })
        .catch(error => console.error('Error:', error));

}

fetch('http://localhost:3003/post', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(req), // data can be `string` or {object}!
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        return response.json();
    })
    .then(function (response) {
        pokemonInfo = response[0];
        fetch2();
    })
    .catch(error => console.error('Error:', error));

