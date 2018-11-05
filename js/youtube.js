/**
 * Declaração de varíaveis globais utilizadas no script
 */
var player = null;
var youtubeId = null;
var startTime = 0;

/**
 * O trecho de código abaixo carrega a Iframe Player API de maneira assíncrona
 */
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

/**
 * Essa função cria um <iframe> (e player do youtube) quando o código da IFrame Player API é baixado
 * @return void
 */
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      start: 0,
      loop: 0,
      controls: 0,
      showinfo: 0,
      autohide: 1,
      modestbranding: 0
    },
    videoId: "",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

/**
 * IFrame Player API faz a chamada dessa função quando o player estiver pronto para uso
 * @param event - Evento do estado do player que pode ser usado para iniciar o vídeo padrão
 * @return void
 */
function onPlayerReady(event) {
  carregarMusica(this.youtubeId, this.startTime);
}

/**
 * IFrame Player API faz a chamada dessa função quando ocorrem mudanças de estados do player
 * @param event - Evento do estado do player
 * @return void
 */
function onPlayerStateChange(event) {
  switch (event.data) {
    case YT.PlayerState.PLAYING:
      moveFezinhoPatatyy("sarrando");
      break;
    case YT.PlayerState.PAUSED:
      moveFezinhoPatatyy("parado");
      break;
    case YT.PlayerState.ENDED:
      moveFezinhoPatatyy("parado");
      updateVisibilityButtonsToState("stop");
      break;
    default:
      moveFezinhoPatatyy("parado");
  }
}

/**
 * Inicia ou despausa o vídeo através da IFrame Player API
 * @return void
 */
function playVideo() {
  player.playVideo();
}

/**
 * Pausa o vídeo através da IFrame Player API
 * @return void
 */
function pauseVideo() {
  player.pauseVideo();
}

/**
 * Para de tocar vídeo através da IFrame Player API
 * @return void
 */
function stopVideo() {
  player.stopVideo();
  updateVisibilityButtonsToState("stop");
}

/**
 * Carrega a música do youtube se a IFrame Player API do youtube estiver pronta
 * Seta youtubeId e startTime globais caso a IFrame Player API não tenha sido carregada
 * @param youtubeId - Id do vídeo no youtube
 * @param startTime - Tempo de início do vídeo
 * @return void
 */
function carregarMusica(youtubeId, startTime) {
  if (player) {
    musicHasEnded = false;

    player.loadVideoById({
      videoId: youtubeId,
      startSeconds: startTime
    });
  } else {
    this.youtubeId = youtubeId;
    this.startTime = startTime;
  }
}

/**
 * Carrega o tipo de gif utilizado para mover o fezinho
 * @param movement - Movimento que será executado pelo fezinho
 * @return void
 */
function moveFezinhoPatatyy(movement) {
  let src = null;

  switch (movement) {
    case "sarrando":
      src = "./img/fezinho-sarrando.gif";
      break;
    default:
      src = "./img/fezinho-parado.gif";
  }

  document.getElementById("fezinho-patatyy").src = src;
}
