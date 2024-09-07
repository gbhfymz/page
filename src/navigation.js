(function(){

//buttons
const backButton = document.querySelector('.back-button');
const forwardButton = document.querySelector('.forward-button');
const reloadButton = document.querySelector('.reload-button');
const searchButton = document.querySelector('.search-button');

backButton.addEventListener('click', () => {
    webview.goBack();
});

forwardButton.addEventListener('click', () => {
    webview.goForward();
});

reloadButton.addEventListener('click', () => {
    webview.reload();
});

})();