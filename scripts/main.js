"use strict";

let article = document.getElementById('quote');

//Starting point is the setup when event listeners are attached
document.addEventListener("DOMContentLoaded", setup);

function setup() {
    //find the button and give it a click listener
    let quoteButton = document.getElementById('quote-button');
    quoteButton.addEventListener("click", getQuote);
}

function getQuote() {
    fetch('https://ron-swanson-quotes.herokuapp.com/v2/quote')
        .then(response => {
            if (!response.ok) {

                throw new Error('Status code: ' + response.status)
            }
            return response.json();
        })
        .then(json => addQuote(json))
        .catch( error => {
            console.error('There was a problem: '  + error);
            getQuoteError();
        });
}

function addQuote(json) {
    removeOldQuote();
    let text = document.createTextNode(json[0]);
    article.appendChild(text);
    article.setAttribute("id", "quote-ok");
}

function removeOldQuote() {
    article.innerText = '';
    article.setAttribute("id", "quote");
}

function getQuoteError() {
    removeOldQuote();
    let text = document.createTextNode("Error");
    article.appendChild(text);
    article.setAttribute("id", "quote-bad");
}