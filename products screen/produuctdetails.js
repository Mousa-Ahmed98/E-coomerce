const urlSearchParams = new URLSearchParams(window.location.search);
const productId = urlSearchParams.get("prod");
console.log(productId);

let productid = document.getElementById("productid");
let recomendedP = document.getElementById("recomendedP");
fetch(`https://fakestoreapi.com/products/${productId}`)
  .then((res) => res.json())
  .then((json) => {
    console.log(json);

    productid.innerHTML = `
        <div class="row pt-5">
                      
        <div class="img m-2 col-12 col-md-5 ">
            <img src="${json.image}" class="w-100" alt="">
        </div>
        <div class="col-12 text-center text-md-start col-md-6">
            <div class="title">
                <h2> ${json.category}
            </div>
            </h2>
    
            <div class="productPrice fs-3" style="color: #f0e78c;">
            ${json.price}
            </div>
            <hr>
            <div class="discription fs-5 py-5">
            ${json.description}
            </div>
            <div class="Quntity ">
                
                <input type="button" onclick="addToCard(${json.id})" class="btn addToCard" id=${json.id} style="background-color:#f0e78c ;" value="Add to cart">
            </div>
            <div class="favourt py-3  fs-5">
                <i onclick="addToFav(${json.id})"   class="fa-regular fa-heart"></i>
                add to wishList
            </div>
            <div class="catogery py-3 text-black-50">
                Catogry : <span>${json.category} </span>
            </div>
    
            <a href="#" class="text-black-50">share this prouct ,facebook , twitter</a>
        </div>
    

    <div class="discription p-5 border border-1 border-light-subtle">
    <h2 class="title" style="color: #f0e78c;">
        Product discription
    </h2>
    <p class="fs-5">
   ${json.description}</p>
</div>
        `;

    productWithCat(json.category);
  });

function productWithCat(category) {
  console.log(category);
  let productWithCAt = "";
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      for (let i = 0; i < json.length; i++) {
        productWithCAt += `
        <div class="col col-md-6 col-lg-3 my-2 ">
                                    <a href="produuctDetails.html?prod=${json[i].id}"  class="card product-card margin-right3 ">
                                        <img src="${json[i].image}" class="card-img-top" alt="Card Image 1">
                                        <div class="product-card-body p-2">
                                            <h5 class="card-title" style="color:#f0e78c ellipsis ;">${json[i].title}</h5>
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
                                </div>
        `;
      }

      recomendedP.innerHTML = productWithCAt;
    });
}

//let addToCard = document.querySelector(".addToCard");

//console.log(addToCard);
// addToCard.addEventListener("click", function (e) {
//   console.log(e.target.id);
// });

function addToCard(id) {
  let order = [];
  if (localStorage.getItem("orders")) {
    order = JSON.parse(localStorage.getItem("orders"));
  }
  var product = { productId: id, quantity: 1 };

  let isFound = false;
  for(o of order){
    if(product.productId == o["productId"]){
      o["quantity"] += 1;
      isFound = true;
    }
  }
  if(!isFound)
  order.push(product);
  localStorage.setItem("orders", JSON.stringify(order));
}

function addToFav(id) {
  let fav = [];
  if (localStorage.getItem("favs")) {
    fav = JSON.parse(localStorage.getItem("favs"));
  }

  fav.push(id);
  localStorage.setItem("favs", JSON.stringify(fav));
}
