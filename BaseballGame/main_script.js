var random_pick_val = [];
var tryCnt = 0;

window.onkeydown = (e) => {
    const key = e.key;
    if(key == "Enter") confirm_answer("");
};

function settingGame(flag) {
    var ditc_mode = flag;
    if(ditc_mode == "" || ditc_mode == null) {
        ditc_mode = document.getElementById('main_title_msg').textContent;
    }

    if(ditc_mode === 'Retry') {
        random_pick_val = [];
        tryCnt = 0;

        fn_onOffIput("on");
        fn_changeMsg("main_title", "Play");

        var parentDiv = document.getElementById("input_log");
        while (parentDiv.hasChildNodes()) {
            parentDiv.removeChild( parentDiv.firstChild);
        }

    } else if(ditc_mode === 'Play'){
        var i = 0;
        var ramdom_number = 0;
        var pick_number = [];

        do {
            ramdom_number =  Math.floor(Math.random() * 10);
            if(ramdom_number == 0) { 
                continue;
            } else {
                if(pick_number.indexOf(ramdom_number) < 0) {
                    pick_number[i] = ramdom_number;
                    random_pick_val[i] = ramdom_number;
                    i++;
                } else {
                    continue;
                }
            }
            
        } while (i < 4);

        fn_changeMsg("main_title", "Start");
    } else if(ditc_mode === "Start") {
        var chk_confirm = confirm('게임을 다시 시작하시겠습니까?');
        if(chk_confirm == true) {
            settingGame("Retry");
        }
    }
}

function confirm_answer () {
    var insertVal0 = document.getElementById('first_word').value;
    var insertVal1 = document.getElementById('second_word').value;
    var insertVal2 = document.getElementById('third_word').value;
    var insertVal3 = document.getElementById('fourth_word').value;
    var insertArray = [insertVal0, insertVal1, insertVal2, insertVal3];

    var strike_cnt = 0;
    var ball_cnt = 0;
    for(var i=0; i < random_pick_val.length; i++) {
        if(random_pick_val[i] == insertArray[i]) {
            strike_cnt++;
        } else {
            var compareNum = parseInt(insertArray[i]);
            if(random_pick_val.includes(compareNum)) {
                ball_cnt++;
            }
        }
    }
    
    if(strike_cnt == 4) {
        fn_changeMsg("inning_result", "홈런!! 축하합니다.");
        fn_changeMsg("main_title", "Retry");
        
        fn_onOffIput("off");
    } else {
        var msg = ball_cnt + "볼, " + strike_cnt + "스트라이크"
        fn_changeMsg("inning_result", msg);

        var messageTag = document.createElement("div");
        var message = document.createTextNode(insertVal0+insertVal1+insertVal2+insertVal3);
        messageTag.appendChild(message);
        var logId = "input_log"+tryCnt;
        messageTag.setAttribute("id", logId);

        var parentDiv = document.getElementById("input_log");
        parentDiv.appendChild(messageTag);

        document.getElementById('first_word').focus();
    }

    if(strike_cnt != 4) {
        if(tryCnt == 9) {
            fn_changeMsg("check_times", "아웃!! 재시도 해주세요.");
            fn_changeMsg("main_title", "Retry");

            fn_onOffIput("off");

        } else {
            tryCnt++;

            var msg = tryCnt + " 회";
            fn_changeMsg("check_times", msg);
        }
    }
}

function fn_changeMsg(attachMsg, msg) {
    var messageTag = document.createElement('strong');
    var messageId = "";
    var message = document.createTextNode(msg);
    messageTag.appendChild(message);

    if(attachMsg == "main_title") {
        messageId = "main_title_msg";
    } else if(attachMsg == "inning_result") {
        messageId = "inning_result_msg";
    } else if(attachMsg == "check_times") {
        messageId = "check_times_msg";
    }

    messageTag.setAttribute("id", messageId);
    var former_msg = document.getElementById(messageId);
    var parentDiv = document.getElementById(attachMsg);

    parentDiv.replaceChild(messageTag, former_msg);
}

function fn_onOffIput(flag) {
    if(flag == "on") {
        document.getElementById('first_word').disabled = false;
        document.getElementById('second_word').disabled = false;
        document.getElementById('third_word').disabled = false;
        document.getElementById('fourth_word').disabled = false;

        document.getElementById('first_word').value = null;
        document.getElementById('second_word').value = null;
        document.getElementById('third_word').value = null;
        document.getElementById('fourth_word').value = null;

    } else if (flag == "off") {
        document.getElementById('first_word').disabled = true;
        document.getElementById('second_word').disabled = true;
        document.getElementById('third_word').disabled = true;
        document.getElementById('fourth_word').disabled = true;
    }
}