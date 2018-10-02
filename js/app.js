var request = new XMLHttpRequest();

function randomNumber(totalelements) {
  return Math.floor(Math.random() * totalelements);
}

// Replacing $(document).ready()
function ready(fn) {
  if (document.readyState != 'loading') {
    onReady();
  }

  document.addEventListener('DOMContentLoaded', fn);
}

ready(onReady);

function onReady() {
    request.send();
}

request.open('GET', './poesias.json', true); // Dev

request.onload = function() {
    if (request.status >= 200 && request.status < 400) {

        window.data = JSON.parse(request.responseText);

        var ds = JSON.parse(localStorage.getItem("shuffle"));

        if (!ds || !ds.length) {
            var dataShufle = [];
            var maxRandom = data.length;

            for (var i = 0; i < maxRandom; i++){
                var key = randomNumber(data.length);

                if (!dataShufle[key]) {
                  dataShufle[key] = i;
                }
            }
            ds = dataShufle;
        }

        showPoetry(data[ds.shift() || 0]);
        localStorage.setItem("shuffle", JSON.stringify(ds));
    } else {
      console.log("Falha ao obter dados do Json");
    }
};

request.onerror = function() {
  console.log("Erro ao obter dados do Json");
};

function showPoetry(poetry) {
  document.getElementById("estrofe").innerText = '"' + poetry.estrofe + '"';
  document.getElementById("poeta").innerText = poetry.poeta;
  document.getElementById("poesia").innerText = poetry.poesia;
}

function declamar(event) {
  event.preventDefault();
  var ds = JSON.parse(localStorage.getItem("shuffle"));
  if (!ds || !ds.length){
      window.location.reload();
  }
  showPoetry(data[ds.shift() || 0]);
  localStorage.setItem("shuffle", JSON.stringify(ds));
}
