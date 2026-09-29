# Desafio ST1

Aplicação web desenvolvida como desafio, construída com React e com integração a uma API.

🔗 **Demo:** [desafio-st1.vercel.app](https://desafio-st1.vercel.app)

> ✏️ *Complete esta seção com 2 ou 3 frases explicando o que o projeto faz, qual problema resolve e o que era pedido no desafio.*

---

## 🧰 Tecnologias

**Front-end**
- [React 19](https://react.dev/)
- [Less](https://lesscss.org/) (estilização, via `craco-less` e `less-loader`)
- [Font Awesome](https://fontawesome.com/) (ícones)
- [Axios](https://axios-http.com/) (requisições HTTP)

**Back-end / servidor**
- [Node.js](https://nodejs.org/)
- [Express 5](https://expressjs.com/)
- [CORS](https://github.com/expressjs/cors)
- [dotenv](https://github.com/motdotla/dotenv) (variáveis de ambiente)

**Build e ferramentas**
- [CRACO](https://craco.js.org/) (configuração do build)
- [Vite](https://vite.dev/) (com `@vitejs/plugin-react`)
- [ESLint 9](https://eslint.org/)

**Deploy**
- [Vercel](https://vercel.com/)

---

## 🚀 Como rodar o projeto

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Git](https://git-scm.com/)

```bash
node -v
```

### 2. Clonando o repositório

```bash
git clone https://github.com/codariadev/desafio-st1.git
cd desafio-st1
npm install
```

### 3. Variáveis de ambiente

O projeto usa um arquivo `.env` na raiz. Confira quais variáveis são necessárias e configure os valores no seu ambiente local.

> ⚠️ **Atenção:** o arquivo `.env` está versionado no repositório. Se ele contiver chaves, tokens ou senhas, remova-o do Git, adicione-o ao `.gitignore` e troque essas credenciais. Para o projeto, prefira manter um `.env.example` só com os nomes das variáveis, sem valores reais.

### 4. Executando

```bash
npm start
```

A aplicação abrirá no navegador (por padrão em [http://localhost:3000](http://localhost:3000)).

---

## 📜 Scripts disponíveis

| Comando | O que faz |
| --- | --- |
| `npm start` | Inicia o ambiente de desenvolvimento (CRACO) |
| `npm run build` | Gera a versão de produção na pasta `build` |
| `npm test` | Executa os testes |

---

## 📁 Estrutura do projeto

```
desafio-st1/
├── build/            # Versão de produção gerada
├── public/           # Arquivos estáticos
├── src/              # Código-fonte da aplicação
├── .env              # Variáveis de ambiente
├── craco.config.cjs  # Configuração do CRACO
├── eslint.config.js  # Configuração do ESLint
├── index.html        # HTML base
├── vite.config.js    # Configuração do Vite
└── package.json
```

---

## 👤 Autor

**CodariaDev** ([@codariadev](https://github.com/codariadev))
