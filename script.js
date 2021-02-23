let quotesBank = [];
const quoteBtn = document.getElementById('quote-btn');
const twitterBtn = document.getElementById('twtr');
const quoteHTML = document.getElementById('quote');
const authorHTML = document.getElementById('author');
const loader = document.getElementById('loader');
const quoteCont = document.getElementById('q-container');

// Loader
function loading() {
    loader.hidden = false;
    quoteCont.hidden = true;
}
function loaded() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteCont.hidden = false;
    };
}

// Get single Quote
function newQuote() {
    const quote = quotesBank[Math.floor(Math.random() * quotesBank.length)];
    quoteHTML.innerText = quote.text;
    if (quote.author === null) {
        authorHTML.innerText = 'unknown author';
    } else {
        authorHTML.innerText = quote.author;
    }
}

// Fetch quote from API
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        quotesBank = await response.json();
        newQuote();
        loaded();
    } catch (error) {
        console.log('something went wrong:', error);
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteHTML.innerText;
    const author = authorHTML.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//On Load
quoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
getQuotes();