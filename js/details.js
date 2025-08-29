const image = document.querySelector("#image");
const details = document.querySelector("#details");
const info = document.querySelector(".info");
const listItems = document.querySelector(".facilities");

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

const id = params.get("id");

fetch(`./data/${id}.json`)
  .then((response) => response.json())
  .then((data) => {
    const ul = document.createElement("ul");

    info.innerHTML = /*html*/ `
        <header>
            <h3 class="destination">${data.destination}</h3>
            <h2 class="title">${data.title}</h2>
        </header>
        <p class="subtitle">${data.subtitle.toLowerCase()}</p>
        <p class="desc">${data.text}</p>
        `;

    data.facilities.forEach((element) => {
      const li = document.createElement("li");
      li.textContent = element;
      ul.appendChild(li);
    });

    image.innerHTML = /*html*/ `
    <img src="../img/${data.image}">
    `;

    listItems.appendChild(ul);
  });
