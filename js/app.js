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

// Adicionando função no ready
ready(onReady);

/**
 * Carrega funções
 * @return void
 */
function onReady() {
    getPoetry();
    declarePoetry();
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

let poetry; // global para ser usada no button :/

/**
 * Define as poesias no localStorage e exibe na tela
 * @param data - dados a serem salvos no localStorage e exibidos na tela
 * @return void
 */
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

/**
 * Obtem poesias
 * @return void
 */
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

/**
 * Carrega o iframe com a música do youtube
 * @param id - ID do vídeo no youtube
 * @param start - Tempo de início do vídeo
 * @return void
 */
function carregarMusica(id, start) {
    var src = 'https://www.youtube.com/embed/' + id + '?loop=1&autoplay=1&start=' + start;
    document.getElementById("musica").src = src;
}

/**
 * Exibe a poesia na tela
 * @param poesia - infos da poesias exibida na tela
 * @return void
 */
function exibirPoesia(poesia) {
    document.getElementById("estrofe").innerText = '"' + poesia.estrofe + '"';
    document.getElementById("poeta").innerText = poesia.poeta;
    document.getElementById("poesia").innerText = poesia.poesia;
    carregarMusica(poesia.id, poesia.start);
}

/**
 * Recarrega página com uma no poesia
 * @return void
 */
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