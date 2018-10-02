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
    getPoetry();
}

function randomNumber(totalelements) {
    return Math.floor(Math.random() * totalelements);
}

function setPoetry(data) {
    let storage = JSON.parse(localStorage.getItem('shuffle'));

    if (!storage || !storage.length) {
        let total = data.length;
        let shuffle = [];

        for (let i = 0; i < total;) {
            let key = randomNumber(total);

            if (!shuffle[key]) {
                shuffle[key] = i;
                i++;
            }
        }

        storage = shuffle;
    }

    let index = storage.shift() || 0;
    exibirPoesia(data[index]);
    localStorage.setItem('shuffle', JSON.stringify(storage));

}

async function getPoetry() {
    try {
        let response = await fetch('poesias.json');
        if (response.status === 200) {
            let data = await response.json();
            setPoetry(data);
        }

    } catch (error) {
        throw new Error('Erro ao obter dados do JSON', error);
    }
}

function exibirPoesia(poesia) {
    document.getElementById("estrofe").innerText = '"' + poesia.estrofe + '"';
    document.getElementById("poeta").innerText = poesia.poeta;
    document.getElementById("poesia").innerText = poesia.poesia;
}

//que coisa feia
function declamar(event) {
    event.preventDefault();
    var ds = JSON.parse(localStorage.getItem("shuffle"));
    if (!ds || !ds.length) {
        window.location.reload();
    }
    exibirPoesia(data[ds.shift() || 0]);
    localStorage.setItem("shuffle", JSON.stringify(ds));
}