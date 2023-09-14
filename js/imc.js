const botaoAbrir = document.querySelector('button[type="submit"]');
const botaoFechar = document.querySelector('[data-modal="fechar"]');
const containerModal = document.querySelector('[data-modal="container"]');
const resultado = document.querySelector('.resultado');
const divExplicacao = document.querySelector('.explicacao-imc');
const span = document.createElement('span');

if (botaoAbrir && botaoFechar && containerModal) {
  function toggleModal(event) {
    event.preventDefault();

    const peso = document.querySelector('#peso').value;
    const altura = document.querySelector('#altura').value;

    divExplicacao.classList.remove('ativo');
    resultado.innerText = '';
    resultado.style.color = '';
    span.innerText = '';

    if (altura.includes('.') || altura.includes(',')) {
      resultado.innerText = 'Escreva sua altura em cm.';
      span.innerText = 'Dica: Multiplique por 100.';
      resultado.insertAdjacentElement('afterend', span);
    } else if (altura.length > 3) {
      resultado.innerText = 'Altura Incorreta.';
      span.innerText = 'Digite novamente';
      resultado.insertAdjacentElement('afterend', span);
    } else if (!altura || !peso) {
      resultado.innerText = 'Dados Incorretos.';
      span.innerText = 'Digite novamente';
      resultado.insertAdjacentElement('afterend', span);
    } else {
      const imc = +((peso / (altura * altura)) * 10000).toFixed(2);
      resultado.innerText = `Seu IMC é: ${imc}`;
      atualizarMsgIMC(imc);
    }

    containerModal.classList.toggle('ativo');
  }

  function atualizarMsgIMC(imc) {
    const titulo = document.querySelector('.explicacao-titulo');
    const descricao = document.querySelector('.explicacao-descricao');

    divExplicacao.classList.add('ativo');

    if (imc <= 18.5) {
      resultado.style.color = '#0000FF';
      titulo.innerText = 'Abaixo do normal';
      descricao.innerText =
        'Procure um médico. Algumas pessoas têm um baixo peso por características do seu organismo e tudo bem. Outras podem estar enfrentando problemas, como a desnutrição. É preciso saber qual é o caso.';
    } else if (imc >= 18.6 && imc <= 24.9) {
      resultado.style.color = '#008000';
      titulo.innerText = 'Normal';
      descricao.innerText =
        'Que bom que você está com o peso normal! E o melhor jeito de continuar assim é mantendo um estilo de vida ativo e uma alimentação equilibrada.';
    } else if (imc >= 25 && imc <= 29.9) {
      resultado.style.color = '#FFD700';
      titulo.innerText = 'Sobrepeso';
      descricao.innerText =
        'Ele é, na verdade, uma pré-obesidade e muitas pessoas nessa faixa já apresentam doenças associadas, como diabetes e hipertensão. Importante rever hábitos e buscar ajuda antes de, por uma série de fatores, entrar na faixa da obesidade pra valer.';
    } else if (imc >= 30 && imc <= 34.9) {
      resultado.style.color = '#FFA500';
      titulo.innerText = 'Obesidade grau I';
      descricao.innerText =
        'Sinal de alerta! Chegou na hora de se cuidar, mesmo que seus exames sejam normais. Vamos dar início a mudanças hoje! Cuide de sua alimentação. Você precisa iniciar um acompanhamento com nutricionista e/ou endocrinologista.';
    } else if (imc >= 35 && imc <= 39.9) {
      resultado.style.color = '#FF4500';
      titulo.innerText = 'Obesidade grau II';
      descricao.innerText =
        'Mesmo que seus exames aparentem estar normais, é hora de se cuidar, iniciando mudanças no estilo de vida com o acompanhamento próximo de profissionais de saúde.';
    } else {
      resultado.style.color = '#FF0000';
      titulo.innerText = 'Obesidade grau III';
      descricao.innerText =
        'Aqui o sinal é vermelho, com forte probabilidade de já existirem doenças muito graves associadas. O tratamento deve ser ainda mais urgente.';
    }
  }

  function cliqueForaModal(event) {
    if (event.target === this) {
      toggleModal(event);
      span.remove();
    }
  }

  botaoAbrir.addEventListener('click', toggleModal);
  botaoFechar.addEventListener('click', toggleModal);
  containerModal.addEventListener('click', cliqueForaModal);
}
