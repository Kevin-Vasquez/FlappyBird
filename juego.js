// definimos el contexto para tener acceso al lienzo o canvas
var contexto = document.getElementById("lienzoJuego")
var ctx = contexto.getContext("2d")
var WIDTH = 300;
var HEIGHT = 530;
var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 530;
contexto.width = WIDTH;
contexto.height = HEIGHT;

var score = 0
var FPS =60
var gravedad = 1.5
var personaje = {
    x:50,
    y:150,
    w:50,
    h:50
}

//creando array para tuberias
var tuberias = new Array()
tuberias[0] = {
    x:contexto.width,
    y:0
}

// VARIABLES IMAGENES
var bird = new Image()
bird.src = "imagenes/bird.png"
var background = new Image()
background.src = "imagenes/background.png"
var tuberiaNorte = new Image()
tuberiaNorte.src = "imagenes/tuberiaNorte.png"
var tuberiaSur = new Image()
tuberiaSur.src = "imagenes/tuberiaSur.png"
var suelo = new Image()
suelo.src = "imagenes/suelo.png"

//VARIABLES SONIDOS
var punto = new Audio()
punto.src = "audios/punto.mp3"


// CONTROL PARA QUE EL PERSONAJE SUBA
function keyDown(){
    personaje.y -= 25
}
resize()
function resize(){
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;
    
    contexto.width = WIDTH;
    contexto.height = HEIGHT;
    
    contexto.style.height = ""+CANVAS_HEIGHT+"px";
    //contexto.style.width = ""+CANVAS_WIDTH+"px";
}

// hacemos funcionar el loop
setInterval(loop,1000/FPS)

function loop() {
    // clearRect es para limpiar el rectangulo y no se alarge hasta abajo
    ctx.clearRect(0,0,300,530)

    
    //**FONDO**
    ctx.drawImage(background,0,0)

    //**SUELO**
    // realizamos la operacion para que el suelo se acople a la parte baja del fondo
    ctx.drawImage(suelo,0,contexto.height - suelo.height)

    //**PERSONAJE**
    /* buscamos el contexto donde se va a dibujar el personaje, rellenamos y buscamos color
    contexto.fillStyle = "rgba(100,0,0,1)"
    rellenamos rectangulo en la posicion del canvas
    contexto.fillRect(personaje.x,personaje.y,personaje.w,personaje.h) */
    ctx.drawImage(bird,personaje.x,personaje.y)
    
    //**TUBERIAS**
    for (var i = 0; i < tuberias.length; i++) {
        var constante = tuberiaNorte.height + 125
        ctx.drawImage(tuberiaNorte,tuberias[i].x,tuberias[i].y)
        ctx.drawImage(tuberiaSur,tuberias[i].x,tuberias[i].y + constante)
        tuberias[i].x--

        //mejorando la creacion de tuberias
        if (tuberias[i].y + tuberiaNorte.height < 80) {
            tuberias[i].y == 0
        }

        //condicion para generar las tuberias
        if (tuberias[i].x == 125) {
            tuberias.push({
                x:contexto.width,
                y: Math.floor(Math.random()*tuberiaNorte.height) - tuberiaNorte.height
            })
        }

        //condicion para 
        //COLISIONES
        if(personaje.x + bird.width >= tuberias[i].x &&
            personaje.x <= tuberias[i].x + tuberiaNorte.width &&
            (personaje.y <= tuberias[i].y + tuberiaNorte.height || 
                personaje.y + bird.height >= tuberias[i].y + constante)
                || personaje.y + bird.height >= contexto.height - suelo.height){
            location.reload()
        }
        if(tuberias[i].x == personaje.x){
            score++
            punto.play()
        }
    }

    //**CONDICIONES**
    // el personaje siempre va a caer
    personaje.y += gravedad

    //score
    ctx.fillStyle = "rgba()0,0,0,1"
    ctx.font = "25px Arial"
    ctx.fillText("Score: "+score,10,contexto.height - 10)
}


//**EVENTOS**

//la funcion para redimensionar
window.addEventListener("resize",resize)

// la funcion keydown es utilizada para escuchar el evento de presionar una tecla
// evento en la ventana - funcion a realizar
window.addEventListener("keydown", keyDown)
