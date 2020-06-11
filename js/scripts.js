
function innerTextOnTheirPlace(){
    let xVariable = document.getElementById('number-input').value;
    document.querySelector(".Y").innerText = calculateFibonacci(xVariable);
}
function calculateFibonacci(xVariable) {
    let prev = 0, next = 1;
    for (let i = 0; i < xVariable; i++) {
        let temp = next;
        next = prev + next;
        prev = temp;
    }
    return prev;

}
function calculateFibonacciRecurcion(xVariable) {

    if(n <= 1){
        return xVariable;
    }else{
        return calculateFibonacciRecurcion(xVariable - 1) + calculateFibonacciRecurcion(xVariable - 2);
    }

}




