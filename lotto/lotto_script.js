const num_length = parseInt(45);
const lotto_num = Array(num_length).fill(0).map((element, idx) => { return idx +1 });
console.log("lotto_num : " + lotto_num);
const sel_length = parseInt(7);
let sel_num = [];

const $content = document.querySelector("#content");
const $sel_balls = document.querySelector("#sel_balls");
const $result = document.querySelector("#result");
const $sel_btn = document.querySelector("#select");
const $clr_btn = document.querySelector("#clr_select");

$sel_btn.addEventListener('click', (event) => {
    for(let i=0; i < sel_length; i++) {
        const idx = Math.floor(Math.random() * lotto_num.length);
        sel_num.push(lotto_num[idx]);
        lotto_num.splice(idx, 1);
    }
    sel_num.sort((a,b) => a-b);
    console.log(sel_num);

    for(let j=0; j < sel_num.length; j++) {
        setTimeout(() => {
            open_sel_num(sel_num[j]);
        }, (j+1) * 1000);
    }

})

function open_sel_num(num) {
    let ball_color = null;
    if(num < 10) {
        ball_color = "red";
    } else if(num >= 10 && num < 21) {
        ball_color = "blue";
    } else if(num >= 20 && num < 31) {
        ball_color = "green";
    } else if(num >= 30) {
        ball_color = "purple";
    }


    let div = document.createElement('div');
    div.className = 'ball';
    div.innerHTML = num;
    div.style.marginRight = "20px";
    div.style.backgroundColor = ball_color;
    $sel_balls.appendChild(div);
}


