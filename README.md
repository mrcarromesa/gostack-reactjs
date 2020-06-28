# Criando um projeto React do total zero

- Continuação de [Criando um projeto React do total zero](https://github.com/mrcarromesa/gostack-babel-webpack)

---

## React

### Componentização

- Podemos quebrar nosso código em várias partes para serem reaproveitadas

- No react utilizamos muito isso, basicamente no react tudo é um component que podemos reaproveitar em qualquer tela


- Dentro do arquivo `public/index.html` tem uma div id app, é dentro dela que irá todo o código gerado pelo react

---

## Primeiro component

- Sempre que criamos um component no react precisamos iniciar a primeira letra em maíuscula para o js diferenciar de um componente nativo do html e o react funcionar normalmente.

- Toda function que possuí componente deve ter o React importado.

- Crie o arquivo `src/App.js`:

```js
import React from 'react';

function App() {
  return <h1>Hello World!</h1>
}

export default App;
```

- No arquivo `src/index.js` altera para o seguinte conteúdo:

```js
import React from 'react';
import { render } from 'react-dom';

import App from './App';

render(<App />, document.getElementById('app'));

```

- Executar o comando:

```bash
yarn webpack-dev-server --mode development
```

- Então esse é o conceito de componentização utilizamos function que retorna um JSX e podemos re-utilizar em vários lugares da aplicação.

- Um exemplo um pouco melhor:

- Crie o arquivo `src/compoents/Header.js`:

```js
import React from 'react';

export default function Header() {
  return (
    <header>
      <h1>ReactJS</h1>
    </header>
  );
};

```

- Importe ele no arquivo `src/App.js`:

```js
import React from 'react';
import Header from './components/Header';

function App() {
  return <Header/>
}

export default App;
```

- Dessa forma eu posso utilizar o `Header` onde eu precisar e quantas vezes for necessário

---

## Fragment

- Quando precisamos envolver mais de um elemnto e não precisar utilizar uma div para embrulhar eles por exemplo, para isso utilizamos:

```js
<>
  <Header />
  <Header />
  <Header />
</>
```

---

## Propriedades

- Podemos passar propriedades entre componentes utilizando esse recurso

- Por exemplo caso queiramos personalizar o titulo do Header podemos utilizar esse recurso de propriedades...

- No arquivo `src/App.js` ajustamos para:

```js
import React from 'react';
import Header from './components/Header';

function App() {
  return (
  <>
    <Header title="React" />
    <Header title="Props" />
  </>
  )
}

export default App;
```

- Note que estamos passando a propriedade `title` dentro do componente `Header`:

- Agora para sutir algum efeito precisamos receber o essa propriedade no componente `Header`:

```js
import React from 'react';

export default function Header({title}) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

```

- Primeiro desetruturamos as props que são recebidas na function do componente e adicionamos esse javascript dentro do JSX utilizando `{` e `}`


- Outra props que podemos utilizar é o children, ou seja tudo que passamos entre o `<Component>CHILDREN_AQUI</Component>`

- Exemplo no arquivo `src/App.js`:

```js
import React from 'react';
import Header from './components/Header';

function App() {
  return (
  <>
    <Header title="React">
      <ul>
        <li>Item1</li>
        <li>Item2</li>
      </ul>
    </Header>
    <Header title="Props">
      <ul>
        <li>Item1</li>
        <li>Item2</li>
        <li>Item3</li>
      </ul>
    </Header>
  </>
  )
}

export default App;
```

- No arquivo `src/components/Header.js` adicionamos:

```js
import React from 'react';

export default function Header({title, children}) {
  return (
    <header>
      <h1>{title}</h1>
      {children}
    </header>
  );
};

```

- a propriedade children recebe todo o conteúdo da tag `<Header>`


---

## Estado e Imutabilidade

- Utilizamos o `useState` para armazenar estados na aplicação, alterar valores de dentro dos componentes exemplo no arquivo `src/App.js`:

```js
import React, {useState} from 'react';
import Header from './components/Header';

function App() {

  const [projects, setProjects] = useState([]);

  // desestruturação do estado
  // 1 - a variavel no seu estado original
  // 2 - Função para alterar o estado

  function handleAddProject() {
    setProjects([...projects, `New Project ${new Date().getTime()}`]);
  }

  return (
  <>
    <Header title="React" />
    <ul>
      {projects.map((p) => <li key={p}>{p}</li>)}
    </ul>
    <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
  </>
  )
}

export default App;
```

- Imutabilidade no React, por uma questão de performace, e desempenho não posso alterar uma variavel que será renderizada na dom de forma direta, para realizar essa alteração precisamos utilizar o `useState` a utilização de estado, para alterar o valor da variavel e a cada alteração ele renderiza a DOM.

---

## CSS e Imagens no webpack

- Primeiro precisamos instalar 2 pacotes:

```bash
yarn add style-loader css-loader
```

- precisamos adicionar mais uma regra no `webpack.config.js`:

```js
{
  test: /\.css$/,

  exclude: /node_modules/,
  
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
    },
  ],
  
},
```

- Por fim precisamos executar novamente o comando do webpack:

```bash
yarn webpack-dev-server --mode develop
```

- Crie agora o arquivo `src/App.css`

- No arquivo `App.js` importamos o arquivo de css que criamos:

```js
import './App.css';

```

- Ao acessarmos o projeto no browser podemos ver que o css foi adicionado na tag `style` dentro do `head`, isso é o que faz o `syle-loader`

---

#### Dica para acelerar o processo webpack

- Para não precisar ficar digitando o comando do weback toda vez, podemos adicionar ao `package.json` dentro da chave `"scripts"`:

```json
"scripts": {
  "dev": "webpack-dev-server --mode development",
  "build": "webpack --mode production"
},
```

- E quando precisarmos executar o webpack novamente podemos executar apenas:

```bash
yarn dev
```

---

## Adicionar o Loader de imagens

- Instale as dependencias:

```bash
yarn add file-loader
```

- O `file-loader` será utilizado para carregar arquivos dentro da aplicação

- E agora precisamos adicionar a configuração no `webpack.config.js`:

```js
{
  test: /.*\.(gif|png|jpe?g)$/i,
  use: {
    loader: 'file-loader',
  },
},
```

- Toda vez que realizamos alteração nas configurações do `webpack` precisamos reinicar

- Adicionamos uma imagem chamada `background.jpg` dentro de `src/assets/`,

- Por fim no arquivo `App.js` adicionamos a imagem:

```js
import background from './assets/background.jpg';

//...

<img width={300} src={background} alt="background" />
```

---

## Obter dados de uma API

- Inicialmente instalar a dependencia:

```bash
yarn add axios
```

- Criar o arquivo `src/services/api.js`:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
```

- No arquivo `src/App.js` adicionamos a importação da api:

```js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';

import api from './services/api';

import './App.css';

// import background from './assets/background.jpg';

function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then((response) => {
      setProjects(response.data);
    });
  }, []);

  // desestruturação do estado
  // 1 - a variavel no seu estado original
  // 2 - Função para alterar o estado

  function handleAddProject() {
    setProjects([...projects, `New Project ${new Date().getTime()}`]);
  }

  return (
  <>
    <Header title="React" />
    { /* <img width={300} src={background} alt="background" /> */ }
    <ul>
      {projects.map((p) => <li key={p.id}>{p.title}</li>)}
    </ul>
    <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
  </>
  )
}

export default App;
```

---

### Ajuste para o babel async await

- Ajuste o arquivo `babel.config.js`:

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: "current",
        },
      },

    ],
    '@babel/preset-react',
  ],
};

```

- Ou podemos instalar o seguinte:

```bash
yarn add @babel/plugin-transform-runtime -D
```

- No arquivo `babel.config.js` ajustar para:

```js
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],

  plugins: ["@babel/plugin-transform-runtime"],
};

```