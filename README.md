# Filosofunk [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
Lindas frases para aquecer os corações.

![Screenshot](img/screenshot.png?raw=true "Screenshot")

Para ver o site rodando: http://filosofunk.com.br/

Para ver a skill da alexa: em breve

## Sumário

* [Do que se trata?](#do-que-se-trata)
* [Sugerir mudanças](#sugerir-mudanças)
  * [Novas frases](#novas-frases)
  * [Mudanças no código](#mudanças-no-código)
  * [Mudanças na alexa](#mudanças-na-alexa)
* [Agradecimentos](#agradecimentos)

## Do que se trata?
Projeto feito nas horas vagas sem auxílio de bibliotecas e frameworks, utilizando apenas Vanilla JS, HTML e CSS, com o intuito de juntar frases engraçadas, divertidas, filosóficas ou criativas de músicas de funk.

## Sugerir mudanças

### Novas frases
As frases estão armazenadas no arquivo [poesias.json](https://github.com/IgorRozani/filosofunk/blob/master/poesias.json), adicione as novas frases no final do arquivo, utilizando a seguinte estrutura: 

```JSON
{
        "estrofe": "Um pente é pente",
        "poesia": "É o pente",
        "poeta": "Os Hawaianos",
        "youtube": {
                "id": "dEh3dJORNU4",
                "startTime": "36"
        }
}
```
Os campos são os seguintes:
- estrofe: trecho da música;
- poesia: nome da música;
- poeta: nome do cantor(a) ou grupo;
- youtubeId: id do vídeo no youtube;
- startTime: tempo do vídeo que ocorre pela primeira vez o trecho.

### Mudanças no código
O projeto possui apenas uma regra: não é permitido utilizar frameworks e/ou bibliotecas, apenas Vanilla JS.

### Mudanças no código
Todo o código da alexa se encontra na pasta [Alexa](), caso suas alterações necessite de modificações no build da skill, descreva no PR tudo que é necessário.

## Agradecimentos
Muito obrigado pela ajuda de [Astolfo](https://github.com/Astolfoho), [José Francisco](https://github.com/jfobaltazar), [Vitor Hugo](https://github.com/vitorlans), [Felipe Zini](https://github.com/felipezini), [Giancarlo Rocha](https://github.com/giancarlopro) e aos contribuidores.
