# Guia de Estudo - Apresentação do Projeto

Fiz esse resumo aqui pra gente não travar na hora que o professor apontar pro código e começar a perguntar o que cada coisa faz. Ele não gosta de enrolação, então se perguntar, é só falar direto e com segurança o que tá aqui embaixo.

---

## 1. React e Next.js (Hooks e Navegação)

* **`'use client'`**
  * **O que falar:** Avisa pro Next que essa página roda no navegador do usuário. A gente precisa colocar isso sempre que a tela tiver cliques de botão, campos digitáveis ou usar hooks como `useState` e `useEffect`.
  * **Onde tá:** Na primeira linha de todas as páginas que têm interação.

* **`useState`**
  * **O que falar:** É o estado da tela, funciona como uma variável na memória. Quando o valor dela muda (chamando a função `setAlgo`), o React atualiza a tela na hora com o valor novo.
  * **Exemplo nosso:** `const [pedidos, setPedidos] = useState([])` guarda a lista de pedidos que veio da API.

* **`useEffect`**
  * **O que falar:** Executa uma função automaticamente assim que a página carrega. A gente usou ele com o array vazio `[]` no final pra disparar o `fetch` que busca os dados da API logo de cara.

* **`useRouter`**
  * **O que falar:** Serve pra trocar de página pelo código JavaScript. A gente usou o `router.push('/pedidos')` pra mandar o usuário direto pra tela de pedidos logo depois que o formulário salva com sucesso.

* **`<Link href="...">`**
  * **O que falar:** É a tag de link nativa do Next.js. Ela troca de tela sem dar aquele reload completo no navegador igual a tag `<a>` comum faz, deixando a navegação instantânea.

---

## 2. Métodos de Lista e JavaScript (O que o Wagner tem mais carinha de perguntar)

* **`.map()`**
  * **O que falar:** Percorre um array e transforma cada item num elemento visual. No nosso projeto, ele pega cada objeto que veio da API e transforma numa linha `<tr>` de tabela ou num card.

* **`key={...}`**
  * **O que falar:** É um identificador único que o React exige em cada elemento dentro do `.map()`. Serve pro React saber exatamente qual linha foi alterada sem precisar redesenhar a lista inteira. A gente sempre usa o `id` que vem do banco (`key={cat.id}`).

* **`.find()`**
  * **O que falar:** Varre a lista e retorna o primeiro item que bater com a condição. A gente usou pra pegar o nome da categoria pelo ID dela no produto, e o nome do cliente pelo ID no pedido.

* **`.filter()`**
  * **O que falar:** Filtra o array e devolve uma nova lista só com quem atendeu ao critério. A gente usou pra duas coisas: pegar só os itens pertencentes àquele pedido específico, e pra remover um produto da lista temporária no formulário (`filter(item => item.produto_id !== id)`).

* **`.reduce()`**
  * **O que falar:** Acumula os valores de uma lista num resultado só. A gente usou pra somar o subtotal de todos os itens (`preco * quantidade`) e dar o valor final do pedido.

* **`[...lista].sort()`**
  * **O que falar:** O `[...]` tira uma cópia da lista e o `.sort()` ordena. A gente usou na tela de pedidos pra ordenar por ID decrescente (`b.id - a.id`), mostrando os pedidos mais novos no topo sem modificar o array original do estado.

* **`Array.isArray(dados)`**
  * **O que falar:** Confere se o retorno da API é realmente uma lista antes de jogar no estado. Se a API cair ou devolver uma mensagem de erro em objeto, essa verificação impede a aplicação de quebrar.

* **`Number(...)`**
  * **O que falar:** Converte texto pra número puro. Valores vindos de inputs ou parâmetros costumam vir como string, e se não converter, o JavaScript concatena em vez de somar.

* **`.toFixed(2)`**
  * **O que falar:** Trava o número com duas casas decimais. A gente usou na exibição de preços (ex: `19.9` vira `19.90`).

* **`.toLocaleString('pt-BR', ...)`**
  * **O que falar:** Formata o número direto pro padrão de moeda do Brasil, já colocando o símbolo `R$`, vírgula nos centavos e ponto nos milhares.

* **`setTimeout(...)`**
  * **O que falar:** É um temporizador do JavaScript. A gente usou pra esperar 1 segundo e meio antes de redirecionar pra tela de pedidos, dando tempo pro usuário ver o aviso de sucesso.

---

## 3. Requisições e API (Fetch e Async/Await)

* **`async / await`**
  * **O que falar:** O `async` avisa que a função mexe com dados externos e demorados. O `await` faz o código pausar naquela linha e esperar a resposta da API chegar antes de continuar.

* **`fetch('/api/...')`**
  * **O que falar:** É a função nativa do navegador pra fazer requisições HTTP (buscar com GET ou enviar com POST).

