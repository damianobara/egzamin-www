var pokemony;
function showPokemon(id) {
    console.log(id);
    localStorage.clear();
    localStorage.setItem("id", id);
    document.location.href = "pokemon.html";
}
function render() {
    var lista = "<tr>\n            <th>Nazwa</th>\n            <th>Wzrost</th>\n            <th>Waga</th>\n            <th>Gro\u017Any</th>\n        </tr>";
    pokemony.forEach(function (pokemon) {
        lista +=
            "<tr>\n            <td> <a id=" + pokemon.id + " onclick=\"showPokemon(this.id)\"> " + pokemon.name + "</a></td>\n            <td>" + pokemon.weight + "</td> \n            <td> " + pokemon.height + " </td>\n            <td>Niegro\u017Any</td>\n\n        </tr>";
    });
    return lista;
}
function generateList() {
    var x = document.querySelectorAll("#tabelka");
    for (var i = 0; i < x.length; i++)
        x[i].innerHTML = render();
}
fetch('http://localhost:3003/pokemon')
    .then(function (response) {
    return response.json();
})
    .then(function (response) {
    pokemony = response;
    //console.log(pokemony);
    generateList();
});
