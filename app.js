// Replacing $(document).ready()
function ready(fn) {
    if (document.readyState != 'loading') {
        onReady();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// Adicionando função no ready
ready(onReady);

function onReady() {
    request.send();
}

function randomNumber(totalelements) {
    return Math.floor(Math.random() * totalelements);
}

// substituindo $.getJSON()
var request = new XMLHttpRequest();
request.open('GET', './poesias.json', true);
request.onload = function () {
    if (request.status >= 200 && request.status < 400) {

        window.data = JSON.parse(request.responseText);

        var ds = JSON.parse(localStorage.getItem("shuffle"));

        if (!ds || !ds.length) {
            var dataShufle = [];
            var maxRandom = data.length;

            for (var i = 0; i < maxRandom;){
                var key = randomNumber(data.length)
                if (!dataShufle[key]) {
                    dataShufle[key] = i;
                    i++
                }
            }
            ds = dataShufle;
        }

        exibirPoesia(data[ds.shift() || 0]);
        localStorage.setItem("shuffle", JSON.stringify(ds));
    } else {
        console.log("Falha ao obter dados do Json");
    }
};
request.onerror = function () {
    console.log("Erro ao obter dados do Json");
};

function exibirPoesia(poesia) {
    document.getElementById("poesia").innerText = '"' + poesia.poesia + '"';
    document.getElementById("poeta").innerText = poesia.poeta;
}


function declamar(event) {
    event.preventDefault();
    var ds = JSON.parse(localStorage.getItem("shuffle"));
    if (!ds || !ds.length){
        window.location.reload();
    }
    exibirPoesia(data[ds.shift() || 0]);
    localStorage.setItem("shuffle", JSON.stringify(ds));
}