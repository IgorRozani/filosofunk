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
request.open('GET', 'https://raw.githubusercontent.com/IgorRozani/what-should-i-study/master/server/technology.json', true);
request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        var poesia = data[randomNumber(data.length)];
        console.log(poesia);
        exibirPoesia(poesia);
    } else {
        console.log("Falha ao obter dados do Json");
    }
};
request.onerror = function () {
    console.log("Erro ao obter dados do Json");
};

function exibirPoesia(poesia) {
    document.getElementById("poesia").innerText = '"'+poesia.slogan+'"';
    document.getElementById("poeta").innerText = poesia.name;

    // var idVideo = "KNFhffBOyWo";
    // var inicio = 35;
    // var fim = 36;

    // var video = "https://www.youtube.com/embed/" + idVideo + "?start=" + inicio + "&end=" + fim + "&autoplay=1";
    // document.getElementsByTagName("iframe")[0].setAttribute("src", video);
}