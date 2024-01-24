function getFavouriteItem() {
    var favourates = localStorage.getItem("favs");
    console.log(favourates);
    if (favourates != null) {
        favourates = JSON.parse(favourates);
        console.log(favourates);
        var faveoratItem = document.getElementById("containerFavourite");

        faveoratItem.innerHTML = "";
        var productWithCAt = "";
        for (let j = 0; j < favourates.length; j++) {
            console.log(favourates[j]);
            fetch(`https://fakestoreapi.com/products/${favourates[j]}`)
                .then((res) => res.json())
                .then((json) => {
                    console.log(json);
                    productWithCAt =
                        `
                        <div class="d-flex w-100 shadow my-2  col-12 mx-auto ">
                            <div class="" style="">
                                <img src="${json.image}" alt="" height="150px">
                            </div>
                            <div  class="d-flex    row  ms-3 justify-content-between ">
                                <h4 class=" col-12 mt-3">${json.title}</h4>
                                <p class="w-100 my-1 py-1 p-ellipsis col-12">${json.description}</p>
                                <p class="col-12" style="font-weight: bold; color: rgb(38, 38, 155);">Price:${json.price}$</p>
                            </div>
                            <div id="delete" onclick="deleteItem(${json.id})" class="fs-4 text-danger">
                                X
                            </div>
                        </div>
                        `;
                    faveoratItem.innerHTML += productWithCAt;
                });
        }

    }

}
getFavouriteItem();


function deleteItem(id) {
    var favourates = localStorage.getItem("favs");
    favourates = JSON.parse(favourates);
    let indexToRemove = favourates.indexOf(id);

    if (indexToRemove !== -1) {
        favourates.splice(indexToRemove, 1);
    }
    localStorage.setItem("favs", JSON.stringify(favourates));
    getFavouriteItem();
}