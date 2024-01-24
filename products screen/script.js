let arayData = [];
let products = document.getElementById("products");
let category = document.getElementById("category");

fetch("https://fakestoreapi.com/products/categories")
  .then((res) => res.json())
  .then((json) => {
    let catogries = "";
    for (let i = 0; i < json.length; i++) {
      catogries += ` <a href="#" class="mycatogry">
      <li>${json[i]}</li>
  </a>`;
    }
    category.innerHTML = catogries;

    displayDataByCat(json);
  });

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    let items = "";
    for (let i = 0; i < json.length; i++) {
      items += `<div class="col">
      <a href="produuctDetails.html?prod=${json[i].id}" class="card text-decoration-none product-card margin-right3 ">
          <img src="${json[i].image}" class="card-img-top w-100 CrdImg" alt="Card Image 1">
          <div class="product-card-body p-2">
              <h5 class="card-title ellipsis" style="color:#f0e78c ;">${json[i].title}</h5>
              <div class="bg-light p-2">
                  <p class="text-muted"><strong>${json[i].category}</strong> </p>
              </div>
              <p class="card-text"><strong>${json[i].category}</strong></p>


              <div class="product-card-button d-flex justify-content-between ">
                  <button class="btn btn-outline-dark rounded rounded-5">ADD TO CARD</button>
                  <p class="product-card-price"><strong>${json[i].price}</strong></p>
              </div>
          </div>
      </a>
  </div>`;
    }

    products.innerHTML = items;

    // console.log(items);
  });

function displayDataByCat() {
  let mycatogry = document.querySelectorAll(".mycatogry");
  for (let i = 0; i < mycatogry.length; i++) {
    mycatogry[i].addEventListener("click", function (e) {
      fetch(`https://fakestoreapi.com/products/category/${e.target.innerHTML}`)
        .then((res) => res.json())
        .then((json) => {
          let items = "";
          for (let i = 0; i < json.length; i++) {
            items += `<div class="col">
      <a href="produuctDetails.html?prod=${json[i].id}" class="card text-decoration-none product-card margin-right3 ">
          <img src="${json[i].image}" class="card-img-top w-100 CrdImg" alt="Card Image 1">
          <div class="product-card-body p-2">
              <h5 class="card-title ellipsis" style="color:#f0e78c ;">${json[i].title}</h5>
              <div class="bg-light p-2">
                  <p class="text-muted"><strong>${json[i].category}</strong> </p>
              </div>
              <p class="card-text"><strong>${json[i].category}</strong></p>


              <div class="product-card-button d-flex justify-content-between ">
                  <button class="btn btn-outline-dark rounded rounded-5">ADD TO CARD</button>
                  <p class="product-card-price"><strong>${json[i].price}</strong></p>
              </div>
          </div>
      </a>
  </div>`;
          }
          products.innerHTML = items;
        });
    });
  }
}
