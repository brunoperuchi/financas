// Global variables
let finances = []
let tags = []

const enterKey = () => {
    document.body.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            event.preventDefault()
    
            addFinance()
        }
    })
}

const addTag = () => {
    const inputTag = document.getElementById('tag-input')
    const tagName = inputTag.value.toUpperCase()
    
    if (!inputTag.value.trim()) {
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

    if (!valueNum || valueNum == 0) {
        window.alert('Valor inválido!')
    } else if (!inputDate.value) {
        window.alert('Data inválida!')
    } else if (!tagSelect.value) {
        window.alert('Marcador inválido!')
    } else {
        finances.push({
            value: valueNum,
            date: inputDate.value,
            tag: tagSelect.options[tagSelect.selectedIndex].text
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
        value > 0 ? option.classList.add('colorGreen') : option.classList.add('colorRed')
        
        showTotal.insertBefore(option, showTotal.firstChild)
    })

    refreshBoxTotal(valueTotal)
}

const refreshBoxTotal = (value) => {
    const boxTotal = document.getElementById('box-total')
    const total = document.querySelector('#box-total span')
    
    total.innerHTML = convertCoin(value)

    if (value > 0) {
        total.classList.add('colorGreen')
        boxTotal.classList.remove('shadowRed')
        boxTotal.classList.add('shadowGreen')
    } else if (value < 0) {
        total.classList.add('colorRed')
        boxTotal.classList.remove('shadowGreen')
        boxTotal.classList.add('shadowRed')
    } else if (value == 0) {
        total.classList.remove('colorGreen', 'colorRed')
        boxTotal.classList.remove('shadowGreen', 'shadowRed')
    }
}

const convertDate = (date) =>  {
    return new Date(date).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
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