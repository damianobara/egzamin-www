let pokemony;

function showPokemon(id) {
    console.log(id);
    localStorage.clear();
    localStorage.setItem("id", id);
    document.location.href = "pokemon.html";
}

function render() {
    let lista = `<tr>
            <th>Nazwa</th>
            <th>Wzrost</th>
            <th>Waga</th>
            <th>Groźny</th>
        </tr>`;
    pokemony.forEach((pokemon) => {
        lista +=
        `<tr>
            <td> <a id=${pokemon.id} onclick="showPokemon(this.id)"> ${pokemon.name}</a></td>
            <td>${pokemon.weight}</td> 
            <td> ${pokemon.height} </td>
            <td>Niegroźny</td>

        </tr>`;
    });
    return lista;
}

function generateList() {
    let x = document.querySelectorAll("#tabelka");
    for (let i = 0; i < x.length; i++)
        x[i].innerHTML = render();

}

fetch('http://localhost:3003/pokemon')
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        pokemony = response;
        //console.log(pokemony);
        generateList()
    });
