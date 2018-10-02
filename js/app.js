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
    declarePoetry();
}

function randomNumber(totalelements) {
    return Math.floor(Math.random() * totalelements);
}
function setStorage(data) {
    localStorage.setItem('shuffle', JSON.stringify(data));
}
function getStorage() {
    return JSON.parse(localStorage.getItem('shuffle'));
}

function getIndex(storageData) {
    return storageData.shift() || 0;
}

let poetry; // global para ser usada no button :/
function setPoetry(data) {
    let storage = getStorage();

    poetry = data;

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

    let index = getIndex(storage);
    exibirPoesia(data[index]);
    setStorage(storage);
}

async function getPoetry() {
    try {
        let response = await fetch('poesias.json');
        if (response.status === 200) {
            let data = await response.json();
            setPoetry(data);
        }
    } catch (error) {
        throw new Error(`Erro ao obter dados do JSON: ${error}`);
    }
}

function exibirPoesia(poesia) {
    document.getElementById("estrofe").innerText = '"' + poesia.estrofe + '"';
    document.getElementById("poeta").innerText = poesia.poeta;
    document.getElementById("poesia").innerText = poesia.poesia;
}

function declarePoetry() {
    document.querySelector('.declare-button').addEventListener('click', (evt) => {
        evt.preventDefault();
        let storage = getStorage();

        if (!storage || !storage.length) {
            window.location.reload();
        };

        let index = getIndex(storage);
        exibirPoesia(poetry[index]);
        setStorage(storage);
    });
}