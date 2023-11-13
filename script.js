const API_KEY = 'Jk_KiJlp6ja_M_VKk68esIn4TaWHJ7NxgIm2skBP6_4';
const url = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&per_page=1`;
const app = document.getElementById("app");

let storage = sessionStorage.getItem('data');

async function loadData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    sessionStorage.setItem('data', JSON.stringify(data));
    storage = sessionStorage.getItem('data');
    renderContent();

  } catch (error) {
    console.error(error);
  }
}

if (!storage) {
  loadData();
}

const renderContent = () => {
  const data = JSON.parse(storage);
  if (data !== null) {
    const content = `
      <div class="photo" id="${data.id}">
        <img class="photo__img" src="${data.urls.small}" alt="${data.user.name}">
        <h3>${data.user.name}</h3>
        <div class="photo__like">
          <span id="counter">${data.likes}</span>
          <button id="btn">Like</button>
        </div>
      </div>
    `;

    app.innerHTML = content;

    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
      const counter = document.getElementById('counter');
      data.likes += 1;
      counter.textContent = data.likes;
      sessionStorage.setItem('data', JSON.stringify(data));
    });

    const history = localStorage.getItem('history');
    let historyData = history ? JSON.parse(history) : [];
    historyData.unshift(data);
    localStorage.setItem('history', JSON.stringify(historyData));
  }
}

window.addEventListener('load',  () => {
  renderContent();
});
