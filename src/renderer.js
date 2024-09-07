import './css/main.css';
/*
const colors = {
    pink: 'rgb(251, 82, 210)',
    pink2: 'rgb(238, 86, 170)',
    ligthGreen: 'rgb(153, 241, 137)',
    blue: 'rgb(33, 173, 224)',
    yellow: 'yellow',
    mint: 'rgb(100, 230, 149)',
    lime: 'lime',
    mediumpurple: 'mediumpurple',
    greenyellow: 'greenyellow'
}
*/

const colors = {
    neonPink: "#FF6EC7",        // Ярко-розовый
    neonGreen: "#39FF14",       // Ярко-зеленый
    neonBlue: "#1F51FF",        // Ярко-синий
    neonYellow: "#FFFF33",      // Ярко-желтый
    neonOrange: "#FF6F00",      // Ярко-оранжевый
    neonPurple: "#A020F0",      // Ярко-пурпурный
    neonCyan: "#00FFFF",        // Ярко-циан
    neonRed: "#FF073A",         // Ярко-красный
    neonMagenta: "#FF00FF",     // Ярко-магентовый
    neonTurquoise: "#00FFCC",   // Ярко-бирюзовый
    neonLime: "#BFFF00",        // Ярко-лаймовый
    neonTeal: "#00C2C2",        // Ярко-зеленовато-синий
    neonGold: "#FFD700",        // Ярко-золотой
    neonRose: "#FF007F",        // Ярко-розовый (более холодный)
    neonCoral: "#FF6F61",       // Ярко-коралловый
    neonChartreuse: "#DFFF00",  // Ярко-Chartreuse (желто-зеленый)
    neonElectricBlue: "#7DF9FF", // Электрический синий
    neonBrightRed: "#F7042E",   // Ярко-красный
    neonFuchsia: "#FF00FF",     // Ярко-фуксия
    neonSkyBlue: "#87CEEB",     // Ярко-небесный синий
    neonSunset: "#FF5F5F",      // Ярко-оранжево-красный (закат)
  };

const newWindowButton = document.querySelector('.new-window-button');
const goButton = document.querySelector('.go');

//url field
const urlInputField = document.querySelector('.url-input');

//webview
const webview = document.querySelector('.webview');
let url = '';
/*
const home = document.querySelector('.home');
function startBrowser(){
    urlInputField.value = 'https://www.duckduckgo.com';
    webview.src = 'https://www.duckduckgo.com';    
};
//startBrowser();
home.addEventListener('click',() => {
    startBrowser();
});
*/
urlInputField.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        event.preventDefault();
        handleUrl();
        
    };
});

// Обновление функции handleUrl для работы с активным вебвью
function handleUrl() {
    const inputUrl = urlInputField.value.trim(); // Удаляем пробелы вокруг URL
    // Если URL начинается с http:// или https://, используем его как есть
    if (inputUrl.startsWith('http://') || inputUrl.startsWith('https://')) {
        url = inputUrl;
    } else if (inputUrl.startsWith('www.')) {
        url = 'http://' + inputUrl;
    } else {
        url = 'http://www.' + inputUrl;
    }
    const activeWebview = document.querySelector('.webview.active');
    if (activeWebview) {
        activeWebview.src = url; // Устанавливаем src только активного веб-просмотра
    }
}

goButton.addEventListener('click', (event) => {
    event.preventDefault();
    handleUrl();
});
function getRandomColor() {
    const colorKeys = Object.keys(colors);
    const randomIndex = Math.floor(Math.random() * colorKeys.length);
    const randomColorKey = colorKeys[randomIndex];
    return colors[randomColorKey];
}
const tabPanel = document.querySelector('.tab-panel');
const page = document.querySelector('.page')
function createTab() {
    // Создаем новую вкладку
    const newTab = document.createElement('div');
    newTab.className = 'tab';
    newTab.style.backgroundColor = getRandomColor();
    tabPanel.appendChild(newTab);

    const title = document.createElement('p');
    title.textContent = 'Новая вкладка!';
    title.className = 'tab-title';
    newTab.appendChild(title);

    const tabClose = document.createElement('div');
    tabClose.className = 'tab-close';
    newTab.appendChild(tabClose);

    // Создаем новое вебвью
    const webview = document.createElement('webview');
    webview.className = 'webview active'; // Убираем ошибку в коде
    webview.style.backgroundColor = getRandomColor();
    page.appendChild(webview);
    webview.src = 'https://www.duckduckgo.com';

    // Привязываем вебвью к вкладке через атрибут data
    newTab.dataset.webviewId = webview.id = `webview-${Date.now()}`;
}
createTab();

// Делегирование события клика на .tab-panel
tabPanel.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('tab-close')) {
        // Находим родительский элемент .tab
        const tab = event.target.closest('.tab');
        if (tab) {
            const webviewId = tab.dataset.webviewId; // Получаем ID вебвью

            // Находим и удаляем соответствующее вебвью
            const webviewToRemove = document.querySelector(`webview[id='${webviewId}']`);
            if (webviewToRemove) {
                page.removeChild(webviewToRemove);
            }

            // Удаляем вкладку
            tabPanel.removeChild(tab);
        }
    }
});

newWindowButton.addEventListener('click', () => {
    createTab();
})

//выбираем активную вкладку
const tabs = document.querySelectorAll('.tab');
const webviews = document.querySelectorAll('.webview');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        webviews.forEach(w => {
            w.classList.remove('active');
            w.classList.add('hidden');
        });
        tab.classList.add('active');
        webviews[index].classList.add('active');
        webviews[index].classList.remove('hidden');
    });
});

searchButton.addEventListener('click', () => {
    const activeWebview = document.querySelector('.webview.active');
    if (activeWebview) {
        url = 'https://www.google.com';
        urlInputField.value = url;
        activeWebview.src = url;
    }
});

webview.addEventListener('did-navigate', (event) => {
    url = event.url;
    urlInputField.value = url;
});

backButton.addEventListener('click', () => {
    const activeWebview = document.querySelector('.webview.active');
    if (activeWebview) {
        activeWebview.goBack();
    }
});

forwardButton.addEventListener('click', () => {
    const activeWebview = document.querySelector('.webview.active');
    if (activeWebview) {
        activeWebview.goForward();
    }
});

reloadButton.addEventListener('click', () => {
    const activeWebview = document.querySelector('.webview.active');
    if (activeWebview) {
        activeWebview.reload();
    }
});

