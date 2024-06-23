const header = document.querySelector('h1');
const app = document.getElementById('app');
const ddMenu = document.querySelector('#ddMenu');
const sandwitch = document.querySelectorAll('svg');
const html = document.documentElement;

const toggleTheme = () => {
    html.classList.toggle('dark');

    const darkButton = document.getElementById('dark-mode');
    const lightButton = document.getElementById('light-mode');

    darkButton.classList.toggle('hidden');
    lightButton.classList.toggle('hidden');

    // Save theme preference to local storage
    const theme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
};

const applySavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.classList.toggle('dark', savedTheme === 'dark');
        const darkButton = document.getElementById('dark-mode');
        const lightButton = document.getElementById('light-mode');
        if (savedTheme === 'dark') {
            darkButton.classList.add('hidden');
            lightButton.classList.remove('hidden');
        } else {
            darkButton.classList.remove('hidden');
            lightButton.classList.add('hidden');
        }
    }
};

const setView = (v) => {
    header.innerText = v;
    toggleMenu(true);

    if (v === 'Calculator') {
        renderCalculator();
    } else if (v === 'About') {
        renderAbout();
    } else if (v === 'Contact') {
        renderContact();
    }
};

const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden');
        sandwitch.forEach((el) => {
            el.classList.toggle('hidden');
        });
    } else {
        ddMenu.classList.add('hidden');
        sandwitch[0].classList.remove('hidden');
        sandwitch[1].classList.add('hidden');
    }
};

const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`;
    container.insertAdjacentHTML('beforeend', row);
};

const addMonitor = (container, text) => {
    const t = text ?? '';
    const monitor = `<div id='monitor' class="bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`;
    container.insertAdjacentHTML('beforeend', monitor);
};

const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : '';
    return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`;
};

const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join('');
    addRow(container, btnHTML);
};

const click = (event) => {
    const monitor = document.getElementById('monitor');
    const bac = monitor.innerText.trim();
    const a = event.target.innerText;
    console.log(a);
    if (a === 'clear') {
        monitor.innerText = '';
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + eval(bac);
    } else {
        monitor.innerText += a;
    }
};

const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear'];
    app.innerHTML = '';
    addMonitor(app);
    addButtons(app, labels);
    const buttons = document.querySelectorAll('.d-btn');
    buttons.forEach((el) => el.addEventListener('click', click));
};

const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for About</div>';
};

const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for Contact</div>';
};

const renderMenu = () => {
    // to do
};

const renderThemeToggle = () => {
    // to do
};

renderMenu();
renderThemeToggle();
renderCalculator();

window.onload = () => {
    applySavedTheme();
    createTopMenu();
};

function createTopMenu() {
    const menuItems = ['Home', 'About', 'Services', 'Contact'];
    const menuContainer = document.getElementById('top-menu');
    menuItems.forEach(item => {
        const menuItem = document.createElement('li');
        menuItem.textContent = item;
        menuContainer.appendChild(menuItem);
    });
}
