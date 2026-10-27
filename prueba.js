import nomenclador from "./nomenclador.json" with { type: "json" };

let incrementos = nomenclador.incrementos_mensuales
let meses = ['septiembre','octubre']
let valor_base = 20550.64
let resultado = 0
for (let i = 0; i < meses.length; i++) {
    let mes = meses[i]
    let incremento = incrementos[mes];
    resultado = (valor_base * incremento) + valor_base
    valor_base = resultado
    console.log(resultado.toFixed(2))
}
