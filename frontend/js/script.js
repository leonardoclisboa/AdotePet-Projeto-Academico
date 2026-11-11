// frontend/js/script.js
// Lógica simples e direta de comunicação do Front-End com a API (Fetch)

const API = '/api';

// ----------------------------------------------------
// 1. GERENCIAR USUÁRIO LOGADO NO NAVEGADOR
// ----------------------------------------------------
function obterUsuarioLogado() {
  const usuario = localStorage.getItem('usuario_logado');
  return usuario ? JSON.parse(usuario) : null;
}

function atualizarMenu() {
  const areaMenu = document.getElementById('user-nav-actions');
  if (!areaMenu) return;

  const usuario = obterUsuarioLogado();

  if (usuario) {
    areaMenu.innerHTML = `
      <span style="font-weight: 600; color: var(--primary);">Olá, ${usuario.nome}</span>
      <a href="cadastrar-animal.html" class="btn btn-primary btn-sm">+ Cadastrar Pet</a>
      <button onclick="sair()" class="btn btn-outline btn-sm">Sair</button>
    `;
  } else {
    areaMenu.innerHTML = `
      <a href="login.html" class="btn btn-outline btn-sm">Entrar</a>
      <a href="cadastro.html" class="btn btn-primary btn-sm">Cadastrar</a>
    `;
  }
}

function sair() {
  localStorage.removeItem('usuario_logado');
  alert('Você saiu da sua conta.');
  window.location.href = 'index.html';
}