* **`Promise.all([...])`**
  * **O que falar:** Em vez de esperar uma requisição terminar pra começar a outra, ele dispara várias buscas na API ao mesmo tempo e espera todas juntas. Deixa o carregamento muito mais rápido.

* **`res.json()`**
  * **O que falar:** Pega a resposta em texto bruto da API e converte num objeto ou array JavaScript pra gente poder usar no código.

* **`try / catch / finally`**
  * **O que falar:** O `try` tenta rodar a busca dos dados; se der qualquer falha de conexão ou erro da API, o `catch` captura e mostra mensagem na tela; e o `finally` roda no final de tudo pra desligar o aviso de "Carregando...".

* **`method: 'POST'` e `JSON.stringify(...)`**
  * **O que falar:** O `POST` avisa a API que estamos enviando dados novos pra salvar no banco. O `JSON.stringify()` pega o nosso objeto JavaScript e converte num texto JSON padronizado pro backend entender.

* **`rewrites` no `next.config.mjs`**
  * **O que falar:** É um proxy interno do Next.js. Qualquer chamada que a gente faz pra `/api/...` ele redireciona por trás dos panos pro servidor do IFRO. A gente configurou isso pra não tomar erro de CORS no navegador.

---

## 4. Tags de Tabela (HTML)

Se ele apontar pra tabela e perguntar as tags, a explicação é direta:

* **`<table>`**: A estrutura principal da tabela.
* **`<thead>`**: Cabeça da tabela (onde ficam os títulos das colunas).
* **`<tbody>`**: Corpo da tabela (onde entram as linhas com os dados de verdade).
* **`<tr>`**: Linha da tabela (*Table Row*).
* **`<th>`**: Célula de cabeçalho (*Table Header*), já vem em negrito.
* **`<td>`**: Célula comum de dado (*Table Data*).

---

## 5. Formulário e Inputs (HTML)

* **`<select>` e `<option>`**: O menu suspenso (dropdown) pra escolher o cliente e o produto.
* **`<input type="number" min="1">`**: Campo exclusivo de números que bloqueia valores zerados ou negativos.
* **`onChange={(e) => setX(e.target.value)}`**: Pega o que foi digitado ou selecionado na hora e atualiza o estado correspondente.
* **`value={...}`**: Garante que o valor exibido no campo seja exatamente o que tá na nossa variável de estado.
* **`e.preventDefault()`**: Impede o comportamento padrão do navegador, que seria recarregar a página inteira ao enviar o formulário.
* **`disabled={salvando}`**: Desativa o botão enquanto a requisição tá salvando na API pra evitar clique duplo.

---

## 6. Lógica e Condições no JSX

* **`condicao && <Elemento />`**
  * **O que falar:** É um condicional direto. Se a condição for verdadeira, renderiza o elemento na tela; se for falsa, não mostra nada (usamos no aviso de carregando e nas mensagens de erro).

* **`condicao ? A : B` (Ternário)**
  * **O que falar:** Um if/else em uma linha só. Usamos por exemplo no texto do botão: se tiver salvando mostra `'Salvando...'`, senão mostra `'Salvar Pedido'`.

* **`valor || '-'`**
  * **O que falar:** Operador de fallback. Se o campo vier nulo ou vazio da API (como a descrição de algum produto), ele joga o traço `-` pra não ficar um buraco vazio na tabela.

* **Spread `...`**
  * **O que falar:** Operador pra clonar arrays ou objetos sem mexer no original (usamos pra copiar a lista de pedidos antes do sort e pra adicionar novos itens ao array).

---

## 7. Resumo das Nossas Páginas (Pra saber o fluxo geral)

* **Início (`/`)**: Tela com a apresentação da dupla e os cards de navegação pro restante do sistema.
* **Tabela de Categorias (`/categorias`)**: Consome `/api/categorias` e exibe o ID e Nome de cada categoria.
* **Tabela de Produtos (`/produtos`)**: Consome `/api/produtos` e `/api/categorias`. Cruza o ID da categoria pra mostrar o nome dela no lugar do código numérico, além de preço e estoque.
* **Tabela de Clientes (`/clientes`)**: Consome `/api/clientes` e exibe em tabela o nome, e-mail e telefone de cada um.
* **Lista de Pedidos (`/pedidos`)**: Carrega pedidos, clientes, produtos e itens. Para cada pedido, busca o nome do cliente e monta a tabela de itens correspondentes, somando o total geral via `.reduce()`.
* **Formulário de Novo Pedido (`/criar-pedido`)**: Puxa os clientes e produtos da API pros selects. O usuário escolhe o produto e a quantidade, adiciona na tabela temporária, e ao clicar em salvar, o sistema faz um POST em `/api/pedidos` e depois um POST em `/api/itens_pedido` pra cada produto da lista.
