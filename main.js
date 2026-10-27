import nomenclador from "./nomenclador.json" with { type: "json" };

let prestacionesDatos = nomenclador.prestaciones
const btn_calculo = document.getElementById("btn-calculo")
const fecha_inicio = document.getElementById("fecha-inicio")
const fecha_fin = document.getElementById("fecha-fin")
let total = document.getElementById('total')
let categoriaPres = document.getElementById('categoria')
let btn_copiar = document.getElementById('btn-copiar')
let prestaciones = document.getElementById('prestaciones')
let btn_valorHora = document.getElementById('btn-hora')
let valorHora = document.getElementById('valor_hora')
let cant_dias = document.getElementById('total_dias')
let btn_copiarDos = document.getElementById('btn-copiar-hora')
let btn_porcentaje = document.getElementById('btn-porcetaje')
let porcetaje = document.getElementById('porcentaje')
let valor_porcentaje = document.getElementById('valor_porcentaje')
let copiar_valorPorcentaje = document.getElementById('btn-copiar-porcentaje')
let tabla = document.getElementById('valores-antecedentes')
let total_horas = document.getElementById('total_hs')
let btn_sp = document.getElementById('btn-calculo-SP')
let paniales = document.getElementById('paneales')
let sesiones = document.getElementById('sesion')
const fecha_inicio_sp = document.getElementById("fecha-inicio-sp")
const fecha_fin_sp = document.getElementById("fecha-fin-sp")
const tipo_entrada = document.getElementById('text-cantidad')
const total_sp = document.getElementById('cantidad-sp')
const cant_total = document.getElementById('total-sp')
const btn_copiarSp = document.getElementById('btn-copiar-sp')

prestacionesDatos.forEach(element => {
    const option = document.createElement("option");
    option.value = element.modalidad
    option.textContent = element.modalidad
    prestaciones.append(option)
});



btn_porcentaje.addEventListener('click',()=>{
    let valor_prestacion = prestacionesDatos.filter(pres => pres.modalidad == prestaciones.value && pres.categoria == categoriaPres.value)
    let resultado = (valor_prestacion[0].aranceles.octubre * porcetaje.value)/100
    valor_porcentaje.textContent = resultado.toFixed(2)

    let valores = valor_prestacion[0].aranceles
    tabla.innerHTML = ''
    for (const [mes, valor] of Object.entries(valores)) {
        let resultado_mensual = (valor * porcetaje.value)/100
        tabla.innerHTML += `<tr>
                                <td style="text-align: center">${mes}</td>
                                <td  style="text-align: center">${prestaciones.value}</td>
                                <td  style="text-align: center">${categoriaPres.value}</td>
                                <td  style="text-align: center">$${resultado_mensual.toFixed(2)}</td>
                            </tr>`
    }

})

btn_valorHora.addEventListener('click',()=>{
    let valor_prestacion = prestacionesDatos.filter(pres => pres.modalidad == prestaciones.value && pres.categoria == categoriaPres.value)
    let valor_semanal = (valor_prestacion[0].aranceles.octubre / (cant_dias.value /7))
    let resultado = valor_semanal / total_horas.value
    let valores = valor_prestacion[0].aranceles
    valorHora.textContent = resultado.toFixed(2)
    tabla.innerHTML = ''

    for (const [mes, valor] of Object.entries(valores)) {
        let resultado_mensual = (valor / (cant_dias.value /7))
        let total = resultado_mensual /total_horas.value
        tabla.innerHTML += `<tr>
                                <td style="text-align: center">${mes}</td>
                                <td  style="text-align: center">${prestaciones.value}</td>
                                <td  style="text-align: center">${categoriaPres.value}</td>
                                <td  style="text-align: center">$${total.toFixed(2)}</td>
                            </tr>`
    }

})

copiar_valorPorcentaje.addEventListener('click',()=>{
    navigator.clipboard.writeText(valor_porcentaje.textContent)
})

btn_copiarDos.addEventListener('click',()=>{
    navigator.clipboard.writeText(valorHora.textContent)
})


btn_copiar.addEventListener('click',()=>{
    navigator.clipboard.writeText(total.textContent)
})


btn_calculo.addEventListener('click', ()=>{
    let valor_prestacion = prestacionesDatos.filter(pres => pres.modalidad == prestaciones.value && pres.categoria == categoriaPres.value)
    const fechaIn = fecha_inicio.value
    const fechaFin = fecha_fin.value
    const total_dias = (new Date(fechaFin)-new Date(fechaIn)) / (60*60*24*1000)
    const dia = Number(fechaFin.split("-")[2])
    let resultado = (Number(valor_prestacion[0].aranceles.octubre) / dia) * Number(total_dias)
    total.textContent = resultado.toFixed(2)
})

paniales.addEventListener('click', ()=>{
    tipo_entrada.textContent = "Pañales diarios"
})

sesiones.addEventListener('click', ()=>{
    tipo_entrada.textContent = "Sesiones sem. "
})


let resultado = 0
btn_sp.addEventListener('click',()=>{
    const fechaIn = fecha_inicio_sp.value
    const fechaFin = fecha_fin_sp.value
    const total_dias = (new Date(fechaFin)-new Date(fechaIn)) / (60*60*24*1000)
    if(paniales.checked){
        resultado = total_sp.value * (total_dias + 1)
        cant_total.textContent = `${resultado} pañales `
    }else if(sesiones.checked){
        resultado = total_sp.value * ((total_dias + 1)/7)
        cant_total.textContent = `${Math.round(resultado)} sesiones`
    }
})

btn_copiarSp.addEventListener('click',()=>{
    navigator.clipboard.writeText(Math.round(resultado))
})
