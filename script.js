const colorGreen = '#26bf00'
const colorRed = '#e90000'

let finances = []
let tags = []

function addTag() {
    let inputTag = document.getElementById('tag-input')
    let tagName = inputTag.value
    
    tags.push(tagName)

    refreshTagSelect()

    inputTag.value = ''
    inputTag.focus()
}

function refreshTagSelect() {
    let tagSelect = document.getElementById('tag-select')
    tagSelect.innerHTML = ''
    
    tags.sort((a, b) => a.localeCompare(b))
    
    tags.forEach(function(tag, index) {
        let option = document.createElement('option')
        option.value = `${index}`
        option.text = `${tag}`
        
        lastChild = tagSelect.lastChild
        tagSelect.appendChild(option)
    })
}

function addFinance() {
    let inputDate = document.getElementById('date-input')
    let date = inputDate.value
    let inputValue = document.getElementById('value-input')
    let valueNum = Number(inputValue.value)
    let tagSelect = document.getElementById('tag-select')
    let tag = tagSelect.options[tagSelect.selectedIndex].text
    
    if (!valueNum || valueNum == 0) {
        window.alert('Valor inválido!')
    } else {
        finances.push({
            date: date,
            value: valueNum,
            tag: tag
        })
        refreshShowAll()
    }
    
    inputDate.value = ''
    inputValue.value = ''
    inputValue.focus()
}

function refreshShowAll() {
    let showTotal = document.getElementById('show-total')
    showTotal.innerHTML = ''

    let valueTotal = 0
    
    finances.sort(descendingOrderDate)

    finances.forEach(function(finance, index) {
        let date = finance.date
        let value = finance.value
        let tag = finance.tag

        valueTotal += value

        let option = document.createElement('option')
        option.value = `${index}`
        option.text = `${convertDate(date)} - R$ ${convertCoin(value)} - ${tag}`
        option.style.color = value > 0 ? colorGreen : colorRed
        
        showTotal.insertBefore(option, showTotal.firstChild)
    })

    refreshBoxTotal(valueTotal)
}

function refreshBoxTotal(value) {
    let boxTotal = document.getElementById('box-total')
    let total = document.querySelector('#box-total span')

    total.innerHTML = `R$ ${convertCoin(value)}`
    
    if (value > 0) {
        total.style.color = colorGreen
        boxTotal.style.boxShadow = `-2px -2px ${colorGreen}`
    } else if (value < 0) {
        total.style.color = colorRed
        boxTotal.style.boxShadow = `2px 2px ${colorRed}`
    } else if (value == 0) {
        total.style.color = '#fff'
        boxTotal.style.boxShadow = ''
    }
}

function convertDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
}

function convertCoin(value) {
    return value.toFixed(2).replace('.', ',').replace('-', '')
}

function ascendingOrderDate(a, b) {
    return new Date(a.date) - new Date(b.date);
}

function descendingOrderDate(a, b) {
    return new Date(b.date) - new Date(a.date);
}