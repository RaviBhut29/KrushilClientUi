var speed = 30;
var Yearspeed = 400;
let IsCount = true;

window.addEventListener('scroll', ScrollFunction);
function ScrollFunction() {
    if (document.documentElement.scrollTop > 2754 && IsCount) {
        incEltNbr("projectDone");
        incYearEltNbr("yearsExper");
        incEltNbr("happyCus");
        IsCount = false;
    }

    if (!IsCount) {
        window.removeEventListener('scroll', ScrollFunction);
    }
}

$(document).ready(function () {

    incEltNbr("projectDone");
    incYearEltNbr("yearsExper");
    incEltNbr("happyCus");

})

function incEltNbr(id) {
    const elt = document.getElementById(id);
    const endNbr = Number(document.getElementById(id).innerHTML);
    incNbrRec(0, endNbr, elt);
}

function incNbrRec(i, endNbr, elt) {
    if (i <= endNbr) {
        elt.innerHTML = elt.id == 'happyCus' ? i + '%' : i;
        setTimeout(function () {//Delay a bit before calling the function again.
            incNbrRec(i + 1, endNbr, elt);
        }, speed);
    }
}

function incYearEltNbr(id) {
    const elt = document.getElementById(id);
    const endNbr = Number((document.getElementById(id).innerHTML).split('+')[0]);
    incYearNbrRec(0, endNbr, elt);
}

function incYearNbrRec(i, endNbr, elt) {
    if (i <= endNbr) {
        elt.innerHTML = i + '+';
        setTimeout(function () {//Delay a bit before calling the function again.
            incYearNbrRec(i + 1, endNbr, elt);
        }, Yearspeed);
    }
}
/*JS*/