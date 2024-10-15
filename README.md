VIAGEM 365

Este projeto é uma aplicação React desenvolvida com Vite.
O objetivo da aplicação é utilizar para usuários compartilhar localizações.

As principais funcionalidades são:

Criação de usuário.
Login/autenticação.
Página principal com a demonstração da quantidade de usuários no sistema, quantidade de Locais cadastrados e os locais cadastrados pelos usuários.
Cada usuário poderá cadastrar, editar e excluir suas localizações.
Há segunraça nas rotas do sistema, impossibilitando o acesso sem que o usuário esteja autenticado.

-----------------------------------------------------------------------------------------------------------------------------------------

-- Para preparar o sistema para executá-lo, deve-se seguir os seguintes passos:

Ao abrir os arquivos no vsCode, instalar:

npm install  -> para instalar as dependências do projeto.

npm install -g json-server -> Para instalar um servidor 'local' para poder cadastrar e consultar usuários e destinos.

npm i react-router-dom -> Para instalar a biblioteca de Rotas e conseguir navegar entre elas.

npm install uuid -> Para instalar a geração de token para a autenticação do usuário.

npm install leaflet react-leaflet

npm install leaflet-defaulticon-compatibility



-- Para executar o sistema, deve-se:

No terminal do vsCode, executar o comando:

json-server --watch db.json --port 3000

Desta forma inciar o servidor local na porta 3000 e assim o sistema terá acesso ao db.json, arquivo programado para armazenar os dados dos usuários cadastrados e destinos onde os usuários podem consultar,editar e excluir os destinos.


No terminal do computador, acessar o WIN + R, pesquisar por CMD, navegar até a pasta dos arquivos do projeto e executar o comando:

npm run dev

O sistema irá ficar disponível para acesso na porta 5000.

-----------------------------------------------------------------------------------------------------------------------------------------

Para utilizar o sistema, Basta ir ao navegador e digitar:

http://localhost:5000

ou seu ip :5000 (para acessar em dispositivos conectados a mesma ree da máquina que incializou os sitema.)

Exemplo:

http://192.168.1.100:5000 


Ao acessar o link será direcionado a página de login. 
O sistema requer e-mail e senha do usuário cadastrado.

Caso não tenha cadastro, há um botão presente que redireciona para uma página de registro onde o usuário deve fornecer:

nome
sexo
cpf
aniversario
email
password

Ao preencher os campos, o usuário poderá efetuar o login.
Ao Efetuar o login, um token é gerado e fica válido o LocalStorage até o momento em que o usuário clica para sair do sistema.
Desta forma garante que os usuários só terão acesso as outras páginas/rotas se estiverem autenticados no sistema.

-----------------------------------------------------------------------------------------------------------------------------------------

Ao efetuar o Login no sistema, abrirá a página/rota Home.

Para todas as rotas o sistema importa os components Header (cabeçalho) e Footer (Rodapé) padrão.

No Header apresenta os botões:


-- Página Inicial:

Apresenta o totalizador de usuários cadastrados e outro com os destinos cadastrados.
Logo abaixo, apresenta todos os destinos cadastrados pelos usuários.

Mostrando o nome definido pelo usuário, Nome da Rua, Cidade, Estado, País, Latitude, Longitude.


-- Cadastrar Destino:

Redireciona para a página/Rota Destinos.

Onde o usuário pode cadastrar um novo Destino. Nesta página foram usadas duas APIs.

https://viacep.com.br  e https://api.opencagedata.com

Nesta página o usuário pode localizar as informações pelo CEP ou Latitude e Logitude.
Ao localizar, São preenchida as informações de:

Rua, Cidade, Estado e País.

Ao validar se o endereço está correto, basta clicar em Cadastrar.


-- Meus Destinos:

Redireciona para a página/rota de Meus-Destinos.

Nesta página o usuário visualiza os destinos que cadastrou e pode excluí-los ou editá-los.

Ao clicar em excluir, o destino é removido.

Ao clicar em Editar, redireciona para uma página/rota de Editar-Destino:

Nesta página é possível realizar a edição dos campos de:

Nome, CEP, Rua, Cidade, Estado, País.

Ao realizar a alteração, basta clicar no botão Atualizar para concluir a alteração.


Obs: Os dados editados e/ou excluídos são refletidos na página inicial e na página Meus-Destinos.


-- Sair:

Ao clicar em sair, o sistema redireciona para a página de login e limpa o localStorage para garatir a segurança do Token, impossibilitando acessar as rotas novamente sem que efetue um novo login.



Por fim, no Footer apresenta somente direitos autorais.





