# TODO — Melhorias do Filosofunk

Sugestões de melhorias levantadas na análise do projeto, organizadas por prioridade.

---

## Bugs

- [ ] **Shuffle com colisões — substituir por Fisher-Yates real** (`Site/js/app.js` linhas 103-110)
  O algoritmo atual usa tentativa e erro com `randomNumber()` — os últimos slots demoram exponencialmente para preencher. Substituir por Fisher-Yates correto:
  ```js
  let shuffle = Array.from({length: total}, (_, i) => i);
  for (let i = total - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
  }
  ```

- [ ] **`declarePoetry()` sem `return` após `reload()`** (`Site/js/app.js` linhas 168-179)
  Quando `storage` está vazio, `window.location.reload()` é chamado mas o código continua executando. `getIndex(null)` lança `TypeError`. Adicionar `return` após o reload.

- [ ] **Fetch desnecessário do JSON a cada `hashchange`** (`Site/js/app.js` linhas 20-32)
  `getPoetry()` re-baixa o `poesias.json` (~87KB) inteiro toda vez que o hash muda. Verificar se `poetryCollection` já está populado antes de fazer fetch.

---

## Seguranca e Compatibilidade

- [ ] **Google Fonts via HTTP — bloqueado como mixed content** (`Site/index.html` linha 29)
  Mudar `http://fonts.googleapis.com` para `https://fonts.googleapis.com`. A fonte provavelmente já não carrega em HTTPS.

- [ ] **Facebook SDK v3.1 descontinuado** (`Site/index.html` linha 64)
  Versão de 2018, já fora de suporte. Atualizar para versão atual ou remover se os botões não funcionam mais.

- [ ] **URLs Open Graph e Twitter com `http://`** (`Site/index.html` linhas 15, 20, 100, 102, 109)
  Todas as meta tags e links de compartilhamento usam `http://filosofunk.com.br`. Trocar para `https://`.

- [ ] **`meta robots: nofollow` prejudica SEO** (`Site/index.html` linha 13)
  O `nofollow` impede buscadores de seguir links. Avaliar se faz sentido manter ou trocar para `index, follow`.

---

## UX

- [ ] **Compartilhamento social não inclui a frase atual**
  WhatsApp, Facebook e Twitter compartilham apenas a URL genérica. O link do WhatsApp é montado uma vez no `DOMContentLoaded` e nunca atualizado. Atualizar os links de compartilhamento em `exibirPoesia()` para incluir a frase + hash.

- [ ] **`blockquote` com font-size fixo 59px — estoura em mobile** (`Site/css/site.css` linha 26)
  Frases longas quebram o layout em telas pequenas. Usar `clamp()`:
  ```css
  blockquote { font-size: clamp(24px, 5vw, 59px); }
  ```

- [ ] **Botão "Declamar" deveria ser `<button>`, não `<a href="#">`** (`Site/index.html` linha 83)
  Melhora semântica, acessibilidade e evita scroll indesejado para o topo.

- [ ] **Sem feedback de loading ao carregar a página**
  Tela fica vazia enquanto o fetch do JSON processa. Adicionar um placeholder ou skeleton.

---

## Limpeza de Codigo

- [ ] **Remover todo o diretorio `Alexa/`**
  O código da skill Alexa não está mais em uso. Remover a pasta `Alexa/` inteira, incluindo `lambda/`, `skill.json`, `interactionModels/` e `assets/`.

- [ ] **CSS `.btn-danger:disabled` duplicado** (`Site/css/site.css` linhas 150-154 e 164-168)
  Mesmo bloco aparece duas vezes. Remover a copia duplicada.

- [ ] **Estilo `.whatsapp-share-button` inline no HTML** (`Site/index.html` linhas 41-51)
  Mover o bloco `<style>` do `<head>` para `Site/css/site.css`.

---

## Infraestrutura

- [ ] **Validacao do `poesias.json` no CI (GitHub Actions)**
  O projeto recebe PRs frequentes adicionando frases. Criar um JSON Schema e uma GitHub Action para validar automaticamente que novas entradas tem os campos obrigatorios (`estrofe`, `poesia`, `poeta`, `youtubeId`, `startTime`).
