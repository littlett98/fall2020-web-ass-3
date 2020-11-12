"use strict";

//Starting point is the setup when event listeners are attached
document.addEventListener("DOMContentLoaded", setup);

function setup() {
    //find the button and give it a click listener
    let quoteButton = document.getElementById('quote-button');
    quoteButton.addEventListener("click", getQuote);
}

function getQuote() {
    fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Status code: ' + response.status)
            }
            return response.json();
        })
        .then(json => addQuote(json))
        .catch( error => console.error('There was a problem: '  + error) );
}

function addQuote(json) {
    let article = document.getElementById('quote');
    removeOldQuote();
    let text = document.createTextNode(json[0]);
    article.appendChild(text);
}

function removeOldQuote() {
    let article = document.getElementById('quote');
    article.innerText = '';
}