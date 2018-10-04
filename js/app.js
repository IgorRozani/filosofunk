// Replacing $(document).ready()
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// Adicionando função no ready
ready(onReady);

function onReady() {
    if(!location.hash){
        getPoetry();
        declarePoetry();
    }else{
        getPoetry(window.location.hash.substring(1));
        declarePoetry();
    }
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
function setPoetry(data, id) {
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

    let index = id || getIndex(storage);
    exibirPoesia(data[index],index);
    setStorage(storage);
}

async function getPoetry(id) {
    try {
        let response = await fetch('poesias.json');
        if (response.status === 200) {
            let data = await response.json();
            setPoetry(data,id);
        }
    } catch (error) {
        throw new Error(`Erro ao obter dados do JSON: ${error}`);
    }
}

/**
 * Carrega o iframe com a música do youtube
 * @param id - ID do vídeo no youtube
 * @param start - Tempo de início do vídeo
 */
function carregarMusica(id, start) {
    var src = 'https://www.youtube.com/embed/' + id + '?loop=1&autoplay=1&start=' + start;
    document.getElementById("musica").src = src;
}

function exibirPoesia(poesia,id) {
    location.hash = "#" + id;
    document.getElementById("estrofe").innerText = '"' + poesia.estrofe + '"';
    document.getElementById("poeta").innerText = poesia.poeta;
    document.getElementById("poesia").innerText = poesia.poesia;
    carregarMusica(poesia.id, poesia.start);
}

function declarePoetry() {
    document.querySelector('.declare-button').addEventListener('click', (evt) => {
        evt.preventDefault();
        let storage = getStorage();

        if (!storage || !storage.length) {
            window.location.reload();
        };

        let index = getIndex(storage);
        exibirPoesia(poetry[index],index);
        setStorage(storage);
    });
}