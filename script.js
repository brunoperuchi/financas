let financas = []
let qntFinancas = financas.length
let entradas = []
let qntEntradas = entradas.length
let saidas = []
let qntSaidas = saidas.length
let valorTotal = 0

function addEntrada() {
    let tipo = '+'
    let inputEntrada = document.getElementById('inputEntrada')
    let entrada = Number(inputEntrada.value)
    let mostraEntradas = document.getElementById('mostraEntradas')

    inputEntrada.value = ''
    inputEntrada.focus()

    if (entrada < 0 || !entrada) {
        window.alert('Entrada inválida!')
    } else {
        let option = document.createElement('option')
        option.value = `${qntEntradas}`
        option.text = `R$ ${entrada.toFixed(2).replace('.', ',')}`
        mostraEntradas.insertBefore(option, mostraEntradas.firstChild)
        entradas.push(entrada)
    
        atualizaTotal(entrada, tipo)
    }
}

function addSaida() {
    let tipo = '-'
    let inputSaida = document.getElementById('inputSaida')
    let saida = Number(inputSaida.value)
    let mostraSaidas = document.getElementById('mostraSaidas')

    inputSaida.value = ''
    inputSaida.focus()

    if (saida < 0 || !saida) {
        window.alert('Saída inválida!')
    } else {
        let option = document.createElement('option')
        option.value = `${qntSaidas}`
        option.text = `R$ ${saida.toFixed(2).replace('.', ',')}`
        mostraSaidas.insertBefore(option, mostraSaidas.firstChild)
        saidas.push(saida)
    
        atualizaTotal(saida, tipo)
    }
}
function atualizaTotal(valor, tipo) {
    let boxTotal = document.getElementById('boxTotal')
    let total = document.querySelector('#boxTotal span')
    let mostraTotal = document.getElementById('mostraTotal')

    let option = document.createElement('option')
    option.value = `${qntFinancas}`
    option.text = `R$ ${valor.toFixed(2).replace('.', ',')}`
    
    if (tipo == '+') {
        valorTotal += valor
        option.style.color = '#26bf00'
    } else if (tipo == '-') {
        valorTotal -= valor
        option.style.color = '#e90000'
    }

    mostraTotal.insertBefore(option, mostraTotal.firstChild)
    financas.push(valor)
    
    if (valorTotal > 0) {
        total.style.color = '#26bf00'
        boxTotal.style.boxShadow = '-3px -3px #26bf00'
    } else if (valorTotal < 0) {
        total.style.color = '#e90000'
        boxTotal.style.boxShadow = '2px 2px #e90000'
    } else if (valorTotal == 0) {
        total.style.color = '#fff'
        boxTotal.style.boxShadow = ''
    }
    total.innerHTML = `R$ ${valorTotal.toFixed(2).replace('.', ',').replace('-', '')}`
}