let financas = []
let qntFinancas = financas.length
let valorTotal = 0

function addValor() {
    let inputValor = document.getElementById('inputValor')
    let valorNum = Number(inputValor.value)

    console.log(valorNum)

    if (!valorNum || valorNum == 0) {
        window.alert('Valor inválido!')
    } else if (valorNum > 0) {
        atualizaTotal(valorNum, "+")
    } else {
        atualizaTotal(valorNum, "-")
    }

    inputValor.value = ''
    inputValor.focus()
}

function atualizaTotal(valor, tipo) {
    let boxTotal = document.getElementById('boxTotal')
    let total = document.querySelector('#boxTotal span')
    let mostraTotal = document.getElementById('mostraTotal')

    let option = document.createElement('option')
    option.value = `${qntFinancas}`
    option.text = `R$ ${valor.toFixed(2).replace('.', ',')}`

    if (tipo == '+') {
        option.style.color = '#26bf00'
    } else if (tipo == '-') {
        option.style.color = '#e90000'
    }

    valorTotal += valor
    mostraTotal.insertBefore(option, mostraTotal.firstChild)
    financas.push(valor)

    if (valorTotal > 0) {
        total.style.color = '#26bf00'
        boxTotal.style.boxShadow = '-2px -2px #26bf00'
    } else if (valorTotal < 0) {
        total.style.color = '#e90000'
        boxTotal.style.boxShadow = '2px 2px #e90000'
    } else if (valorTotal == 0) {
        total.style.color = '#fff'
        boxTotal.style.boxShadow = ''
    }
    
    total.innerHTML = `R$ ${valorTotal.toFixed(2).replace('.', ',').replace('-', '')}`
}