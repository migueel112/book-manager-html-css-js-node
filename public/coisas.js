// Seleciona elementos do DOM (Document Object Model) pelos seus IDs
const startButton = document.getElementById('startButton');
const menuAposClique = document.getElementById('menuAposClique'); // Botão de menu que aparece após o clique
const viewBooksForm = document.getElementById('viewBooksForm');
viewBooksForm.style.display = 'none'; // Esconde o formulário de visualização de livros inicialmente
const deleteBookForm = document.getElementById('deleteBookForm');
deleteBookForm.style.display = 'none'; // Esconde o formulário de deletar livros inicialmente

// Adiciona um ouvinte de evento ao botão de início
startButton.addEventListener('click', function() {
    const startButton = document.getElementById('startButton');
    startButton.style.display = 'none'; // Esconde o botão de início
    menuAposClique.style.display = 'block'; // Mostra o menu após o clique
});

// Seleciona elementos para adicionar livros
const addBookButton = document.getElementById('addBookButton');
const addBookForm = document.getElementById('addBookForm');

// Ao clicar em "Adicionar Livro", mostra o formulário e esconde o menu
addBookButton.addEventListener('click', function() {
    const menuAposClique = document.getElementById('menuAposClique');
    const addBookForm = document.getElementById('addBookForm');
    menuAposClique.style.display = 'none';
    addBookForm.style.display = 'block';
})

// Seleciona o botão de salvar livro
const salvarlivro = document.getElementById('salvarlivro');

// Ao clicar em salvar, pega os valores do formulário, cria um objeto livro e envia para o backend
salvarlivro.addEventListener('click', function() {
    const bookName = document.getElementById('bookName').value;
    const authorName = document.getElementById('authorName').value;
    const releaseDate = document.getElementById('releaseDate').value;
    const editoraname = document.getElementById('editoraname').value;

    const livro = { 
      bookName: bookName,
      authorName: authorName,
      releaseDate: releaseDate,
      editoraname: editoraname
    };
    alert('Livro adicionado com sucesso!'); // Alerta de sucesso
    console.log(livro); // Mostra o objeto no console
    fetch('/livros', { // Envia uma requisição HTTP POST para o endpoint '/livros'.
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // O cabeçalho 'Content-Type' informa que o corpo está no formato JSON.
        },
        body: JSON.stringify(livro) // O corpo da requisição contém o objeto 'livro' convertido para JSON. //body para enviar dados ao corpo da rquisicao
    })
    menuAposClique.style.display = 'block'; // Mostra o menu novamente
    addBookForm.style.display = 'none'; // Esconde o formulário
});

// Botão para visualizar livros
const viewBooksButton = document.getElementById('viewBooksButton');
viewBooksButton.addEventListener('click', function() {
  menuAposClique.style.display = 'none';
  const viewBooksForm = document.getElementById('viewBooksForm');
  viewBooksForm.style.display = 'block';
  // Faz uma requisição GET para obter a lista de livros do backend
  fetch('/livros')
    .then(res => res.json()) // Converte a resposta para JSON
    .then(resp => {
      const bookList = document.getElementById('bookList');
      bookList.innerHTML = ''; // Limpa a lista antes de adicionar os livros
      resp.forEach(livro => {
        const li = document.createElement('li');
        // Monta o texto do livro com nome, autor, data de lançamento e editora
        li.textContent = `${livro.bookName} - ${livro.authorName} - ${livro.releaseDate} - ${livro.editoraname}`;
        bookList.appendChild(li); // Adiciona o item à lista
      });
  });
});

// Botão para voltar ao menu a partir da visualização de livros
const VoltaraoMenuVerLivros = document.getElementById('VoltaraoMenuVerLivros');
VoltaraoMenuVerLivros.addEventListener('click', function() {
    const viewBooksForm = document.getElementById('viewBooksForm');
    const menuAposClique = document.getElementById('menuAposClique');
    viewBooksForm.style.display = 'none';
    menuAposClique.style.display = 'block';
});

// Botão para voltar ao menu a partir do formulário de adicionar livro
const VoltaraoMenuaddlivro = document.getElementById('VoltaraoMenuaddlivro');
VoltaraoMenuaddlivro.addEventListener('click', function() {
    const addBookForm = document.getElementById('addBookForm');
    const menuAposClique = document.getElementById('menuAposClique');
    addBookForm.style.display = 'none';
    menuAposClique.style.display = 'block';
});

// Botão para voltar ao menu a partir do formulário de deletar livro
const VoltaraoMenuExcluirlivro = document.getElementById('Voltaraomenudeletarlivro');
VoltaraoMenuExcluirlivro.addEventListener('click', function() {
    const deleteBookForm = document.getElementById('deleteBookForm');
    const menuAposClique = document.getElementById('menuAposClique');
    deleteBookForm.style.display = 'none';
    menuAposClique.style.display = 'block';
});

// Botão para abrir o formulário de deletar livro
const deleteBookButton = document.getElementById('deleteBookButton');
deleteBookButton.addEventListener('click', function() {
  const menuAposClique = document.getElementById('menuAposClique');
  menuAposClique.style.display = 'none';
  const deleteBookForm = document.getElementById('deleteBookForm');
  deleteBookForm.style.display = 'block';
});

// Botão para confirmar a exclusão do livro
const confirmardeletar = document.getElementById('confirmardeletar');
confirmardeletar.addEventListener('click', function() {
  const bookName = document.getElementById('nomedeletar').value;
  if (!bookName) return;
  fetch('/livros', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookName })
  })
  .then(res => res.json())
  .then(result => {
    if (result.success) {
      alert('Livro excluído com sucesso!');
    } else {
      alert('Livro não encontrado');
    }
    menuAposClique.style.display = 'block'; // Mostra o menu novamente
    deleteBookForm.style.display = 'none'; // Esconde o formulário
  })
});