var pokemonInfo;
var pokemonInfo2;
function showPokemonInfo() {
    var y = document.querySelectorAll("#title");
    for (var i = 0; i < y.length; i++)
        y[i].innerHTML = "<dt>Nazwa</dt><dd>" + pokemonInfo2.name + "</dd>";
    var x = document.querySelectorAll("#opisPokemona");
    for (var i = 0; i < x.length; i++)
        x[i].innerHTML = "<dt>Nazwa</dt><dd>" + pokemonInfo2.name + "</dd>\n    <dt>Waga</dt><dd>" + pokemonInfo2.weight + "</dd>\n    <dt>Wzrost</dt><dd>" + pokemonInfo2.height + "</dd>\n    <dt>Typy</dt><dd>" + pokemonInfo.type_id + "</dd>";
}
var pokemonId = localStorage.getItem("id");
console.log(pokemonId);
var req = {
    "id": pokemonId
};
function fetch2() {
    fetch('http://localhost:3003/post2', {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
        return response.json();
    })
        .then(function (response) {
        pokemonInfo2 = response[0];
        showPokemonInfo();
    })["catch"](function (error) { return console.error('Error:', error); });
}
fetch('http://localhost:3003/post', {
    method: 'POST',
    body: JSON.stringify(req),
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(function (response) {
    return response.json();
})
    .then(function (response) {
    pokemonInfo = response[0];
    fetch2();
})["catch"](function (error) { return console.error('Error:', error); });
