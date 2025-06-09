let btn = document.querySelector('.btn')
btn.addEventListener('click', () => {
    container.style.display = 'flex'
    // btn.style.display = 'none'
    header.style.display = 'none'
    
})



function getCookie() {
    let cookies = document.cookie.split('; ')
    for (let i = 0; i < cookies.length; i += 1) {
        let cookie = cookies[i].split('=')
        if (cookie[0] == 'colors') {
            return cookie[1]
        }
    }
    return '5'.repeat(900)
}

let header = document.querySelector('.header')
let container = document.querySelector('.container')
let colors = ['rgb(255, 0, 0)', 'rgb(0, 128, 0)', 'rgb(0, 0, 255)', 'rgb(255, 255, 0)', 'rgb(255, 0, 255)', 'rgba(0, 0, 0, 0)', 'rgb(124, 252, 0)', 'rgb(255, 215, 0)', 'rgb(188, 143, 143)']
let filling_btn = document.querySelector('.fill-mode')
let fill_mode = false
let is_clicked = false
let color_cells = document.querySelectorAll('.color-cell')
let current_color = 0
let red = document.querySelector('.red')
let green = document.querySelector('.green')
let blue = document.querySelector('.blue')
let yellow = document.querySelector('.yellow')
let fuchsia = document.querySelector('.fuchsia')
let black = document.querySelector('.black')
let lawnGreen = document.querySelector('.lawnGreen')
let gold = document.querySelector('.gold')
let rosyBrown = document.querySelector('.rosyBrown')
let field = document.querySelector('.field')

let init_colors = getCookie()
for (let i = 0; i < 900; i += 1) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id', i)
    cell.dataset.color = init_colors[i]
    cell.style.backgroundColor = colors[+cell.dataset.color]
    field.appendChild(cell)
}

let cells = document.querySelectorAll('.cell')
for (let i = 0; i < cells.length; i += 1) {
    cells[i].addEventListener('mouseover', () => {
        if (is_clicked == true) {
            cells[i].style.backgroundColor = colors[current_color]
            cells[i].dataset.color = current_color
        }    
    })
    cells[i].addEventListener('click', () => {
        if (fill_mode == true) {
            for (let i = 0; i < cells.length; i += 1) {
                cells[i].style.backgroundColor = colors[current_color]
                cells[i].dataset.color = current_color
            }
        }
        cells[i].style.backgroundColor = colors[current_color]
        cells[i].dataset.color = current_color        
    })
}

let clear_border = () => {
    for (let i = 0; i < color_cells.length; i += 1) {
        color_cells[i].classList.remove('active_color')
    }
}

for (let i = 0; i < color_cells.length; i += 1) {
    color_cells[i].addEventListener('click', () => {
        clear_border()
        current_color = i
        color_cells[i].classList.add('active_color')
        
    })
}

document.addEventListener('mousedown', () => {
    is_clicked = true
})
document.addEventListener('mouseup', () => {
    is_clicked = false
})

filling_btn.addEventListener('click', () => {
    fill_mode = !fill_mode
    if (fill_mode == true) {
        filling_btn.classList.add('active_color')
    } else {
        filling_btn.classList.remove('active_color')
    }
})

setInterval(() => {
    let result = ''
    for (let i = 0; i < cells.length; i += 1) {
        let cookie_color = cells[i].dataset.color
        result += cookie_color
    }
    document.cookie = `colors=${result}`
}, 10000)

let btnDownload = document.querySelector('.btn-download')
btnDownload.addEventListener('click', () => {
    domtoimage.toJpeg(field, { quality: 0.95 })
        .then((dataUrl) => {
            let link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = dataUrl;
            link.click();
        });
})