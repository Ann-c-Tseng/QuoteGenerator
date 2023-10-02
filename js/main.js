API_URL = "https://safetybelt.pythonanywhere.com/quotes/random"

var count = 0;

function generate(author, quote) {
    const quoteElem = document.getElementById('quote');
    const authorElem = document.getElementById('author');

    quoteElem.innerHTML = quote;
    authorElem.innerHTML = author;
}

function changeBackground() {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    const b = $("body");
    b.css('background', "#" + randomColor);
}

function errorHandling() {
    const quoteElem = document.getElementById('quote');
    const authorElem = document.getElementById('author');

    quoteElem.innerHTML = "Finding quote...";
    authorElem.innerHTML = "Finding author...";

    getData();
}

function getData() {
    $.ajax({
        type:"GET",
        url: API_URL,
        success:function(data, textStatus){
            var author = data.author;
            var quote = data.quote;
            console.log(textStatus);
            generate(author, quote);
            changeBackground();
        },
        error:function(s){
            console.log("Status code: " + s.status);
            console.log("something went wrong... finding another quote now!");
            errorHandling();
        }
    })
}

(function() {
    const button = document.getElementById('generateBtn');
    if (button) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            getData();
        });
    }
})();