// ========================================================
// PROJETO ACADÊMICO: AdotePet
// Arquivo: frontend/js/script.js
// Função: Comunicação assíncrona (Fetch API) entre Frontend e Backend
// Implementa: CRUD completo de animais, autenticação e validações
// ========================================================

const API_BASE = '/api';

/**
 * 1. GERENCIAMENTO DE SESSÃO DO USUÁRIO (localStorage)
 */
function obterUsuarioLogado() {
  const usuarioJson = localStorage.getItem('adotepet_usuario');
  if (!usuarioJson) return null;
  try {
    return JSON.parse(usuarioJson);
  } catch (e) {
    return null;
  }
}

function salvarUsuarioLogado(usuario) {
  localStorage.setItem('adotepet_usuario', JSON.stringify(usuario));
}

function encerrarSessao() {
  localStorage.removeItem('adotepet_usuario');
  mostrarToast('Você saiu da sua conta.', 'info');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

// Atualiza o menu de navegação de acordo com o status de login
function atualizarNavegacaoUsuario() {
  const containerAcoes = document.getElementById('user-nav-actions');
  if (!containerAcoes) return;

  const usuario = obterUsuarioLogado();

  if (usuario) {
    containerAcoes.innerHTML = `
      <span style="font-size: 0.9rem; font-weight: 600; color: var(--primary);">Olá, ${usuario.nome.split(' ')[0]}</span>
      <a href="cadastrar-animal.html" class="btn btn-primary btn-sm">+ Cadastrar Pet</a>
      <button onclick="encerrarSessao()" class="btn btn-outline btn-sm" title="Sair da conta">Sair</button>
    `;
  } else {
    containerAcoes.innerHTML = `
      <a href="login.html" class="btn btn-outline btn-sm">Entrar</a>
      <a href="cadastro.html" class="btn btn-primary btn-sm">Cadastrar</a>
    `;
  }
}

/**
 * 2. SISTEMA DE NOTIFICAÇÕES (TOAST FEEDBACK)
 */
function mostrarToast(mensagem, tipo = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo === 'error' ? 'error' : 'success'}`;
  toast.innerHTML = `
    <span>${tipo === 'error' ? '⚠️' : '✅'}</span>
    <div>${mensagem}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/**
 * 3. OPERAÇÃO READ: CONSULTAR ANIMAIS
 */
async function carregarAnimais(filtros = {}) {
  const container = document.getElementById('pets-container');
  const contador = document.getElementById('pet-counter');
  if (!container) return;

  container.innerHTML = `
    <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
      <p>Carregando animais disponíveis...</p>
    </div>
  `;

  try {
    const params = new URLSearchParams();
    if (filtros.especie && filtros.especie !== 'all') params.append('especie', filtros.especie);
    if (filtros.porte && filtros.porte !== 'all') params.append('porte', filtros.porte);
    if (filtros.busca) params.append('busca', filtros.busca);
    if (filtros.limit) params.append('limit', filtros.limit);

    const url = `${API_BASE}/animais?${params.toString()}`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (!dados.sucesso || dados.dados.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--surface-card); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
          <p style="font-size: 1.2rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.5rem;">Nenhum animal encontrado</p>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Tente ajustar os filtros ou cadastre um novo pet.</p>
          <a href="cadastrar-animal.html" class="btn btn-primary">Cadastrar Animal</a>
        </div>
      `;
      if (contador) contador.textContent = 'Nenhum animal no momento';
      return;
    }

    if (contador) {
      contador.textContent = `Mostrando ${dados.dados.length} ${dados.dados.length === 1 ? 'animal' : 'animais'}`;
    }

    container.innerHTML = dados.dados.map(animal => `
      <article class="pet-card">
        <div class="pet-card-image">
          <img src="${animal.foto}" alt="${animal.nome}" onerror="this.src='https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'">
          <span class="pet-badge">${animal.especie}</span>
        </div>
        <div class="pet-card-body">
          <div class="pet-card-header">
            <h3 class="pet-name">${animal.nome}</h3>
          </div>
          <div class="pet-tags">
            <span class="pet-tag">⏱️ ${animal.idade}</span>
            <span class="pet-tag">📏 Porte ${animal.porte}</span>
          </div>
          <p class="pet-description">${animal.descricao}</p>
          <div class="pet-card-footer">
            <a href="detalhes.html?id=${animal.id}" class="btn btn-secondary btn-sm" style="flex: 1;">Ver Detalhes</a>
          </div>
        </div>
      </article>
    `).join('');

  } catch (erro) {
    console.error('Erro ao buscar animais:', erro);
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--color-error);">
        <p>Não foi possível conectar ao banco de dados.</p>
        <p style="font-size: 0.85rem; color: var(--text-muted);">Certifique-se de que o backend está ativo e o MySQL conectado.</p>
      </div>
    `;
  }
}

/**
 * 4. OPERAÇÃO READ: CONSULTAR DETALHES DE UM ANIMAL
 */
async function carregarDetalhesAnimal() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    window.location.href = 'animais.html';
    return;
  }

  try {
    const resposta = await fetch(`${API_BASE}/animais/${id}`);
    const dados = await resposta.json();

    if (!dados.sucesso || !dados.animal) {
      mostrarToast('Animal não encontrado.', 'error');
      setTimeout(() => { window.location.href = 'animais.html'; }, 1500);
      return;
    }

    const animal = dados.animal;
    const usuarioLogado = obterUsuarioLogado();

    // Preenche elementos na página detalhes.html
    document.getElementById('detalhe-nome').textContent = animal.nome;
    document.getElementById('detalhe-especie').textContent = animal.especie;
    document.getElementById('detalhe-idade').textContent = animal.idade;
    document.getElementById('detalhe-porte').textContent = animal.porte;
    document.getElementById('detalhe-descricao').textContent = animal.descricao;
    document.getElementById('detalhe-foto').src = animal.foto;
    document.getElementById('detalhe-foto').alt = animal.nome;
    document.getElementById('detalhe-responsavel').textContent = animal.responsavel_nome || 'Voluntário AdotePet';

    // Se o usuário logado for o criador do registro, disponibiliza os botões de EDITAR e EXCLUIR
    const containerAcoesDono = document.getElementById('acoes-dono');
    if (containerAcoesDono && usuarioLogado && usuarioLogado.id === animal.usuario_id) {
      containerAcoesDono.innerHTML = `
        <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-light); display: flex; gap: 0.75rem;">
          <a href="cadastrar-animal.html?editar=${animal.id}" class="btn btn-outline btn-sm">✏️ Editar Informações</a>
          <button onclick="confirmarExclusaoAnimal(${animal.id}, '${animal.nome}')" class="btn btn-danger btn-sm">🗑️ Excluir Registro</button>
        </div>
      `;
    }
  } catch (erro) {
    console.error('Erro ao carregar detalhes do animal:', erro);
    mostrarToast('Erro ao carregar informações do animal.', 'error');
  }
}

