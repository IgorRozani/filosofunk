/**
 * Replacing $(document).ready()
 * @return void
 */
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(onReady);

/**
 * Carrega funções
 * @return void
 */
function onReady() {
    if(!location.hash){
        getPoetry();
    }else{
        getPoetry(window.location.hash.substring(1));
    }

    window.addEventListener("hashchange", (evt) =>{
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

/**
 * Gera um número randomico
 * @param totalelements - total de poesias
 * @return number
 */
function randomNumber(totalelements) {
    return Math.floor(Math.random() * totalelements);
}

/**
 * Adiciona dados no localStorage
 * @param data - dados a ser salvo no localStorage
 */
function setStorage(data) {
    localStorage.setItem('shuffle', JSON.stringify(data));
}

/**
 * Retorna todos os dados salvos no localStorage
 * @return object
 */
function getStorage() {
    return JSON.parse(localStorage.getItem('shuffle'));
}

/**
 * Retorna uma posição a partir dos dados salvos no localStorage
 * @param storageData - valores salvos no localStorage
 * @return number
 */
function getIndex(storageData) {
    return storageData.shift() || 0;
}

let poetryCollection, poetry;
let isPlayEnabled = true;

/**
 * Define as poesias no localStorage e exibe na tela
 * @param data - dados a serem salvos no localStorage e exibidos na tela
 * @param id - hash da música
 * @return void
 */
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

/**
 * Obtem poesias
 * @param id - hash da música
 * @return void
 */
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
 * @param youtubeId - Id do vídeo no youtube
 * @param startTime - Tempo de início do vídeo
 * @return void
 */
function carregarMusica(youtubeId, startTime) {
    var src = 'https://www.youtube.com/embed/' + youtubeId + '?loop=1&autoplay=1&start=' + startTime;
    document.getElementById("musica").src = src;
}

/**
 * Exibe a poesia na tela
 * @param id - Id da música
 * @return void
 */
function exibirPoesia(id) {
    location.hash = "#" + id;
    document.getElementById("estrofe").innerText = '"' + poetry.estrofe + '"';
    document.getElementById("poeta").innerText = poetry.poeta;
    document.getElementById("poesia").innerText = poetry.poesia;

    if (isPlayEnabled)
        carregarMusica(poetry.youtubeId, poetry.startTime);
}

/**
 * Recarrega página com uma no poesia
 * @return void
 */
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

/**
* Para de tocar vídeo do youtube
* @return void
*/
function stopYoutube() {
    document.getElementById('musica').src = '';

    isPlayEnabled = false;
    VisibilityAudioButtons();
}

/**
 * Inicia o vídeo do youtube
 * @return void
 */
function playYoutube() {
    carregarMusica(poetry.youtubeId, poetry.startTime);

    isPlayEnabled = true;
    VisibilityAudioButtons();
}

/**
 * Modifica habilita e desabilita os botões de audio
 * @return void
 */
function VisibilityAudioButtons() {
    document.getElementById('btn-stop').disabled = !isPlayEnabled;
    document.getElementById('btn-play').disabled = isPlayEnabled;
}