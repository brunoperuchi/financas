const colorGreen = '#26bf00'
const colorRed = '#e90000'

let finances = []
let valueTotal = 0

function addFinance() {
    let inputDate = document.getElementById('date-input')
    let date = new Date(inputDate.value).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    let inputValue = document.getElementById('value-input')
    let valueNum = Number(inputValue.value)

    inputDate.value = ''
    inputValue.value = ''
    inputValue.focus()

    if (!valueNum || valueNum == 0) {
        window.alert('Valor inválido!')
    } else {
        finances.push({
            date: date,
            value: valueNum
        })

        valueTotal += valueNum

        addShowTotal(date, valueNum)
    }
}

function addShowTotal(date, valueNum) {   
    let option = document.createElement('option')
    option.value = `${finances.length}`
    option.text = `${date} - R$ ${convertCoin(valueNum)}`
    option.style.color = valueNum > 0 ? colorGreen : colorRed
    
    let showTotal = document.getElementById('show-total')
    showTotal.insertBefore(option, showTotal.firstChild)

    refreshBoxTotal()
}

function refreshBoxTotal() {
    let boxTotal = document.getElementById('box-total')
    let total = document.querySelector('#box-total span')

    total.innerHTML = `R$ ${convertCoin(valueTotal)}`
    
    if (valueTotal > 0) {
        total.style.color = colorGreen
        boxTotal.style.boxShadow = `-2px -2px ${colorGreen}`
    } else if (valueTotal < 0) {
        total.style.color = colorRed
        boxTotal.style.boxShadow = `2px 2px ${colorRed}`
    } else if (valueTotal == 0) {
        total.style.color = '#fff'
        boxTotal.style.boxShadow = ''
    }
}

function convertCoin(value) {
    return value.toFixed(2).replace('.', ',').replace('-', '')
}