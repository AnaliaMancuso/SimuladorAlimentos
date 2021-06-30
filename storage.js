validaEntrada();

function validaEntrada(){
    if (localStorage.acceso){
        let accesoJs=JSON.parse(localStorage.getItem('acceso'));
        document.querySelector('#visitaAnterior').textContent= "Tu ultimo acceso fue: "+ accesoJs
    }
    let DiaHoy = new Date();
    let fecha = DiaHoy.getDate()+'-'+(DiaHoy.getMonth()+1)+'-'+DiaHoy.getFullYear();
    let hora = DiaHoy.getHours() + ":" + DiaHoy.getMinutes() + ":" + DiaHoy.getSeconds();
    let horaFecha=fecha+' '+hora;
    let horaFechaJson=JSON.stringify(horaFecha);
    localStorage.setItem('acceso',horaFechaJson);
}