const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 150;
canvas.height = 500;


let draw_color = "black";
let draw_width = "2";
let IsDrawing = false;
let start_color = "rgb(177 177 177)"

let restore_arr = []
let index = -1;

const context = canvas.getContext("2d");
context.fillStyle = start_color; //we'll use this context to draw 
context.fillRect(0, 0, canvas.width, canvas.height);



// change_color function

function change_color(element) {
    draw_color = element.style.background;
}

//touch for mobile and mouse for laptop devices 

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false); //during touchmove we'll call the draw function
canvas.addEventListener("mousedown", start, false); //When the mousedown event happens (the user clicks and holds the mouse button down) we'll set the isPainting variable to true
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

// start and draw function 

function start(event) {
    IsDrawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop);
    event.preventDefault();
}

function draw(event) {
    if (IsDrawing) {
        context.lineTo(event.clientX - canvas.offsetLeft,
            event.clientY - canvas.offsetTop)

        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();

    }
    event.preventDefault();
}

function stop(e) {
    if (IsDrawing) {
        context.stroke();
        context.closePath();
        IsDrawing = false;
    }
    e.preventDefault();

    if (e.type != 'mouseout') {
        restore_arr.push(context.getImageData(0, 0, canvas.width, canvas.height))
        index += 1;
    }


    console.log(restore_arr)
}

function clear_canvas() {
    context.fillStyle = start_color;
    context.clearRect(0, 0, canvas.width, canvas.height); l
    context.fillRect(0, 0, canvas.width, canvas.height); l

    restore_arr=[]
    index = -1;


}

function Undo_canvas() {
    if (index < 0) {
        clear_canvas()

    }
    else{
        index -=1
        restore_arr.pop()
        context.putImageData(restore_arr[index],0,0)
    }
}