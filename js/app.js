//Constructor para seguro
function Seguro(marca,anio,tipo){

     this.marca=marca;
     this.anio=anio;
     this.tipo=tipo;

}

Seguro.prototype.cotizarSeguro = function(){
      
     /*
         1 = americano 1.15
         2 = asiatico 1.05
         3 = europeo 1.35
     
     */

     let cantidad;
     const base = 2000;

     switch(this.marca){
             
         case '1':
         cantidad = base * 1.15;
         break;

         case '2':
         cantidad = base * 1.05;
         break;

         case '3':
         cantidad = base * 1.35;
         break;
     }

     //Leer el año
     const diferencia = new Date().getFullYear() - this.anio;
     //Cada año de diferencia hay que reducir 3% el valor del seguro
     cantidad -= ((diferencia*3) * cantidad) / 100;

     /*
        Si el seguro es basico se multiplica por 30% más 
        Si el seguro es completo se multiplica por 50% más 
     
     */

      if(this.tipo === 'basico'){

          cantidad *= 1.30;

      }else{
        
          cantidad *= 1.50;
      }

     
       return cantidad;
}

//todo lo que se muestra
function Interfaz(){}

//Mensaje que se imprime en el HTML
Interfaz.prototype.mostrarMensaje = function(mensaje,tipo){
   
      const div = document.createElement('div');

         if(tipo === 'error'){
            
             //se agregan las clases mensaje y error, la clase mensaje lo usamos para remover el mensaje despues de mostrarse por 3 segundos
             div.classList.add('mensaje','error');
         } else{

             div.classList.add('mensaje','correcto');
         }

         div.innerHTML = `${mensaje}`;
         
         //insertBefore(se agrega el elemento, donde quieres ubicarlo antes de lo que pongas en ese parametros)
         formulario.insertBefore(div, document.querySelector('.form-group'));

         setTimeout(function(){

          document.querySelector('.mensaje').remove();

         },3000);


}

//Imprime el resultado de la cotizacion
//la variable total es el resultado del calculo de cantidad del metodo cotizarSeguro
Interfaz.prototype.mostrarResultado = function(seguro,total){
    
     const resultado = document.getElementById('resultado');
     let marca;

       switch(seguro.marca){

            case "1":
            marca = 'Americano';
            break;

            case "2":
            marca = 'Asiatico';
            break;

            case "3":
            marca = 'Europeo';
            break;

       }

       //Crear un div
       const div = document.createElement('div');
       //Insertar la informacion
       div.innerHTML = `
       
           <p class="header">Tu Resumen:</p>
           <p>Marca: ${marca}</p>
           <p>Año: ${seguro.anio}</p>
           <p>Tipo: ${seguro.tipo}</p>
           <p>Total: $ ${total}</p>
       
       `;
        
        const spinner = document.querySelector('#cargando img');
        //se muestra el spinner cargando despues de enviar el formulario
        spinner.style.display = "block";
        //despues de 3 segundos se oculta el spinner y se muestra el resultado
        setTimeout(function(){
          spinner.style.display = "none";  
          resultado.appendChild(div);
        },3000);
       

}

//EvenListeners

  const formulario = document.getElementById('cotizar-seguro');

  formulario.addEventListener('submit',function(e){
         
        e.preventDefault();

        //leer la marca seleccionada del select
        const marca = document.getElementById('marca');
        const marcaSeleccionada = marca.options[marca.selectedIndex].value;

        //leer el anio seleccionado del select
        const anio = document.getElementById('anio');
        const anioSeleccionado = anio.options[anio.selectedIndex].value;

        //lee el valor del radio button
        const tipo = document.querySelector('input[name="tipo"]:checked').value;        

        //crear instancia de Interfaz (muestra un mensaje si los campos estan vacios o seleccionado o que muestre los resultados)
        const interfaz = new Interfaz();

        //Revisamos que los campos no esten vacios
        if(marcaSeleccionada === '' || anio === '' || tipo === ''){
             
             //Interfaz imprimiendo un error
             interfaz.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo','error');

        }else{

             //Limpiar resultados anteriores 
             const resultados = document.querySelector('#resultado div');
             if(resultados != null){
                 
                 resultados.remove();
             }
              
             //ahora una vez borrado los resultados anteriores con el codigo anterior entonces ahora mostrarmos los resultados que se hagan en el momento
             //Instanciar seguro y mostrar interfaz
             const seguro = new Seguro(marcaSeleccionada,anioSeleccionado,tipo);
             //Cotizar el seguro, el parametro seguro contiene la informacion(marcaseleccionada,anioseleccionado,tipo)
             const cantidad = seguro.cotizarSeguro();
             //Mostrar el resultado
             interfaz.mostrarResultado(seguro,cantidad);
             interfaz.mostrarMensaje('Cotizando...','exito');
             
        }

       
  });


const max = new Date().getFullYear(),
      min = max-20;


const selectAnios = document.getElementById('anio');

     for(let i = max; i > min; i--){
         
          let option = document.createElement('option');

          option.value = i;
          option.innerHTML = i;

          selectAnios.appendChild(option);
     }
