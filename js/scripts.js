(() => {
    let output = document.querySelector('#place-for-result');
    let loaders = document.querySelectorAll('.loader');
    let errorMoreThan50 = document.querySelector('.error50');
    let error42 = document.querySelector('#error42');
    let listOfResults = document.getElementById('list-of-results');
    let select = document.getElementById('FormControlSelect');
    let form = document.getElementById('calcFiboButton');
    let checkBox = document.getElementById('check');

    async function callServer(validInput) {
        const SERVER_URL = `http://localhost:5050/fibonacci/${validInput}`;
        loaderShow(loaders);
        hideResult();
        checkThatErrorPresented();
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

    const convertDate = (newArr) => {                        // Converting milliseconds to a date
        return new Date(newArr.createdDate).toString();
    }

    const showResultOnPage = (array) => {
        let ulHtml = '';
        for (let newArr of array) {
            let date = convertDate(newArr);
            ulHtml += `<li> The Fibonacci Of ${newArr.number} is
                        ${newArr.result}. Calculated at: ${date}.</li>`;
        }
        document.getElementById("list-of-results").innerHTML = ulHtml;
    }

    const callResultsOnPageLoad = () => {
        listOfResults.innerHTML = "";
        const SERVER_URL = `http://localhost:5050/getFibonacciResults`;
        fetch(SERVER_URL)
            .then(function (response) {
                return validateResponse(response);
            })
            .then(function (data) {
                let sortedArray = sortingArray(data);
                showResultOnPage(sortedArray);
            });
    }

    const sortingArray = (data) => {
        let newArray;
        console.log(select.value);
        console.log(typeof select.value)
        switch (select.value) {
            case "1":
                newArray = data.results.sort((a, b) => a.number - b.number);
                break;
            case "2":
                newArray = data.results.sort((a, b) => b.number - a.number);
                break;
            case "3":
                newArray = data.results.sort((a, b) => {
                    return a.createdDate - b.createdDate
                });
                break;
            default:
                newArray = data.results.sort((a, b) => b.createdDate - a.createdDate);
        }
        return newArray;
    }

    const hideResult = () => { // make it generic
        output.classList.add('d-none');
    }

    const showResult = () => {
        output.classList.remove('d-none');
    }

    const loaderShow = (loaders) => {
        for (const loader of loaders) {
            loader.classList.remove('d-none');
        }
    }

    const loaderHide = (loaders) => {
        for (const loader of loaders) {
            loader.classList.add('d-none');
        }
    }

    const validateResponse = (response) => {
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

    const calcFibonacciLocal = (validInput) => {
        let prev = 0, next = 1;
        for (let i = 0; i < validInput; i++) {
            let temp = next;
            next = prev + next;
            prev = temp;
        }
        return prev;
    }

    const checkThatErrorPresented = () => {
        if (!errorMoreThan50.classList.contains("d-none")) {
            errorMoreThan50.classList.add("d-none")
        }
        if (error42.classList.contains('is-present')) {
            error42.classList.add('d-none');
        }
    }

    const validateInput = (input) => {
        checkThatErrorPresented();
        if (input <= 50) {
            showResult();
            return input;
        }
        hideResult();
        errorMoreThan50.classList.remove('d-none');
        loaderHide(loaders);
        return false;
    }

    async function fibonacci(event) {
        event.preventDefault();
        let myInput = document.querySelector('#number-input').value;
        let validInput = validateInput(myInput)
        if (validInput) {
            if (checkBox.checked) {
                output.innerText = await callServer(validInput);
                callResultsOnPageLoad();
            } else {
                output.innerText = calcFibonacciLocal(validInput);
            }
        }
    }
    form.addEventListener("submit", fibonacci);
    select.addEventListener('change', callResultsOnPageLoad);
    document.addEventListener('DOMContentLoaded', callResultsOnPageLoad);
})();
