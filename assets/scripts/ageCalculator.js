function calcularIdade() {
    const dia = parseInt(document.getElementById('textoDia').value, 10);
    const mes = parseInt(document.getElementById('textoMes').value, 10);
    const ano = parseInt(document.getElementById('textoAno').value, 10);

    limparErros();

    const erros = validarData(dia, mes, ano);
    if (erros.length > 0) {
        erros.forEach(erro => {
            document.getElementById(erro.id).textContent = erro.mensagem;
            const campo = document.getElementById(erro.campo);
            campo.classList.add('invalid');
            const label = document.getElementById(`label${erro.campo.charAt(5).toUpperCase() + erro.campo.slice(6)}`);
            if (label) {
                label.classList.add('label-invalid');
            }
        });
        return;
    }

    const hoje = new Date();
    const dataNascimento = new Date(ano, mes - 1, dia);
    let idadeAnos = hoje.getFullYear() - dataNascimento.getFullYear();
    const m = hoje.getMonth() - dataNascimento.getMonth();
    let idadeMeses = m;
    if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idadeAnos--;
        idadeMeses = 12 + m;
    }

    const diasHoje = hoje.getDate();
    const diasNascimento = dataNascimento.getDate();
    let idadeDias = diasHoje - diasNascimento;
    if (idadeDias < 0) {
        idadeMeses--;
        const ultimoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 0);
        idadeDias += ultimoMes.getDate();
    }
    
    document.getElementById('anosValor').textContent = idadeAnos;
    document.getElementById('mesesValor').textContent = idadeMeses >= 0 ? idadeMeses : 12 + idadeMeses;
    document.getElementById('diasValor').textContent = idadeDias;
}

function limparErros() {
    const campos = ['textoDia', 'textoMes', 'textoAno'];
    const erros = ['erroDia', 'erroMes', 'erroAno'];
    const labels = ['labelDia', 'labelMes', 'labelAno'];

    campos.forEach(campo => {
        document.getElementById(campo).classList.remove('invalid');
    });

    erros.forEach(erro => {
        document.getElementById(erro).textContent = '';
    });

    labels.forEach(labelId => {
        const label = document.getElementById(labelId);
        if (label) {
            label.classList.remove('label-invalid');
        }
    });
}

function validarData(dia, mes, ano) {
  const erros = [];
  if (isNaN(dia) || dia < 1 || dia > 31) {
      erros.push({ campo: 'textoDia', id: 'erroDia', mensagem: 'Must be a valid day' });
  }
  if (isNaN(dia) || dia == null) {
      erros.push({ campo: 'textoDia', id: 'erroDia', mensagem: 'This field is required' });
  }
  if (isNaN(mes) || mes < 1 || mes > 12) {
      erros.push({ campo: 'textoMes', id: 'erroMes', mensagem: 'Must be a valid month' });
  }
  if (isNaN(mes) || mes == null) {
      erros.push({ campo: 'textoMes', id: 'erroMes', mensagem: 'This field is required' });
  }
  if (isNaN(ano) || ano < 1 || ano > 2024) {
      erros.push({ campo: 'textoAno', id: 'erroAno', mensagem: 'Must be a valid year' });
  }
  if (isNaN(ano) || ano == null) {
      erros.push({ campo: 'textoAno', id: 'erroAno', mensagem: 'This field is required' });
  }
  const data = new Date(ano, mes - 1, dia);
  if (data.getFullYear() !== ano || data.getMonth() + 1 !== mes || data.getDate() !== dia) {
      if (!erros.some(e => e.id === 'erroDia')) {
          erros.push({ campo: 'textoDia', id: 'erroDia', mensagem: 'Must be a valid date' });
      }
  }
  return erros;
}
