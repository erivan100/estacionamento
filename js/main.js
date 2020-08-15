document.getElementById('formulario').addEventListener('submit', cadastraVeiculo);

function cadastraVeiculo(e){
    var modeloCarro = document.getElementById('modeloCarro').value;
    var placaCarro = document.getElementById('placaCarro').value;
    var time = new Date(); // instanciar variavel date- data - captura informacaoes realcionado a data
    
    if(!modeloCarro && !placaCarro){
        alert("Por favor, preencha os campos em branco!");
        return;
    }
    
    //criando objeto json carro
    carro = {
        // atributos
        modelo: modeloCarro,
        placa: placaCarro,
        hora: time.getHours(),
        minutos: time.getMinutes()

    }
    


    console.log(carro);

        //tem que ser armazenado como string e não como objeto no storage do navegador
         if(localStorage.getItem('patio2') === null){
         var carros = [];  //carros é um array
         carros.push(carro);
         localStorage.setItem('patio2', JSON.stringify(carros));
         }else{
             var carros = JSON.parse(localStorage.getItem('patio2'));
             carros.push(carro);
             localStorage.setItem('patio2',JSON.stringify(carros));
         }

         mostraPatio();

     e.preventDefault();
}


function apagarVeiculo(placa){
    var carros = JSON.parse(localStorage.getItem('patio2')); //recupera carros patio2
    //percorrer o array, vai fazer verificao
    for(var i = 0; i < carros.length; i++){
        if(carros[i].placa == placa){
            carros.splice(i,1);
        }

        localStorage.setItem('patio2', JSON.stringify(carros));
    }
    document.getElementById('formulario').reset(); //limpa a caixa ao clicar em adicionar

    mostraPatio();
}

function mostraPatio(){
    var carros = JSON.parse(localStorage.getItem('patio2'));
    var carrosResultado = document.getElementById('resultados');

    carrosResultado.innerHTML = '';

    for(var i = 0; i < carros.length; i++){
        var modelo = carros[i].modelo;
        var placa = carros[i].placa;
        var hora = carros[i].hora;
        var minutos = carros[i].minutos;

        //preencher innerHTML
        carrosResultado.innerHTML += '<tr><td>' + modelo +
                                '</td><td>' + placa +
                                '</td><td>' + hora + ' : ' + minutos +  
                                '</td><td><button class="btn btn-danger" onclick="apagarVeiculo(\'' + placa + '\')">Excluir</button></td>' +
                                '</tr>';

    }
}