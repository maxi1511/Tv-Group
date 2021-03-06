// creando variables de los contenedores en html//

const contenedorFormulario = $('#divFormulario');
const contenedorClientes = $('#divClientes');

// array de clientes//

let clientes = [];

// guardando el array de clientes en el local storege//

if (localStorage.getItem('clientes')) {
    let clientes = JSON.parse(localStorage.getItem('clientes'));
    crearCard(clientes, contenedorClientes);
}

// creando el formulario dinámico//

function crearFormulario (contenedor) {

    contenedor.append(`
    
    <form id="formulario" class="form-horizontal" method="post">
                            <fieldset>
                                <legend class="text-center legend">Contáctenos</legend>

                                <div class="form-group">
                                    <span class="col-md-1 col-md-offset-2 text-center"><i
                                            class="fa fa-user bigicon"></i></span>
                                    <div class="col-md-8">
                                        <input id="nombre" name="name" type="text" placeholder="Nombre"
                                            class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <span class="col-md-1 col-md-offset-2 text-center"><i
                                            class="fa fa-user bigicon"></i></span>
                                    <div class="col-md-8">
                                        <input id="apellido" name="apellido" type="text" placeholder="Apellido"
                                            class="form-control">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <span class="col-md-1 col-md-offset-2 text-center"><i
                                            class="fa fa-envelope-o bigicon"></i></span>
                                    <div class="col-md-8">
                                        <input id="email" name="email" type="email" placeholder="Email"
                                            class="form-control">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <span class="col-md-1 col-md-offset-2 text-center"><i
                                            class="fa fa-phone-square bigicon"></i></span>
                                    <div class="col-md-8">
                                        <input id="telefono" name="phone" type="number" placeholder="Teléfono"
                                            class="form-control">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <span class="col-md-1 col-md-offset-2 text-center"><i
                                            class="fa fa-camera bigicon"></i></span>
                                    <div class="col-md-8">
                                    <select id="selCam" class="form-select form-select-sm" aria-label=".form-select-sm example">
                                    <option selected>Seleccione cantidad de cámaras</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                  </select>
                                    </div>
                                </div>

                                
                                <div class="form-group">
                                    <span class="col-md-1 col-md-offset-2 text-center"><i
                                            class="fa fa-signal bigicon"></i></span>
                                    <div class="col-md-8">
                                    <select id="selSat" class="form-select form-select-sm" aria-label=".form-select-sm example">
                                    <option selected>¿Desea contratar satelital?</option>
                                    <option value="SI">SI</option>
                                    <option value="NO">NO</option>
                                    >
                                  </select>
                                    </div>
                                </div>


                                <div class="submit form-group">
                                    <div class="col-md-12 text-center">
                                        <button type="submit" class="btn btn-primary btn-lg">Enviar</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
`);
}

// creando el formulario//

crearFormulario(contenedorFormulario);

// definiendo variables del formulario//

const formulario = $('#formulario');
const inputNombre = $('#nombre');
const inputApellido = $('#apellido');
const inputEmail = $('#email');
const inputTelefono = $('#telefono');
const selectCamaras = $('#selCam');
const selectSatelital = $('#selSat');

// validacion de mi formulario//

formulario.submit(validarFormulario);

// función para validar las variables//

function validarFormulario (e) {
    e.preventDefault();

    if (inputNombre.val() === '') {
        alert('Ingrese su nombre');
        inputNombre.focus();
        return false;
        
    }
    if (inputApellido.val() === '') {
        alert('Ingrese su apellido')
        inputApellido.focus();
        return false;
        
    }
    if (inputEmail.val() === '') {
        alert('Ingrese su email')
        inputEmail.focus();
        return false;
        
    }
    if (inputTelefono.val() === '') {
        alert('Ingrese su teléfono')
        inputTelefono.focus();
        return false;
        
    } 
    if (selectCamaras.val() === '' || selectCamaras.val() === 'Seleccione cantidad de cámaras') {
        alert('Ingrese una opción correcta')
        selectCamaras.focus();
        return false;
        
    }
    if (selectSatelital.val() === '' || selectSatelital.val() === '¿Desea contratar satelital?') {
        alert('Ingrese una opción correcta')
        selectSatelital.focus();
        return false;
        
    }
  
  let nombre = inputNombre.val();
let apellido = inputApellido.val();
let email = inputEmail.val();
let telefono = inputTelefono.val();
let camaras = selectCamaras.val();
let satelital = selectSatelital.val();  

// reseteando formulario//
formulario[0].reset();

crearCliente(nombre, apellido, email, telefono, camaras, satelital);

}

// función para crear los clientes//

function crearCliente(nombre, apellido, email, telefono, camaras, satelital){

    let cliente = new Cliente(nombre, apellido, email, telefono, camaras, satelital);
    clientes.push(cliente);

    guardarLocalStorage('clientes', clientes);
    clientes = recuperarLocalStorage('clientes');
    crearCard(clientes, contenedorClientes);
}

// función para guardar los clientes en el local storage//

function guardarLocalStorage(clave, valor){
    localStorage.setItem(clave, JSON.stringify(valor));
}

// recuperando los clientes del local storage//

function recuperarLocalStorage(clave){
    const clientes = JSON.parse(localStorage.getItem(clave));
    return clientes
}

//creando tarjeta de clientes ingresados//

function crearCard(clientes, contenedor){

    contenedor.html('');

    $(clientes).each((index, cliente) =>{

        contenedor.append(

            `
            <h3>Datos Cliente</h3>
            <div id="contenedorCard" class="card border-secondary mb-3" style="max-width: 18rem;">
                <div class="card-header">Cliente: ${cliente.nombre} ${cliente.apellido}</div>
                <div class="card-body text-secondary">
                    <p class="card-title">Telefono: ${cliente.telefono}</p>
                    <p class="card-text">Email: ${cliente.email}</p>
                    <p class="card-text">Cantidad de Camaras ${cliente.camaras}</p>
                    <p class="card-text">Satelital: ${cliente.satelital}</p>
                </div>
            </div>    
        `
        );
    });
}


// agregando animaciones al formulario//
  
$("#nombre, #apellido, #email, #telefono, #camaras, #satelital").hover(function(){
  
    $(this).css("background-color", "lightblue");
  }, function(){

    $(this).css("background-color", "white");
  });  
 
  // aplicando una api del clima//

      $.ajax({
        url: 'http://api.weatherstack.com/current',
        data: {
          access_key: 'dd137f38a74ae79c853ab77d9743fb6a',
          query: 'Mendoza'
        },
        dataType: 'json',
        success: function(apiResponse) {
        $("#divClima").append(`
       <h3 class="provincia">${apiResponse.location.name}</h3> 
       <p class="temperatura">${apiResponse.current.temperature}℃</p> 
        `)  
        }
      })