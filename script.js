const canvas = document.getElementById('myCanvas'); 
const canvas_dimension = canvas.getContext('2d');


const arr = [
    { x: 100, y: 80, radius: 30, color: 'yellow', arrowX: 400, afterHit: 'darkgrey' },
    { x: 100, y: 160, radius: 30, color: 'blue', arrowX: 400, afterHit: 'darkyellow' },
    { x: 100, y: 240, radius: 30, color: 'red', arrowX:400, afterHit: 'darkblue' },
    { x: 100, y: 320, radius: 30, color: 'green', arrowX: 400, afterHit: 'darkred' },
];

let animationIds = Array(arr.length).fill(null);


function drawAllThings() 
{
    canvas_dimension.clearRect(0, 0, canvas.width, canvas.height);
//circle
    arr.forEach((args, i) => {
        canvas_dimension.beginPath();
        canvas_dimension.arc(args.x, args.y, args.radius, 0, Math.PI * 2);
        canvas_dimension.fillStyle = args.color;
        canvas_dimension.fill();
        canvas_dimension.closePath();

    //Arrow line
        canvas_dimension.beginPath();
        canvas_dimension.moveTo(args.arrowX, args.y); 
        canvas_dimension.lineTo(args.arrowX + 20, args.y); 
        canvas_dimension.strokeStyle = 'black';
        canvas_dimension.lineWidth = 1;
        canvas_dimension.stroke();

    //Arrow Head
        canvas_dimension.beginPath();
        canvas_dimension.moveTo(args.arrowX, args.y); 
        canvas_dimension.lineTo(args.arrowX + 10, args.y - 5); 
        canvas_dimension.lineTo(args.arrowX + 10, args.y + 5); 
        canvas_dimension.closePath();
        canvas_dimension.fillStyle = 'black';
        canvas_dimension.fill();
    });
}


function isInargs(x, y, args) 
{
    const dx = x - args.x;
    const dy = y - args.y;
    return dx * dx + dy * dy <= args.radius * args.radius; 
}

function animateArrow(i) {
    if (arr[i].arrowX > arr[i].x + arr[i].radius) {
        arr[i].arrowX -= 2;
        drawAllThings();
        animationIds[i] = requestAnimationFrame(() => animateArrow(i));
    } else {
        arr[i].color = arr[i].afterHit;
        drawAllThings();
    }
}

function reset() {
    arr.forEach((args, i) => {
        args.arrowX = 400;
        args.color = args.color.replace('dark', ''); 
        if (animationIds[i]) {
            cancelAnimationFrame(animationIds[i]);
            animationIds[i] = null;
        }
    });
    drawAllThings();
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    arr.forEach((args, i) => {
        if (isInargs(x, y, args)) {
            if (!animationIds[i]) {
                animateArrow(i);
            }
        }
    });
});

document.getElementById('reset-btn').addEventListener('click', reset);

drawAllThings();
