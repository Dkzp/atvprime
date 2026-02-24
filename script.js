function buscarCEP() {
    const cep = document.getElementById('cep').value;
    const resultadoDiv = document.getElementById('resultado');

    if (cep.length !== 8) {
        resultadoDiv.innerHTML = '<p style="color: red;">CEP INVÁLIDO, MEU CHAPA!</p>';
        return;
    }

    // Corrigido: Usando crases para template strings
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    resultadoDiv.innerHTML = '<p>CARREGANDO MANOBRA...</p>';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                resultadoDiv.innerHTML = '<p style="color: red;">CEP NÃO ENCONTRADO NO RADAR!</p>';
            } else {
                resultadoDiv.innerHTML = `
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>RUA:</strong> ${data.logradouro}</p>
                    <p><strong>BAIRRO:</strong> ${data.bairro}</p>
                    <p><strong>CIDADE:</strong> ${data.localidade}</p>
                    <p><strong>ESTADO:</strong> ${data.uf}</p>
                `;
            }
        })
        .catch(error => {
            resultadoDiv.innerHTML = `<p style="color: red;">DEU RUIM NA MANOBRA: ${error.message}</p>`;
        });
}