var conteudo_display = ""
var tema = 1

function trocar_tema() {
    tema++;
    if (tema == 4) {
        tema = 1
    }
    const corpo = document.querySelector('body')
    corpo.classList.remove(corpo.className)
    switch (tema) {
        case 1: corpo.classList.add('tema1'); break;
        case 2: corpo.classList.add('tema2'); break;
        case 3: corpo.classList.add('tema3'); break;
    }
}

function acrescentar(item) {
    conteudo_display += item
    atualizar(conteudo_display)
}

function verificacao(item) {
    let ultimo_digito = conteudo_display[(conteudo_display.length) - 1]

    if (conteudo_display != '' && ultimo_digito != '+' && ultimo_digito != '/' && ultimo_digito != 'x' && ultimo_digito != '-') {
        switch (item) {
            case '+':
                acrescentar(item)
                break
            case '-':
                acrescentar(item)
                break
            case 'x':
                acrescentar(item)
                break
            case '/':
                acrescentar(item)
                break
            case '.':
                acrescentar(item)
                break
        }
    } else if (item == '-' && (conteudo_display == '' || ultimo_digito == '/' || ultimo_digito == 'x')) {
        acrescentar(item)
    } else if (item == '-' && ultimo_digito == '+') {
        deletar()
        acrescentar(item)
    }
}

function deletar() {
    if (conteudo_display.length > 0) {
        conteudo_display = conteudo_display.substring(0, (conteudo_display.length - 1))
        atualizar(conteudo_display)
    }
}

function reset() {
    conteudo_display = ""
    atualizar(conteudo_display)
}


function calcular() {
    // --------------------------------- SEPARAR ELEMENTOS ------------------------------------------
    let ultimo_digito = conteudo_display[conteudo_display.length - 1], operadores = [], numeros = []
    if (ultimo_digito != '+' && ultimo_digito != '/' && ultimo_digito != 'x' && ultimo_digito != '-' && conteudo_display != '') {
        let acumulador = ''
        for (let i = 0; i < conteudo_display.length; i++) {
            if (conteudo_display[i] != '+' && conteudo_display[i] != '/' && conteudo_display[i] != 'x' && conteudo_display[i] != '-') {
                acumulador += conteudo_display[i]
            } else if (conteudo_display[i] == '-' && ((conteudo_display[i - 1] == '/' || conteudo_display[i - 1] == 'x') || i == 0)) {
                acumulador += conteudo_display[i]
            } else {
                numeros.push(parseFloat(acumulador))
                acumulador = ''
                operadores.push(conteudo_display[i])
            }
        }
        numeros.push(parseFloat(acumulador))
        // ------------------------------------------------------------------------------------------------
        while (numeros.length != 1) {
            if (operadores.includes('/') && operadores.includes('x')) {
                let divisor = operadores.indexOf('/')
                let produto = operadores.indexOf('x')
                if (divisor < produto) {
                    numeros[divisor] = parseFloat((operacoes(operadores[divisor], numeros[divisor], numeros[divisor + 1])).toFixed(5))
                    numeros.splice((divisor + 1), 1)
                    operadores.splice(divisor, 1)
                } else {
                    numeros[produto] = parseFloat((operacoes(operadores[produto], numeros[produto], numeros[produto + 1])).toFixed(5))
                    numeros.splice((produto + 1), 1)
                    operadores.splice(produto, 1)
                }
            } else if (operadores.includes('/')) {
                let divisor = operadores.indexOf('/')
                if (numeros[divisor + 1] == 0) {
                    numeros = ['undefined']
                } else {
                    numeros[divisor] = parseFloat((operacoes(operadores[divisor], numeros[divisor], numeros[divisor + 1])).toFixed(5))
                    numeros.splice((divisor + 1), 1)
                    operadores.splice(divisor, 1)
                }
            } else if (operadores.includes('x')) {
                let produto = operadores.indexOf('x')
                numeros[produto] = parseFloat((operacoes(operadores[produto], numeros[produto], numeros[produto + 1])).toFixed(5))
                numeros.splice((produto + 1), 1)
                operadores.splice(produto, 1)
            } else {
                numeros[0] = operacoes(operadores[0], numeros[0], numeros[1])
                numeros.splice(1, 1)
                operadores.splice(0, 1)
            }
        }
        atualizar(numeros[0])
        conteudo_display = ""
        conteudo_display += numeros[0]
    }
}

function operacoes(operador, numero_1, numero_2) {
    switch (operador) {
        case '+': return (numero_1 + numero_2); break;
        case '-': return (numero_1 - numero_2); break;
        case '/': return (numero_1 / numero_2); break;
        case 'x': return (numero_1 * numero_2); break;
    }
}

function atualizar(dados) {
    document.getElementById("resultado").innerHTML = dados;
}