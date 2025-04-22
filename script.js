const carros = [
    { id: 1, modelo: "Onix LT 1.0", marca: "Chevrolet", ano: 2022, imagem: "img/onix.jpg", valor_diaria: 120.00 },
    { id: 2, modelo: "HB20 Vision", marca: "Hyundai", ano: 2023, imagem: "img/HB20.jpg", valor_diaria: 150.00 },
    { id: 3, modelo: "Renegade Longitude", marca: "Jeep", ano: 2023, imagem: "img/Renegade.jpg", valor_diaria: 210.00 },
    { id: 4, modelo: "Corolla XEi", marca: "Toyota", ano: 2022, imagem: "img/corolla.jpg", valor_diaria: 250.00 },
    { id: 5, modelo: "Civic Touring", marca: "Honda", ano: 2021, imagem: "img/civic.jpg", valor_diaria: 230.00 },
    { id: 6, modelo: "Fiat Mobi Like", marca: "Fiat", ano: 2022, imagem: "img/mobi.jpg", valor_diaria: 90.00 },
    { id: 7, modelo: "Kwid Zen", marca: "Renault", ano: 2023, imagem: "img/kwid.jpg", valor_diaria: 95.00 },
    { id: 8, modelo: "Gol Trendline", marca: "Volkswagen", ano: 2021, imagem: "img/gol.jpg", valor_diaria: 100.00 },
    { id: 9, modelo: "Compass Limited", marca: "Jeep", ano: 2022, imagem: "img/compass.jpg", valor_diaria: 270.00 },
    { id: 10, modelo: "Tracker Premier", marca: "Chevrolet", ano: 2023, imagem: "img/tracker.jpg", valor_diaria: 220.00 }
];

function carregarCarros() {
    const divCarro = document.getElementById('carro');
    carros.forEach(carro => {
        const divItem = document.createElement('div');
        divItem.classList.add('carro-item');

        const inputRadio = document.createElement('input');
        inputRadio.type = "radio";
        inputRadio.name = "carro";
        inputRadio.value = carro.id;

        const img = document.createElement('img');
        img.src = carro.imagem;
        img.alt = carro.modelo;

        const texto = document.createElement('span');
        texto.textContent = `${carro.modelo} (${carro.marca} - ${carro.ano}) - R$ ${carro.valor_diaria.toFixed(2)}`;

        divItem.appendChild(inputRadio);
        divItem.appendChild(img);
        divItem.appendChild(texto);
        divCarro.appendChild(divItem);
    });
}

function validarCPF() {
    const cpf = document.getElementById('cpf').value;
    const erroCPF = document.getElementById('erro-cpf');
    if (/^\d{11}$/.test(cpf)) {
        erroCPF.style.display = 'none';
        return true;
    } else {
        erroCPF.style.display = 'inline';
        return false;
    }
}

function salvarLocacao(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const dataInicio = document.getElementById('data-inicio').value;
    const dataFim = document.getElementById('data-fim').value;
    const carroSelecionado = document.querySelector('input[name="carro"]:checked');

    if (!nome || !cpf || !dataInicio || !dataFim || !carroSelecionado) {
        alert("Preencha todos os campos!");
        return;
    }

    if (!validarCPF()) {
        alert("CPF inválido! Deve conter 11 dígitos numéricos.");
        return;
    }

    const carroId = parseInt(carroSelecionado.value);
    const carro = carros.find(c => c.id === carroId);

    const locacao = { nome, cpf, dataInicio, dataFim, carro };
    let locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];
    locacoes.push(locacao);
    localStorage.setItem('locacoes', JSON.stringify(locacoes));

    alert("Locação cadastrada com sucesso!");
    window.location.href = "index.html";
}

function voltar() {
    window.location.href = "index.html";
}

document.addEventListener('DOMContentLoaded', () => {
    carregarCarros();
    document.getElementById('cpf').addEventListener('input', validarCPF);
    document.getElementById('form-locacao').addEventListener('submit', salvarLocacao);
});
