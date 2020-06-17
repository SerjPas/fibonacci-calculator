let output = document.querySelector('#place-for-result');
let loaders = document.querySelectorAll('.loader');
let errorMoreThan50 = document.querySelector('.error50');
let error42 = document.querySelector('#error42');
let listOfResults = document.getElementById('list-of-results');


async function callServer(validInput) {
    const SERVER_URL = `http://localhost:5050/fibonacci/${validInput}`;
    loaderShow(loaders);
    hideResult();
    if (error42.classList.contains('is-present')) {
        error42.classList.add('d-none');
    }
    return await fetch(SERVER_URL)
        .then(function (response) {
            return validateResponse(response);
        })
        .then(function (data) {
            console.log(data);
            showResult();
            loaderHide(loaders);
            return data.result
        });
}



function callResultsOnPageLoad() {
    const SERVER_URL = `http://localhost:5050/getFibonacciResults`;
    fetch(SERVER_URL)
        .then(function (response) {
            return validateResponse(response);
        })
        .then(function (data) {
            sortingArray(data);
            let ulHtml = '';
            for (let newArr of data.results) {
                let date = new Date(newArr.createdDate).toString(); // Converting milliseconds to a date
                ulHtml += `<li> The Fibonacci Of ${newArr.number} is
                        ${newArr.result}. Calculated at: ${date}.</li>`;
            }
            document.getElementById("list-of-results").innerHTML = ulHtml;
        });
}

function sortingArray(data) {
    data.results.sort((a, b) => b.createdDate - a.createdDate); //sorting array
}

function hideResult() {
    output.classList.add('d-none');
}

function showResult() {
    output.classList.remove('d-none');
}

function loaderShow(loaders) {
    for (const loader of loaders) {
        loader.classList.remove('d-none');
    }

}

function loaderHide(loaders) {
    for (const loader of loaders) {
        loader.classList.add('d-none');
    }
}

function validateResponse(response) {
    if (!response.ok) {
        response.text()
            .then(function (text) {
                error42.innerText = `Server error: ${text}`;
                error42.setAttribute("class", "is-present");
                output.classList.add('d-none');
                loaderHide(loaders);
            });
    }
    return response.json();
}


function refreshResults() {
    listOfResults.innerHTML = "";
    callResultsOnPageLoad();

}

function calcFibonacciLocal(validInput) {
    let prev = 0, next = 1;
    for (let i = 0; i < validInput; i++) {
        let temp = next;
        next = prev + next;
        prev = temp;
    }
    return prev;
}

function checkThatError50presented() {
    if (!errorMoreThan50.classList.contains("d-none")) {
        errorMoreThan50.classList.add("d-none")
    }
}

function validateInput(input) {
    checkThatError50presented();
    if (input <= 50) {
        showResult();
        return input;
    } else {
        hideResult();
        errorMoreThan50.classList.remove('d-none');
        loaderHide(loaders);
    }

}

function getInput() {
    return document.querySelector('#number-input').value;
}

async function fibonacci(event) {
    let myInput = getInput();
    let validInput = validateInput(myInput)
    event.preventDefault();
    let check = document.getElementById('check');
    if (check.checked) {
        output.innerText = await callServer(validInput);
        await refreshResults();

    } else {
        output.innerText = calcFibonacciLocal(validInput);
    }

}

let form = document.getElementById('calcFiboButton');
form.addEventListener("submit", fibonacci);
document.addEventListener('DOMContentLoaded', callResultsOnPageLoad);
