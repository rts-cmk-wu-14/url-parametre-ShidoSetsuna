const apartments = document.querySelector(".apartments");

fetch("./data/destinations.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.destinations);
    data.destinations.map((item) => {
      const apartment = document.createElement("div");
      apartment.classList.add("apartment");
      apartment.innerHTML = `
            <img src="${item.image}" alt="${item.title}" />
            <h3>${item.title}</h3>
            <div class="favorite">
            <img>HEARTICON</img>
            </div>
        `;
      apartments.appendChild(apartment);
    });
  });
