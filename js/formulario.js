const contenedorFormulario = $('#divFormulario');
const contenedorClientes = $('#divClientes');
let clientes = [];

if (localStorage.getItem('clientes')) {
    let clientes = JSON.parse(localStorage.getItem('clientes'));
    crearCard(clientes, contenedorClientes);
}

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
                                        <input id="apellido" name="name" type="text" placeholder="Apellido"
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


                                <div class="form-group">
                                    <div class="col-md-12 text-center">
                                        <button type="submit" class="btn btn-primary btn-lg">Submit</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
`);
}

crearFormulario(contenedorFormulario);


const formulario = $('#formulario');
const inputNombre = $('#nombre');
const inputApellido = $('#apellido');
const inputEmail = $('#email');
const inputTelefono = $('#telefono');
const selectCamaras = $('#selCam');
const selectSatelital = $('#selSat');

formulario.submit(validarFormulario);

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
    if (selectCamaras.val() === '') {
        alert('Ingrese una opción correcta')
        selectCamaras.focus();
        return false;
        
    }
    if (selectSatelital.val() === '') {
        alert('Ingrese suna opción correcta')
        selectSatelital.focus();
        return false;
        
    }
  
  let nombre = inputNombre.val();
let apellido = inputApellido.val();
let email = inputEmail.val();
let telefono = inputTelefono.val();
let camaras = selectCamaras.val();
let satelital = selectSatelital.val();  

formulario[0].reset();

crearCliente(nombre, apellido, email, telefono, camaras, satelital);

}

function crearCliente(nombre, apellido, email, telefono, camaras, satelital){

    let cliente = new Cliente(nombre, apellido, email, telefono, camaras, satelital);
    clientes.push(cliente);

    guardarLocalStorage('clientes', clientes);
    clientes = recuperarLocalStorage('clientes');
    crearCard(clientes, contenedorClientes);
}

function guardarLocalStorage(clave, valor){
    localStorage.setItem(clave, JSON.stringify(valor));
}

function recuperarLocalStorage(clave){
    const clientes = JSON.parse(localStorage.getItem(clave));
    return clientes
}


function crearCard(clientes, contenedor){

    contenedor.html('');

    $(clientes).each((index, cliente) =>{

        contenedor.append(

            `
            <h3>Datos Cliente</h3>
            <div id="contenedorCard" class="card border-secondary mb-3" style="max-width: 18rem;">
                <div class="card-header">Nombre completo: ${cliente.nombre} ${cliente.apellido}</div>
                <div class="card-body text-secondary">
                    <h5 class="card-title">Telefono: ${cliente.telefono}</h5>
                    <p class="card-text">Email: ${cliente.email}</p>
                    <p class="card-text">Cantidad de Camaras ${cliente.camaras}</p>
                    <p class="card-text">Satelital: ${cliente.satelital}</p>
                </div>
            </div>    
        `
        );
    });
}



  
$("#nombre, #apellido, #email, #telefono, #camaras, #satelital").hover(function(){
  
    $(this).css("background-color", "lightblue");
  }, function(){

    $(this).css("background-color", "white");
  });  
  
 


         