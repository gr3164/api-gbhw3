const API_KEY = 'hpl1Lo9CSi6La1Lu3mL8D6mcyVZaEkWDKFKYZ6YbEEE';
const url = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&per_page=1`;
const app = document.getElementById("app");

let storage = sessionStorage.getItem('data');

const setDataSessionStore = async (data) => {
  sessionStorage.setItem('data', JSON.stringify(data));
}

const getDataStorege = () => {
  const data =  JSON.parse(storage);

  const id = data.id;
  const src = data.urls.small;
  const author = data.user.name;
  const likes = data.likes;

  return {data, id, src, author, likes};
};

const addLike = (data) => {
  const btn = document.getElementById('btn');

  btn.addEventListener('click', () => {  
    const counter = document.getElementById('counter');
    data.likes += 1;
    counter.textContent = data.likes;
    sessionStorage.setItem('data', JSON.stringify(data));
  });
};

const history = (data) => {
  const history = localStorage.getItem('history');
  let historyData = history ? JSON.parse(history) : [];
  historyData.unshift(data);
  localStorage.setItem('history', JSON.stringify(historyData));
};

async function loadData(){
  try{
    const response = await fetch(url);
    const data = await response.json();

    setDataSessionStore(data);
    storage = sessionStorage.getItem('data');
    renderContent();

  } catch (error) {
    console.error(error);
  }
};

if (!storage) {
 await loadData();
}

function renderContent(){
  const {data, id, src, author, likes} = getDataStorege();

  const content = `
        <div class="photo" id="${id}">
          <img class="photo__img" src="${src}" alt="${author}">
          <h3>${author}</h3>
          <div class="photo__like">
            <span id="counter">${likes}</span>
            <button id="btn">Like</button>
          </div>
        </div>
      `;

  app.innerHTML = content;

  addLike(data);
  history(data);
};

window.addEventListener('load',  () => {
  renderContent();
});