/**
 * 5. OPERAÇÃO CREATE & UPDATE: CADASTRAR OU ALTERAR ANIMAL
 */
async function inicializarFormularioAnimal() {
  const form = document.getElementById('form-animal');
  if (!form) return;

  const usuario = obterUsuarioLogado();
  if (!usuario) {
    mostrarToast('Faça login para cadastrar ou editar um animal.', 'error');
    setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    return;
  }

  // Verifica se está em modo de EDIÇÃO (UPDATE)
  const params = new URLSearchParams(window.location.search);
  const idEdicao = params.get('editar');

  if (idEdicao) {
    document.getElementById('form-titulo').textContent = 'Editar Informações do Animal';
    document.getElementById('btn-submit-animal').textContent = 'Salvar Alterações';

    try {
      const resp = await fetch(`${API_BASE}/animais/${idEdicao}`);
      const dados = await resp.json();
      if (dados.sucesso && dados.animal) {
        const pet = dados.animal;
        form.nome.value = pet.nome;
        form.especie.value = pet.especie;
        form.idade.value = pet.idade;
        form.porte.value = pet.porte;
        form.descricao.value = pet.descricao;
        form.foto.value = pet.foto;
      }
    } catch (e) {
      console.error('Erro ao preencher dados para edição:', e);
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dadosAnimal = {
      nome: form.nome.value,
      especie: form.especie.value,
      idade: form.idade.value,
      porte: form.porte.value,
      descricao: form.descricao.value,
      foto: form.foto.value,
      usuario_id: usuario.id
    };

    try {
      let url = `${API_BASE}/animais`;
      let metodo = 'POST';

      if (idEdicao) {
        url = `${API_BASE}/animais/${idEdicao}`;
        metodo = 'PUT';
      }

      const resposta = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosAnimal)
      });

      const resultado = await resposta.json();

      if (resultado.sucesso) {
        mostrarToast(resultado.mensagem, 'success');
        setTimeout(() => {
          window.location.href = idEdicao ? `detalhes.html?id=${idEdicao}` : 'animais.html';
        }, 1200);
      } else {
        mostrarToast(resultado.mensagem || 'Erro ao processar formulário.', 'error');
      }
    } catch (erro) {
      console.error('Erro na requisição:', erro);
      mostrarToast('Falha na comunicação com o servidor.', 'error');
    }
  });
}

