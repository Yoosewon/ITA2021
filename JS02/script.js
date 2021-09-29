const textDis = {    
    'checkNum' : /[0-9]/,
    'checkEngAll': /[a-zA-Z]/,
    'checkSpc': /[~!@#$%^&*()_+|<>?:{}]/,
    'checkKor': /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
}

const fileClass = "fileExist";

let $title = document.querySelector('#title');
let $joinFee = document.querySelectorAll('.joinFee');
let $titleTextSize = document.querySelector('#titleTextSize');
let $location = document.querySelector('#location');
let $position = document.querySelectorAll('.position');
let $regFile  = document.querySelector('#regFile');
let $attached = document.querySelector('.attached');
let $regForm = document.querySelector('#regForm');
let $tbody = document.querySelector('tbody');
let $table_responsive = document.querySelector('.table-responsive');
let $trash = document.querySelectorAll('.ico-trash');
let chkMaxTitleSize = 0;

document.addEventListener("DOMContentLoaded", function(){
    $table_responsive.style.display = 'none';
});

$title.addEventListener('keyup', () => {

    let titleTextSize = 0;
    let titleText = $title.value;

    for(let i=0; i < titleText.length; i++) {
        if(textDis.checkEngAll.test(titleText[i]) === true) {
            titleTextSize += 1;
        } else if(textDis.checkSpc.test(titleText[i]) === true) {
            titleTextSize += 2;
        } else if(textDis.checkKor.test(titleText[i]) === true) {
            titleTextSize += 2;
        } else if(textDis.checkNum.test(titleText[i]) === true) {
            titleTextSize += 1;
        } else {
            titleTextSize += 1;
        }
    }

    $titleTextSize.innerHTML ='( '+titleTextSize+' / 200 )';
    chkMaxTitleSize = titleTextSize;
});

$regFile.addEventListener('change', (e) => {
    $attached.innerHTML = e.target.files[0].name;
});

$regForm.addEventListener('click', (e) => {
    let title = null;
    let joinFee = null;
    let location = null;
    let position = "";
    let fileExist = null;

    title = $title.value;

    for(const fee of $joinFee){
        if(fee.checked == true) {
            joinFee = fee.id;
        }
    }

    location = $location.value;

    for(const pos of $position) {
        if(pos.checked == true) {
            position += pos.id+",";
        } 
    }

    if($regFile.value !== null && $regFile.value !== "") {
        fileExist = 1;
    }

    let parameter = [title, joinFee, location, position, fileExist];
    let result = 0;
    for(let i=0; i < (parameter.length -1); i++) {
        if(parameter[i] === null || parameter[i] === '') {
            result += fn_showErrMsg(1, i);
            continue;
        } else {
            fn_showErrMsg(0, i);
        }
    }

    if(result !== 0) {
        alert("필수입력 사항을 입력해주시기 바랍니다.");
    } else {
        /*입력값 변환*/
        joinFee = joinFee === 'payment' ? '유료' : '무료';
        
        let posArr = position.split(',').sort((a,b) => a-b);
        console.log(posArr.length);
        let positionKor = '';
        for(let i=0; i < posArr.length-1; i++) {
            if(posArr[i] === 'developer') {
                positionKor += '개발자';
            } else if(posArr[i] === 'teamLeader') {
                positionKor += '팀장';
            } else if(posArr[i] === 'secLeader') {
                positionKor += '과장';
            } else if(posArr[i] === 'depLeader') {
                positionKor += '부장';
            }
            
            positionKor += ', ';
        }

        positionKor = positionKor.substring(0, positionKor.length-2);


        /*리스트 추가*/
        let tr = document.createElement('tr');
        let titleTd = document.createElement('td');
        let positionTd = document.createElement('td');
        let locationTd = document.createElement('td');
        let joinFeeTd = document.createElement('td');
        let fileTd = document.createElement('td');
        let delTd = document.createElement('td');

        titleTd.className = 'title';
        titleTd.innerHTML = title;
        tr.appendChild(titleTd);

        positionTd.innerHTML = positionKor;
        tr.appendChild(positionTd);

        locationTd.innerHTML = location;
        tr.appendChild(locationTd);

        joinFeeTd.innerHTML = joinFee;
        tr.appendChild(joinFeeTd);
        
        if( fileExist === 1) {
            let downA = document.createElement('a');
            downA.className = 'ico-down';
            downA.href = '#a'
            fileTd.appendChild(downA);
        }
        tr.appendChild(fileTd);

        let delA = document.createElement('a');
        delA.className = 'ico-trash';
        delA.href = '#a'
        delA.setAttribute('onclick', 'javascript:test(this)');
        delTd.appendChild(delA);
        tr.appendChild(delTd);

        $tbody.prepend(tr);
        $table_responsive.style.display = '';

        /*입력값 초기회*/
        $title.value = "";
        $titleTextSize.innerHTML ='( 0 / 200 )';
        $location.value = "";
        $attached.innerHTML = "파일첨부";

        for(const fee of $joinFee){
            if(fee.id == 'payment') {
                fee.checked = true;
            } else {
                fee.checked = false;
            }
        }
        for(const pos of $position) {
            pos.checked = false;
        }
    }
});

function fn_showErrMsg(idx, val) {
    let returnVal = 0;
    switch (val) {
        case 0:
            returnVal = fn_madErrMsg(idx, "#required1");
            break;

        case 1:
            returnVal = fn_madErrMsg(idx, "#required2");
            break;

        case 2:
            returnVal = fn_madErrMsg(idx, "#required3");
            break;

        case 3:
            returnVal = fn_madErrMsg(idx, "#required4");
            break;
    
        default:
            break;
    }

    return returnVal;
}

function fn_madErrMsg(idx, id) {
    let $require = document.querySelector(id);
    let color = '';
    let returnVal = 0;

    idx == 1 ? color = 'red' : color = 'black';
    idx == 1 ? returnVal = 1 : returnVal = 0;

    $require.style.color = color;
    return returnVal;
}

function test(i) {
    i.parentNode.parentNode.remove();
}