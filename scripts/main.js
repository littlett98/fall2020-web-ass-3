/**
 * @author Trevor McCubbin
 */

"use strict";

let article = document.querySelector('#quote');

//Starting point is the setup when event listeners are attached
document.addEventListener("DOMContentLoaded", setup);

/**
 * Adds an event listener to the quote button which starts the rest of the js
 */
function setup() {
    //find the button and give it a click listener
    let quoteButton = document.querySelector('#quote-button');
    quoteButton.addEventListener("click", getQuote);
}

/**
 * Gets a quote from the ron swanson api and then sends the data to the addQuote method
 * @throws {Error} If the response from the api fails, aka response is not ok, then throws the error
 */
function getQuote() {
    fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
        .then(response => {
            // throws an error if response is bad
            if (!response.ok) {
                throw new Error('Status code: ' + response.status)
            }
            return response.json();
        })
        .then(json => addQuote(json))
        .catch( error => {
            console.error('There was a problem: '  + error);
            addQuoteError();
        });
}

/**
 * Adds a the first quote from all the quotes sent over from the api
 * @param {*} json 
 */
function addQuote(json) {
    removeOldQuote();
    let text = document.createTextNode(json[0]);
    article.appendChild(text);
    article.setAttribute("id", "quote-ok");
}

/**
 * Removes all the text within the article for quotes
 */
function removeOldQuote() {
    article.innerText = '';
    article.setAttribute("id", "quote");
}

/**
 * Adds error text instead of a quote if ever there is a problem with the fetch
 */
function addQuoteError() {
    removeOldQuote();
    let text = document.createTextNode("Error retrieving quote, please try again");
    article.appendChild(text);
    article.setAttribute("id", "quote-bad");
}