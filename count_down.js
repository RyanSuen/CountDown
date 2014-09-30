var WINDOW_WIDTH = 1024,
    WINDOW_HEIGHT = 768,
    RADIUS = 8,
    MARGIN_TOP = 60,
    MARGIN_LEFT = 30,
    endTime = new Date(2014, 9, 3, 18, 47, 52),
    curShowTimeSeconds = 0,
    balls = [],
    colors = ['#eb6b60','#7d90d2','#62bcde','#87d6da','#e9eb60','#ad754c',
              '#ad544c','#606e9c','#4d8ca4','#679ea1','#acad4c','#eb9b60',
              '#f3a6a0','#b1bce4','#a1d7eb','#b7e6e9','#f2f3a0','#f3c3a0',
              '#f9d2cf','#d8ddf1','#d0ebf5','#dbf3f4','#f8f9cf','#f9e1cf'
    ];

$(function() {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d');
    console.log(document.body.clientWidth, document.body.clientHeight);
    canvas.width = WINDOW_WIDTH;//document.body.clientWidth;
    canvas.height = WINDOW_HEIGHT;//document.body.clientHeight;

    curShowTimeSeconds = getCurrentShowTimeSeconds();

    setInterval(function() {
        clear(context);
        render(context);
        update();
    }, 50);
});

function update() {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds(),
        nextHours = parseInt(nextShowTimeSeconds/3600),
        nextMinutes = parseInt((nextShowTimeSeconds - (nextHours*3600))/60),
        nextSeconds = nextShowTimeSeconds%60;

    var curHours = parseInt(curShowTimeSeconds/3600),
        curMinutes = parseInt((curShowTimeSeconds - (curHours*3600))/60),
        curSeconds = curShowTimeSeconds%60;

    if(nextSeconds !== curSeconds ) {
        if(parseInt(curHours/10) !== parseInt(nextHours/10)) {
            addBalls(MARGIN_LEFT +0, MARGIN_TOP, parseInt(curHours/10));
        }
        if(parseInt(curHours%10) !== parseInt(nextHours%10)) {
            addBalls(MARGIN_LEFT +15*(RADIUS + 1), MARGIN_TOP, parseInt(curHours%10));
        }

        if(parseInt(curMinutes/10) !== parseInt(nextMinutes/10)) {
            addBalls(MARGIN_LEFT +39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes/10));
        }
        if(parseInt(curMinutes%10) !== parseInt(nextMinutes%10)) {
            addBalls(MARGIN_LEFT +54*(RADIUS + 1), MARGIN_TOP, parseInt(curMinutes%10));
        }

        if(parseInt(curSeconds/10) !== parseInt(nextSeconds/10)) {
            addBalls(MARGIN_LEFT +78*(RADIUS + 1), MARGIN_TOP, parseInt(curSeconds/10));
        }
        if(parseInt(curSeconds%10) !== parseInt(nextSeconds%10)) {
            addBalls(MARGIN_LEFT +93*(RADIUS + 1), MARGIN_TOP, parseInt(curMinutes%10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();

}

function updateBalls() {
    for(var i = 0; i < balls.length; i ++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if(balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy*0.75;
        }
    }

    var cnt = 0;
    for(var i = 0; i < balls.length; i++) {
        if(balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH) {
            balls[cnt++] = balls[i]
        }
    }

    while(balls.length > Math.min(300,cnt)) {
        balls.pop();
    }
}

function addBalls(x, y, a) {
    for(var i = 0; i < digit[a].length; i ++)
        for(var j = 0; j < digit[a][i].length; j ++) {
            if(digit[a][i][j] === 1) {
                var aBall = {
                    x: x + j*2*(RADIUS + 1) + (RADIUS + 1),
                    y: y + i*2*(RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random()*1000))*6,
                    vy: -5,
                    color: colors[Math.floor(Math.random()*colors.length)]
                };
                balls.push(aBall);
            }
        }
}

function getCurrentShowTimeSeconds () {
    var curTime = new Date(),
        ret = endTime.getTime() -curTime.getTime();
    ret = Math.round(ret/1000);
    return ret >= 0 ? ret : 0;
}

function clear(cxt) {
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
}

function render(cxt) {
    var hours = parseInt(curShowTimeSeconds/3600),
        minutes = parseInt((curShowTimeSeconds - (hours*3600))/60),
        seconds = curShowTimeSeconds%60;
    renderDigit(MARGIN_LEFT , MARGIN_TOP, parseInt(hours/10),cxt);
    renderDigit(MARGIN_LEFT + 15*(RADIUS + 1), MARGIN_TOP, parseInt(hours%10), cxt);
    renderDigit(MARGIN_LEFT + 30*(RADIUS + 1), MARGIN_TOP,10, cxt);
    renderDigit(MARGIN_LEFT + 39*(RADIUS + 1), MARGIN_TOP, parseInt(minutes/10), cxt);
    renderDigit(MARGIN_LEFT + 54*(RADIUS + 1), MARGIN_TOP, parseInt(minutes%10), cxt);
    renderDigit(MARGIN_LEFT + 69*(RADIUS + 1), MARGIN_TOP,10, cxt);
    renderDigit(MARGIN_LEFT + 78*(RADIUS + 1), MARGIN_TOP, parseInt(seconds/10), cxt);
    renderDigit(MARGIN_LEFT + 93*(RADIUS + 1), MARGIN_TOP, parseInt(seconds%10), cxt);

    for(var i = 0; i < balls.length; i ++) {
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y,RADIUS, 0, Math.PI*2,true);
        cxt.closePath();
        cxt.fill();
    }
}

function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = 'green';
    for(var i = 0; i < digit[num].length; i ++) {
        for(var j = 0; j < digit[num][i].length; j ++) {
            if(digit[num][i][j] === 1) {
                cxt.beginPath();
                cxt.arc(x + j*2*(RADIUS + 1) + (RADIUS + 1), y + 2*i*(RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2*Math.PI, false);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}
















