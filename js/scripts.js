(() => {
    let fibonacciStore = {};
    grabElements();

    function grabElements() {
        fibonacciStore.output = document.querySelector('#place-for-result');
        fibonacciStore.loaders = document.querySelectorAll('.loader');
        fibonacciStore.errorMoreThan50 = document.querySelector('.error50');
        fibonacciStore.error42 = document.querySelector('#error42');
        fibonacciStore.listOfResults = document.querySelector('#list-of-results');
        fibonacciStore.select = document.querySelector('#FormControlSelect');
        fibonacciStore.form = document.querySelector('#calcFiboButton');
        fibonacciStore.checkBox = document.querySelector('#check');
    }

    async function callServer(SERVER_URL) {
        return await fetch(SERVER_URL)
            .then(response => validateResponse(response))
            .then(data => data);
    }

    async function calcFibonacciOnServer(validInput) {
        const {errorMoreThan50, output, loaders, error42} = fibonacciStore;
        const SERVER_URL = `http://localhost:5050/fibonacci/${validInput}`;
        showElements(loaders);
        hideElement(output);
        checkThatErrorIsPresented(errorMoreThan50);
        checkThatErrorIsPresented(error42);
        return await callServer(SERVER_URL);
    }

    const convertDate = (array) => new Date(array.createdDate).toString();

    const showResultOnPage = (array) => {
        const {listOfResults} = fibonacciStore;
        let ulHtml = '';
        for (let newArr of array) {
            let date = convertDate(newArr);
            ulHtml += `<li> The Fibonacci Of <b>${newArr.number}</b> is
                        <b>${newArr.result}</b>. Calculated at: ${date}.</li>`;
        }
        listOfResults.innerHTML = ulHtml;
    }

    async function callResultsFromServer() {
        const {listOfResults} = fibonacciStore;
        listOfResults.innerHTML = "";
        const SERVER_URL = `http://localhost:5050/getFibonacciResults`;
        let array = await callServer(SERVER_URL);
        let sortedArray = sortingArray(array);
        showResultOnPage(sortedArray);
    }

    const sortingArray = (data) => {
        const {select} = fibonacciStore;
        let newArray;
        switch (select.value) {
            case "1":
                newArray = data.results.sort((a, b) => a.number - b.number);
                break;
            case "2":
                newArray = data.results.sort((a, b) => b.number - a.number);
                break;
            case "3":
                newArray = data.results.sort((a, b) => a.createdDate - b.createdDate);
                break;
            default:
                newArray = data.results.sort((a, b) => b.createdDate - a.createdDate);
        }
        return newArray;
    }
    const showElement = (element) => element.classList.remove('d-none');

    const hideElement = (element) => element.classList.add('d-none');

    const showElements = (elements) => {
        for (const element of elements) {
            element.classList.remove('d-none');
        }
    }

    const hideElements = (elements) => {
        for (const element of elements) {
            element.classList.add('d-none');
        }
    }

    const validateResponse = (response) => {
        const {error42, output, loaders} = fibonacciStore;
        if (!response.ok) {
            response.text()
                .then(function (text) {
                    error42.innerText = `Server error: ${text}`;
                    error42.setAttribute("class", "is-present");
                    hideElement(output);
                    hideElements(loaders);
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

    const checkThatErrorIsPresented = (error) => {
        if (!error.classList.contains("d-none")) {
            hideElement(error);
        }
        if (error.classList.contains('is-present')) {
            hideElement(error);
        }
    }

    const validateInput = (input) => {
        const {error42, errorMoreThan50, output, loaders} = fibonacciStore;
        checkThatErrorIsPresented(errorMoreThan50);
        checkThatErrorIsPresented(error42);
        if (input <= 50) {
            showElement(output);
            return input;
        }
        hideElement(output);
        showElement(errorMoreThan50);
        hideElements(loaders);
        return false;
    }

    async function fibonacci(event) {
        event.preventDefault();
        const {checkBox, output, loaders} = fibonacciStore;
        let myInput = document.querySelector('#number-input').value;
        let validInput = validateInput(myInput);
        if (validInput) {
            if (checkBox.checked) {
                let result = await calcFibonacciOnServer(validInput);
                output.innerText = result.result;
                showElement(output);
                hideElements(loaders);
                await callResultsFromServer();
            } else {
                output.innerText = calcFibonacciLocal(validInput);
            }
        }
    }

    (() => {
        const {form, select} = fibonacciStore;
        form.addEventListener("submit", fibonacci);
        select.addEventListener('change', callResultsFromServer);
        document.addEventListener('DOMContentLoaded', callResultsFromServer);
    })();

})();
