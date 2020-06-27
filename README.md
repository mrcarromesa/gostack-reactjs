# Criando um projeto React do total zero

- Iniciar um projeto:

```bash
yarn init -y
```

- Criar uma pasta `src`

- Criar uma pasta `public`

- Instalar o react e o react-dom:

```bash
yarn add react react-dom
```

- Criar o arquivo `public/index.html`

- Não podemos sair inserindo html diretamente no js, para isso precisamos do `babel`

---

## Babel

- Converte ou transpila o código do React para que o browser entenda

---

## Webpack

- Para cada tipo de arquivo seja ele js, css ou imagem ele converte o código de uma maneira diferente.
- Por exemplo no caso do js ele irá utilizar o babel

- Loaders é utilizado pelo Webpack, irá carregar os arquivos de uma forma que o browser entenda, no caso temos o:

  - babel-loader: carregar o js
  - css-loader: carregar o css
  - image-loader: carregar as imagens

---

## Adicionando as dependencias:

- Adicione as seguintes dependencias:

```bash
yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli
```

- Na raiz do projeto adicionamos o arquivo `babel.config.js`
- Na documentação do babel tem mais explicações de como utilizar as configurações [Configure Babel](https://babeljs.io/docs/en/configuration)
- Nesse arquivo ficará a maneira de como o código js deve ser convertido para que o browser entenda
- Nele adicionamos os `presets` que são conjuto de configurações criadas por outros desenvolvedores os quais podemos reaproveitar na nossa aplicação, por enquanto iremos utilizar os dois que instalamos:

- @babel/preset-env -> converte o código baseado no ambiente, por exemplo poderimos especificar que o nosso código deve ser entendido para o ie10.

- @babel/preset-react -> Permite utilizar o JSX

---

## Para utilizar comandos babel na linha de comando utilize a seguinte dependencia:

```bash
yarn add @babel/cli
```

- Agora podemos criar um arquivo `src/index.js` e adicionar uma arrow function o qual não é entendido por alguns browser:

```js
const soma = (a,b) => {
  return a + b;
}

console.log(soma(1,3));
```

- Agora tentamos converte o arquivo utilizando o comando:

```bash
yarn babel src/index.js --out-file public/bundle.js
```

- Esse comando irá gerar um arquivo convertido `public/bundle.js`

---

## Webpack

Utilizamos o webpack para realizar o processo de automatização no carregamento e conversão de arquivos,
por exemplo ao carregar arquivos js o weback irá utilizar o loader do babel, ao carregar arquivo css irá utilizar um css loader e assim por diante, e para isso precisamos configurar como o webpack irá se comportar com essa automatização.

- Crie um arquivo chamado `webpack.config.js`:

```js
// como o webpack é executado pelo próprio node temos acesso as variaveis do node:

const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'), // arquivo de entrada, o primeiro arquivo js que será executado na aplicação
  
  // Qual arquivo será gerado após ser convertido
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },

  // Adicionar regras, para arquivo js utilizar o babel
  // para outros arquivos precisamos utilizar outros loaders
  module: {
    rules: [
      {
        // test propriedade obrigatoria recebe uma expressao regular
        // Utilizamos o `$` para indicar que o arquivo deve terminar com essa extensao e mais nada após isso 
        test: /\.js$/,
        // Devemos excluir a pasta node_modules, pois isso não é atribuição desse webpack
        exclude: /node_modules/, 

        // Qual loader iremos utilizar para arquivos js?
        use: {
          loader: 'babel-loader',
        },
      }
    ]
  },
};

```

- Como iremos lidar com loaders precisamos instala-los...

- Loader do babel:

```bash
yarn add babel-loader
```

- Agora com a parte de js configurada podemos executar o comando:

```bash
yarn webpack --mode development
```

- Após executar esse comando verificamos que o webpack gerou o arquivo `public/bundle.js` com um monte de código, porém não precisamos nos ater a isso, pois isso são as próprias functions e configurações do webpack que ele irá utilizar para importar/exportar arquivo e assim por diante.

- Por exemplo podemos criar um arquivo `src/soma.js`

```js
export const soma = (a,b) => {
  return a + b;
}
```

- E importamos no arquivo `src/index.js`:

```js
import { soma } from './soma';

console.log(soma(1,3));
```

- E executamos o comando:

```bash
yarn webpack --mode development
```

- Podemos ver na saída do comando que ele consegue converter certinho os arquivos e gerar o `public/bundle.js`


- Um probelma é que caso alteremos algo em algum arquivo e executemo ele, ele ainda virá com o resultado antigo, então precismos que o webpack monitore o arquivo e a cada alteração compile esse código novamente.

---

### Webpack monitorar alterações

- Inicialmente instale o seguinte:

```bash
yarn add webpack-dev-server -D
```

- Por fim no arquivo `webpack.config.js` adicionamos o seguinte para que o webpack fique monitorando por alterações:

```js
{
  //...
  devServer: {
    contentBase: path.resolve(__dirname, 'public'), //caminho para o diretorio publico
  },
};
```

- Feito isso podemos executar o comando:

```bash
yarn webpack-dev-server --mode development
```

- Feito isso ele nos dará um endereço para acessarmos que será live reload, a cada alteração ele dá reload automático na página

---

## React

### Componentização

- Podemos quebra nosso código em várias partes para serem reaproveitadas

- No react utilizamos muito isso, basicamente no react tudo é um component que podemos reaproveitar em qualquer tela
