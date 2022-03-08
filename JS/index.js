let num1 = '0';
let num2 = '';
let op = '';
let num1Ready = false;
let result = "";
let history = [];

function input(nb) {
    if (result != '') {
        num1 = '';
    }
    if (num1 == "0" && op == '') {
        num1 = "";
    }
    if (!num1Ready) {
        num1 += nb;
    } else {
        num2 += nb;
    }
    result = "";
    updateMessage();
}

function operation(_op) {
    num1Ready = true;
    op = _op;
    result = "";
    updateMessage();
}

//gg
function clear_input() {
    if (!num1Ready) {
        num1 = num1.slice(0, num1.length - 1);
        if (num1 == '') {
            num1 = '0';
        }
    } else if (num2 != '') {
        num2 = num2.slice(0, num2.length - 1);
    } else {
        op = '';
    }
    updateMessage();
}

function calculation(_enter) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch (op) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        case '':
            result = num1;
            num2 = '';
            break;
    } 
    if (isNaN(result) == true) {
        result = 'Calculation is not possible';
    } 
    app.addHistory({num1, op, num2, result});
    if (isNaN(result) == true) {
        result = 0;
    }
    num1 = result;
    num2 = '';
    op = '';
    num1Ready = false;
    updateMessage();
}

function updateMessage() {
    var el = document.getElementById('number');
    if (result == "") {
        el.innerText = (num1 + op + num2);
    } else {       
        el.innerText = result;
    }
}
updateMessage();

window.app = new Vue({
    el:"#appHistory",
    data:{
        history:[]
    }, 
    methods: {
        addHistory(historyItem) {
            this.history.push(historyItem)
        },

        selectHistoryItem(index) {
            num1 = this.history[index].num1.toString()
            op = this.history[index].op.toString()
            num2 = this.history[index].num2.toString()
            result = '';
            num1Ready = true;
            updateMessage()
        }
    }
})

