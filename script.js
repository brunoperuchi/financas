document.body.addEventListener('keyup', (event) => {
    // Enter key
    if (event.keyCode === 13) {
        event.preventDefault()

        addFinance()
    }
})

const colorGreen = '#26bf00'
const colorRed = '#e90000'

let finances = []
let tags = []

const addTag = () => {
    const inputTag = document.getElementById('tag-input')
    const tagName = inputTag.value.toUpperCase()
    
    if (!inputTag.value) {
        window.alert('Marcador inválido!')
    } else if (tags.includes(tagName)) {
        window.alert('Marcador já cadastrado!')
    } else {
        tags.push(tagName)
        
        refreshTagSelect(tagName)
    }
    
    inputTag.value = ''

    const inputValue = document.getElementById('value-input')
    inputValue.focus()
}

const refreshTagSelect = (tagAdded) => {
    const tagSelect = document.getElementById('tag-select')

    tagSelect.innerHTML = ''
    
    tags.sort((a, b) => a.localeCompare(b))
    
    tags.forEach((tag, index) => {
        let option = document.createElement('option')
        option.value = `${index}`
        option.text = `${tag}`

        if (tag === tagAdded) {
            option.setAttribute('selected', true);
        }
        
        lastChild = tagSelect.lastChild
        tagSelect.appendChild(option)
    })
}

const addFinance = () => {
    const inputDate = document.getElementById('date-input')
    const inputValue = document.getElementById('value-input')
    const tagSelect = document.getElementById('tag-select')

    
    const valueNum = Number(inputValue.value)
    const tag = tagSelect.options[tagSelect.selectedIndex].text

    if (!valueNum || valueNum == 0) {
        window.alert('Valor inválido!')
    } else {
        finances.push({
            date: inputDate.value,
            value: valueNum,
            tag: tag
        })
        refreshShowAll()
    }
    
    inputDate.value = ''
    inputValue.value = ''
    inputValue.focus()
}

const refreshShowAll = () => {
    const showTotal = document.getElementById('show-total')
    showTotal.innerHTML = ''

    let valueTotal = 0
    
    finances.sort(descendingOrderDate)

    finances.forEach((finance, index) => {
        const value = finance.value

        valueTotal += value

        const option = document.createElement('option')
        option.value = `${index}`
        option.text = `${convertDate(finance.date)} - ${convertCoin(value)} - ${finance.tag}`
        option.style.color = value > 0 ? colorGreen : colorRed
        
        showTotal.insertBefore(option, showTotal.firstChild)
    })

    refreshBoxTotal(valueTotal)
}

const refreshBoxTotal = (value) => {
    const total = document.querySelector('#box-total span')
    
    total.innerHTML = convertCoin(value)
    
    const totalStyle = total.style
    const boxTotalStyle = document.getElementById('box-total').style
    

    if (value > 0) {
        totalStyle.color = colorGreen
        boxTotalStyle.boxShadow = `-2px -2px ${colorGreen}`
    } else if (value < 0) {
        totalStyle.color = colorRed
        boxTotalStyle.boxShadow = `2px 2px ${colorRed}`
    } else if (value == 0) {
        totalStyle.color = '#fff'
        boxTotalStyle.boxShadow = ''
    }
}

const convertDate = (date) =>  {
    if (!date) {
        return "00/00/0000"
    } else {
        return new Date(date).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    }
}

const convertCoin = (value) =>  {
    return `R$ ${value.toFixed(2).replace('.', ',')}`
}

const ascendingOrderDate = (a, b) =>  {
    return new Date(a.date) - new Date(b.date);
}

const descendingOrderDate = (a, b) =>  {
    return new Date(b.date) - new Date(a.date);
}