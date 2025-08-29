const apartments = document.querySelector(".apartments");

fetch("./data/destinations.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.destinations);
    data.destinations.map((item) => {
      const apartment = document.createElement("div");
      apartment.classList.add("apartment");
      apartment.innerHTML = /*html*/ `
            <img class="destiImg" src="../img/${item.image}" alt="${item.title}" />
            <h3>${item.title}</h3>
            <div id="favInfo">
                <img class="favorite" src="./img/heart.png">
                <p><a href="details.html?id=${item.id}">MORE</a></p>
            </div>
        `;
      apartments.appendChild(apartment);
    });
  });
