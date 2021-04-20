let quotesBank = [];
const domNodes = {
quoteBtn: document.getElementById('quote-btn'),
twitterBtn: document.getElementById('twtr'),
quoteHTML: document.getElementById('quote'),
authorHTML: document.getElementById('author'),
loader: document.getElementById('loader'),
quoteCont: document.getElementById('q-container'),

}



// Loader
function loading() {
    const {quoteCont, loader } = domNodes
    loader.hidden = false;
    quoteCont.hidden = true;
}
function loaded() {
    const {quoteCont, loader } = domNodes
    if (!loader.hidden) {
        loader.hidden = true;
        quoteCont.hidden = false;
    };
}

// Get single Quote
function newQuote() {
    // const quoteHML = domNodes.quoteHTML
    // const authorHTML = domNodes.authorHTML
    const { quoteHTML, authorHTML } = domNodes

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
    const {quoteHTML, authorHTML} = domNodes
    const quote = quoteHTML.innerText;
    const author = authorHTML.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//On Load
domNodes.quoteBtn.addEventListener("click", newQuote);
domNodes.twitterBtn.addEventListener("click", tweetQuote);
getQuotes();