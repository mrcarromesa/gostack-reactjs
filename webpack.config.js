// como o webpack é executado pelo próprio node temos acesso as variaveis do node:

const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'), // arquivo de entrada, o primeiro arquivo js que será executado na aplicação
  
  // Qual arquivo será gerado após ser convertido
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'), //caminho para o diretorio publico
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
