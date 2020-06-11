function callServer() {
    let xVariable = document.getElementById('number-input').value;
    const SERVER_URL = `http://localhost:5050/fibonacci/${xVariable}`;
    fetch(SERVER_URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            const yVariable = document.querySelector(".Y");
            yVariable.innerText = data.result;
        });

}




