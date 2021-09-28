const num_length = parseInt(3);
const total_num = Array(num_length).fill(0).map((element, idx) => { return idx +1 });
console.log("total_num : " + total_num);
const sel_length = parseInt(3);
let idx = null;
let interval = null;
let pauseInterval = null;
let pauseFlag = true;
let resultFlag = null;
let relWin = 0;
let relLose = 0;
let relNone = 0;

const $start_btn = document.querySelector("#start_btn");
const $com_choice = document.querySelector("#com_choice");
const $my_choice = document.querySelectorAll(".myChoice");
const $result = document.querySelector("#result");

// const $result = document.querySelector("#result");
// const $sel_btn = document.querySelector("#select");
// const $clr_btn = document.querySelector("#clr_select");

$start_btn.addEventListener('click', (e) => {
    fn_callIntervalAct();
    //sel_num.push(idx);
    
});

for(const myChoice of $my_choice) {
    myChoice.addEventListener('click', (e) => {
        //console.log('멈춰');
        fn_showResult(myChoice.id);
        pauseFlag = true;
        clearInterval(interval);
        pauseInterval = setInterval(fn_callIntervalAct, 500);
    })
};

function fn_callIntervalAct() {
    if(pauseFlag == true) {
        clearInterval(pauseInterval);
    } else {
        pauseFlag == false;
    }

    interval = setInterval(fn_sel_rsp, 80);
}

function fn_sel_rsp() {
    idx = Math.floor(Math.random() * total_num.length);
    //console.log(idx);

    let $comChoice = document.querySelector(".comChoice");
    if( $comChoice != null ) {
        $comChoice.remove();
    }
    
    let img = null;
    let div = document.createElement('div');
    div.className = 'comChoice';

    if(idx == 0) {
        img = document.createElement('img');
        img.src = './gawe.png'

    } else if(idx == 1) {
        img = document.createElement('img');
        img.src = './bawe.png'

    } else if(idx == 2) {
        img = document.createElement('img');
        img.src = './bo.png'
    }

    div.appendChild(img);
    $com_choice.appendChild(div);

}

function fn_showResult(val) {
    if(val == "sel_seasor") {
        if( idx == 0 ) {// 무승부
            resultFlag = 2;
            relNone += 1;
        } else if( idx == 1 ) {// 패배
            resultFlag = 0;
            relLose += 1;
        } else if( idx == 2 ) {// 승리
            resultFlag = 1;
            relWin += 1;
        }
    } else if (val == "sel_rock") {
        if( idx == 0 ) {
            resultFlag = 1;
            relWin += 1;
        } else if( idx == 1 ) {
            resultFlag = 2;
            relNone += 1;
        } else if( idx == 2 ) {
            resultFlag = 0;
            relLose += 1;
        }
    } else if (val == "sel_paper") {
        if( idx == 0 ) {
            resultFlag = 0;
            relLose += 1;
        } else if( idx == 1 ) {
            resultFlag = 1;
            relWin += 1;
        } else if( idx == 2 ) {
            resultFlag = 2;
            relNone += 1;
        }
    }

    let $results = document.querySelector(".results");
    if( $results != null ) {
        $results.remove();
    }

    let span = document.createElement('span');
    span.className = 'results';
    span.innerHTML = relWin + '승 //' + relLose + '패 // ' + relNone + '무승부';

    $result.appendChild(span);
}


