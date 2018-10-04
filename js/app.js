function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(onReady);

function onReady() {
    if(!location.hash){
        getPoetry();
    }else{
        getPoetry(window.location.hash.substring(1));
    }

    window.addEventListener("hashchange", () => {
        if(!location.hash){
            getPoetry();
        }else{
            getPoetry(window.location.hash.substring(1));
        }
    }, false);
    
    document.querySelector('.declare-button').addEventListener('click', (evt) => {
        evt.preventDefault();
        declarePoetry();
    });


    document.getElementById('btn-stop').addEventListener('click', (evt) => {
        evt.preventDefault();
        stopYoutube();
    });

    document.getElementById('btn-play').addEventListener('click', (evt) => {
        evt.preventDefault();
        playYoutube();
    });
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

let poetryCollection, poetry;
let isPlayEnabled = true;

function setPoetry(data, id) {
    let storage = getStorage();

    poetryCollection = data;

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
    poetry = data[index];
    exibirPoesia(index);
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

function exibirPoesia(id) {
    location.hash = "#" + id;
    document.getElementById("estrofe").innerText = '"' + poetry.estrofe + '"';
    document.getElementById("poeta").innerText = poetry.poeta;
    document.getElementById("poesia").innerText = poetry.poesia;

    if (isPlayEnabled)
        carregarMusica(poetry.id, poetry.start);
}

function declarePoetry() {
    let storage = getStorage();

    if (!storage || !storage.length) {
        window.location.reload();
    };
  
    let index = getIndex(storage);
    poetry = poetryCollection[index];
    exibirPoesia(index);
  
    setStorage(storage);
}

function stopYoutube() {
    document.getElementById('musica').src = '';

    isPlayEnabled = false;
    VisibilityAudioButtons();
}

function playYoutube() {
    this.carregarMusica(poetry.id, poetry.start);

    isPlayEnabled = true;
    VisibilityAudioButtons();
}

function VisibilityAudioButtons() {
    document.getElementById('btn-stop').disabled = !isPlayEnabled;
    document.getElementById('btn-play').disabled = isPlayEnabled;
}