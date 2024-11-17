
document.getElementById('btn-login')?.addEventListener('click', function() {
  document.getElementById('modal').style.display = 'flex';
});


document.getElementById('btn-close-modal')?.addEventListener('click', function() {
  document.getElementById('modal').style.display = 'none';
});


function aplicarMascara(event, tipo) {
  let valor = event.target.value.replace(/\D/g, '');
  if (tipo === 'telefone') {
    valor = valor.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  } else if (tipo === 'cpf') {
    valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  event.target.value = valor;
}


document.getElementById('telefone')?.addEventListener('input', (e) => aplicarMascara(e, 'telefone'));
document.getElementById('cpf')?.addEventListener('input', (e) => aplicarMascara(e, 'cpf'));


document.getElementById('form-cadastro')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const usuario = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value.replace(/\D/g, ''),
    cpf: document.getElementById('cpf').value.replace(/\D/g, ''),
    senha: document.getElementById('senha').value,
  };

  
  if (usuario.cpf.length !== 11) {
    alert('Por favor, insira um CPF válido com 11 dígitos.');
    return;
  }

  localStorage.setItem('usuario', JSON.stringify(usuario));
  alert('Cadastro realizado com sucesso!');
  document.getElementById('modal').style.display = 'none';
  window.location.href = 'perfil.html';
});


if (window.location.pathname.endsWith('perfil.html')) {
  window.addEventListener('load', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario) {
      alert('Nenhum usuário encontrado. Você precisa se cadastrar primeiro.');
      window.location.href = 'index.html';
      return;
    }

    document.getElementById('perfil-nome').textContent = usuario.nome || 'Não informado';
    document.getElementById('perfil-email').textContent = usuario.email || 'Não informado';

    const telefoneFormatado = usuario.telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    document.getElementById('perfil-telefone').textContent = telefoneFormatado || 'Não informado';

    const cpfFormatado = usuario.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    document.getElementById('perfil-cpf').textContent = cpfFormatado || 'Não informado';
  });
}