// ----------------------------------------------------
// 2. READ: CONSULTAR E LISTAR ANIMAIS NA TELA
// ----------------------------------------------------
async function listarAnimais(filtroEspecie = 'todos') {
  const container = document.getElementById('pets-container');
  if (!container) return;

  try {
    const resposta = await fetch(`${API}/animais`);
    const animais = await resposta.json();

    let listaFiltrada = animais;
    if (filtroEspecie !== 'todos') {
      listaFiltrada = animais.filter(animal => animal.especie.toLowerCase() === filtroEspecie.toLowerCase());
    }

    if (listaFiltrada.length === 0) {
      container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Nenhum animal cadastrado no momento.</p>';
      return;
    }

    container.innerHTML = '';
    listaFiltrada.forEach(animal => {
      const card = document.createElement('article');
      card.className = 'pet-card';
      card.innerHTML = `
        <div class="pet-card-image">
          <img src="${animal.foto}" alt="${animal.nome}">
          <span class="pet-badge">${animal.especie}</span>
        </div>
        <div class="pet-card-body">
          <h3 class="pet-name">${animal.nome}</h3>
          <div class="pet-tags">
            <span class="pet-tag">⏱️ ${animal.idade}</span>
            <span class="pet-tag">📏 Porte ${animal.porte}</span>
          </div>
          <p class="pet-description">${animal.descricao}</p>
          <div class="pet-card-footer">
            <a href="detalhes.html?id=${animal.id}" class="btn btn-secondary btn-sm" style="flex: 1;">Ver Detalhes</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

  } catch (erro) {
    console.error('Erro ao listar animais:', erro);
    container.innerHTML = '<p style="color: red; text-align: center;">Erro ao carregar dados do banco.</p>';
  }
}

// ----------------------------------------------------
// 3. READ: CARREGAR DETALHES DE UM ANIMAL POR ID
// ----------------------------------------------------
async function carregarDetalhes() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (!id) {
    window.location.href = 'animais.html';
    return;
  }

  try {
    const resposta = await fetch(`${API}/animais/${id}`);
    const animal = await resposta.json();

    document.getElementById('detalhe-nome').innerText = animal.nome;
    document.getElementById('detalhe-especie').innerText = animal.especie;
    document.getElementById('detalhe-idade').innerText = animal.idade;
    document.getElementById('detalhe-porte').innerText = animal.porte;
    document.getElementById('detalhe-descricao').innerText = animal.descricao;
    document.getElementById('detalhe-foto').src = animal.foto;

    // REGRA DE SEGURANÇA: Só exibe botões se o usuário estiver logado E for o dono do animal
    const usuario = obterUsuarioLogado();
    const containerAcoes = document.getElementById('acoes-dono');

    if (containerAcoes) {
      if (usuario && usuario.id === animal.usuario_id) {
        containerAcoes.innerHTML = `
          <div style="margin-top: 1.5rem; display: flex; gap: 0.5rem;">
            <a href="cadastrar-animal.html?editar=${animal.id}" class="btn btn-outline btn-sm">✏️ Editar</a>
            <button onclick="excluirAnimal(${animal.id})" class="btn btn-danger btn-sm">🗑️ Excluir</button>
          </div>
        `;
      } else {
        containerAcoes.innerHTML = ''; // Não mostra botões para visitantes ou outros usuários
      }
    }
  } catch (erro) {
    console.error('Erro ao carregar detalhes:', erro);
  }
}

// ----------------------------------------------------
// 4. CREATE E UPDATE: SALVAR ANIMAL (CADASTRAR OU EDITAR)
// ----------------------------------------------------
async function salvarAnimal(evento) {
  evento.preventDefault();

  const usuario = obterUsuarioLogado();
  if (!usuario) {
    alert('Você precisa fazer login para cadastrar um animal!');
    window.location.href = 'login.html';
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const idEdicao = urlParams.get('editar');

  const dados = {
    nome: document.getElementById('nome').value,
    especie: document.getElementById('especie').value,
    idade: document.getElementById('idade').value,
    porte: document.getElementById('porte').value,
    descricao: document.getElementById('descricao').value,
    foto: document.getElementById('foto').value,
    usuario_id: usuario.id
  };

  try {
    let url = `${API}/animais`;
    let metodo = 'POST';

    if (idEdicao) {
      url = `${API}/animais/${idEdicao}`;
      metodo = 'PUT';
    }

    const resposta = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();
    alert(resultado.mensagem);

    if (resposta.ok) {
      window.location.href = 'animais.html';
    }

  } catch (erro) {
    console.error('Erro ao salvar animal:', erro);
    alert('Erro ao comunicar com o servidor.');
  }
}

// Preenche o formulário se estiver no modo de edição
async function checarModoEdicao() {
  const usuario = obterUsuarioLogado();
  if (!usuario) {
    alert('Você precisa estar logado para acessar esta página!');
    window.location.href = 'login.html';
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const idEdicao = urlParams.get('editar');

  if (idEdicao) {
    document.getElementById('form-titulo').innerText = 'Editar Animal';
    document.getElementById('btn-submit-animal').innerText = 'Salvar Alterações';

    const resposta = await fetch(`${API}/animais/${idEdicao}`);
    const animal = await resposta.json();

    // Se o animal não pertencer ao usuário logado, impede a edição
    if (animal.usuario_id !== usuario.id) {
      alert('Você não tem permissão para editar este animal!');
      window.location.href = 'animais.html';
      return;
    }

    document.getElementById('nome').value = animal.nome;
    document.getElementById('especie').value = animal.especie;
    document.getElementById('idade').value = animal.idade;
    document.getElementById('porte').value = animal.porte;
    document.getElementById('descricao').value = animal.descricao;
    document.getElementById('foto').value = animal.foto;
  }
}

// ----------------------------------------------------
// 5. DELETE: EXCLUIR ANIMAL (APENAS O DONO PODE EXCLUIR)
// ----------------------------------------------------
async function excluirAnimal(id) {
  const usuario = obterUsuarioLogado();
  if (!usuario) {
    alert('Você precisa estar logado para excluir um animal!');
    return;
  }

  const confirmou = confirm('Tem certeza que deseja excluir este animal do banco de dados?');
  if (!confirmou) return;

  try {
    // Envia o usuario_id para o backend conferir se ele é o dono
    const resposta = await fetch(`${API}/animais/${id}?usuario_id=${usuario.id}`, {
      method: 'DELETE'
    });

    const resultado = await resposta.json();
    alert(resultado.mensagem);

    if (resposta.ok) {
      window.location.href = 'animais.html';
    }
  } catch (erro) {
    console.error('Erro ao excluir:', erro);
    alert('Erro ao excluir animal.');
  }
}

// ----------------------------------------------------
// 6. CADASTRO DE USUÁRIO
// ----------------------------------------------------
async function cadastrarUsuario(evento) {
  evento.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmacao = document.getElementById('confirmacaoSenha').value;

  if (senha !== confirmacao) {
    alert('As senhas não são iguais!');
    return;
  }

  try {
    const resposta = await fetch(`${API}/usuarios/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    const resultado = await resposta.json();
    alert(resultado.mensagem);

    if (resposta.ok) {
      window.location.href = 'login.html';
    }
  } catch (erro) {
    alert('Erro ao cadastrar usuário.');
  }
}

// ----------------------------------------------------
// 7. LOGIN DE USUÁRIO
// ----------------------------------------------------
async function loginUsuario(evento) {
  evento.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const resposta = await fetch(`${API}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      localStorage.setItem('usuario_logado', JSON.stringify(resultado.usuario));
      alert(`Bem-vindo, ${resultado.usuario.nome}!`);
      window.location.href = 'index.html';
    } else {
      alert(resultado.mensagem);
    }
  } catch (erro) {
    alert('Erro ao fazer login.');
  }
}

// Atualiza o menu superior quando o documento carregar
document.addEventListener('DOMContentLoaded', atualizarMenu);
