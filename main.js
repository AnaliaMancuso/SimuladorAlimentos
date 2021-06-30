$("#btnres").hide(); 
$("#extenso").hide(); 
$("#volver").hide(); 
$("#print").hide();

$("#json").animate({
    height:'150px',
    width:'150px'},
    "slow");

let listado = document.querySelector('#listado');

$("#json").click(() => { 
    $(".presentacion").hide(); 
    $("#btnres").show();
    $("#volver").show(); 
    $.get(`base.json`, function (respuesta, estado) {
        if(estado === "success"){
            let misDatos = respuesta;
            for (const dato of misDatos) { 
                let listaAlimentos =document.createElement("div");
                listaAlimentos.innerHTML=`
                    <div class="alim waves-effect">
                        <h5 class="center-align" > ${dato.name}</h5>
                        <input class="center-align"  id="${dato.id}" placeholder="Cant. gramos" type="number">
                    </div>`;
                listado.appendChild(listaAlimentos);
            }
        }
    })
    
});

let totalcarbono =0
let totalprotein =0
let totalgras =0
let totalalc =0
let totalcal =0

$("#btnres").click(()=>{
    $("#btnres").hide(); 
    $("#listado").hide(); 
    $("#extenso").show();
    $.get(`base.json`, function (respuesta, estado) {
        if(estado === "success"){
            let misDatos = respuesta;
            for (const dato of misDatos) { 
                let alimento = document.getElementById(dato.id)
                    totalcarbono += dato.ch * alimento.value
                    totalprotein += dato.pr * alimento.value
                    totalgras += dato.gr * alimento.value
                    totalalc += dato.oh * alimento.value
            }
            totalcal = totalcarbono*4 + totalprotein*4 + totalgras*9 +totalalc*7
            $('#listado-resumido').append(`
            <div class="container">
                <h4 class="res-fondo center-align">Los resultados resumidos son:</h4>
                <h5 class="res-fondo1 center-align">Total de hidratos de carbono: ${totalcarbono.toFixed(2)} g</h5>
                <h5 class="res-fondo2 center-align">Total de proteínas: ${totalprotein.toFixed(2)} g</h5>
                <h5 class="res-fondo1 center-align">Total de grasas: ${totalgras.toFixed(2)} g</h5>
                <h5 class="res-fondo2 center-align">Total de alcohol: ${totalalc.toFixed(2)} g</h5>
                <h5 class="res-fondo1 center-align">Total de calorías: ${totalcal.toFixed(2)} kcal</h5>
            </div>
            `);
            if(totalcal == 0){
                $('#listado-resumido').hide();
                $("#extenso").hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Campos vacíos',
                    text: 'Debes completar al menos un dato para ver los resultados',
                  })
            }
            }
        }
    )
})

$("#extenso").click(()=>{
    $("#listado-resumido").hide(); 
    $("#extenso").hide();
    $('#listado-extenso').append(`
        <h4>Los resultados en detalle son:</h4>
        <table>
            <thead>
                <tr class="res-fondo">
                    <th>Alimento</th>
                    <th>Cantidad (g)</th>
                    <th>Carbohidratos (g)</th>
                    <th>Proteínas (g)</th>
                    <th>Grasas (g)</th>
                    <th>Alcohol (g)</th>
                    <th>Calorías</th>
                </tr>
            </thead>
        </table>
    `);
    $.get(`base.json`, function (respuesta, estado) {
        if(estado === "success"){
            let misDatos = respuesta;
            for (const dato of misDatos) { 
                let alimento = document.getElementById(dato.id)
                if (alimento.value !== "")	{
                    totalcarbono = dato.ch * alimento.value
                    totalprotein = dato.pr * alimento.value
                    totalgras = dato.gr * alimento.value
                    totalalc = dato.oh * alimento.value
                    totalcal = totalcarbono*4 + totalprotein*4 + totalgras*9 +totalalc*7
                    $('#listado-extenso').append(`
                        <table>
                            <tbody>
                                <tr>
                                    <td>${dato.name}</td>
                                    <td>${alimento.value}</td>
                                    <td>${totalcarbono.toFixed(2)}</td>
                                    <td>${totalprotein.toFixed(2)}</td>
                                    <td>${totalgras.toFixed(2)}</td>
                                    <td>${totalalc.toFixed(2)}</td>
                                    <td>${totalcal.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    `);
                }
            }
        }
    });
    $("#volver").show(); 
    $("#print").show();
})

function printPDF() {
	const PRINT = document.querySelector('.element-to-print');
	html2pdf()
        .set({
            margin: 0.5,
            filename: `detalle_alimentos_consumidos.pdf`,
        })
		.from(PRINT)
		.save()
		.then(console.log('printed!'));
}