/**
 * 6. OPERAÇÃO DELETE: EXCLUIR ANIMAL
 */
async function confirmarExclusaoAnimal(id, nome) {
  const confirmacao = window.confirm(`Tem certeza que deseja excluir o registro de "${nome}"?\nEsta ação não poderá ser desfeita.`);
  if (!confirmacao) return;

  try {
    const resposta = await fetch(`${API_BASE}/animais/${id}`, {
      method: 'DELETE'
    });

    const resultado = await resposta.json();

    if (resultado.sucesso) {
      mostrarToast(resultado.mensagem, 'success');
      setTimeout(() => {
        window.location.href = 'animais.html';
      }, 1200);
    } else {
      mostrarToast(resultado.mensagem || 'Não foi possível excluir.', 'error');
    }
  } catch (erro) {
    console.error('Erro ao excluir animal:', erro);
    mostrarToast('Falha ao comunicar exclusão com o servidor.', 'error');
  }
}

/**
 * 7. FORMULÁRIO DE CADASTRO DE USUÁRIO
 */
function inicializarFormularioCadastroUsuario() {
  const form = document.getElementById('form-cadastro-usuario');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const senha = form.senha.value;
    const confirmacaoSenha = form.confirmacaoSenha.value;

    if (senha !== confirmacaoSenha) {
      mostrarToast('As senhas não coincidem.', 'error');
      return;
    }

    try {
      const resposta = await fetch(`${API_BASE}/usuarios/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha, confirmacaoSenha })
      });

      const resultado = await resposta.json();

      if (resultado.sucesso) {
        mostrarToast('Cadastro realizado! Faça login.', 'success');
        setTimeout(() => { window.location.href = 'login.html'; }, 1200);
      } else {
        mostrarToast(resultado.mensagem || 'Erro ao cadastrar.', 'error');
      }
    } catch (erro) {
      console.error('Erro ao cadastrar usuário:', erro);
      mostrarToast('Erro ao comunicar com o servidor.', 'error');
    }
  });
}

/**
 * 8. FORMULÁRIO DE LOGIN
 */
function inicializarFormularioLogin() {
  const form = document.getElementById('form-login');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const senha = form.senha.value;

    try {
      const resposta = await fetch(`${API_BASE}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const resultado = await resposta.json();

      if (resultado.sucesso) {
        salvarUsuarioLogado(resultado.usuario);
        mostrarToast(`Bem-vindo(a), ${resultado.usuario.nome}!`, 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 1000);
      } else {
        mostrarToast(resultado.mensagem || 'E-mail ou senha incorretos.', 'error');
      }
    } catch (erro) {
      console.error('Erro ao realizar login:', erro);
      mostrarToast('Erro ao conectar com o servidor.', 'error');
    }
  });
}

/**
 * 9. INICIALIZADOR GLOBAL AO CARREGAR O DOM
 */
document.addEventListener('DOMContentLoaded', () => {
  atualizarNavegacaoUsuario();
});
