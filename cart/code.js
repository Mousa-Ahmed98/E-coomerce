let orders = [];

if(localStorage.getItem("orders") != null){
    orders = JSON.parse(localStorage.getItem("orders"));
}
$(document).ready(function () {
    $("#cartBtn").click(()=>{
        localStorage.setItem("orders", JSON.stringify(orders));
        open("../checkout/checkout.html");
    });



  

    


    for(order of orders){
        console.log(`https://fakestoreapi.com/products/${order["productId"]}`);
        fetch(`https://fakestoreapi.com/products/${order["productId"]}`)
        .then((res) => res.json())
        .then((json) => {
            let item = $(`<div class="d-flex w-75"> <div class="p-3 py-4" style="">
            <img src="${json.image}" alt="" height="110px">
        </div>
        <div class="d-flex flex-column ms-3 justify-content-between ">
            <h4 class="">
                ${json.title}
            </h4>
            <h6 style="text-overflow: ellipsis; overflow: hidden;white-space: wrap; max-width: 90%;">
            ${json.description}
            </h6>
            <p style="font-weight: bold; color: rgb(38, 38, 155);">Price: 129$</p>
        </div>
        <div class="d-flex flex-column col-1 m-1 justify-content-center ">
                <input class="p-1 rounded" type="button" name="" id="minus" value="-" style="background-color: rgb(238, 43, 43);" onclick="minusOne(${json.id})">
        </div>
        <div class="d-flex flex-column col-1 justify-content-center ">
                <input class="p-1 rounded" type="number" name="" id="quantity${json.id}" value="1" style="text-align: center;" >
                
        </div>
        <div class="d-flex flex-column col-1 m-1 justify-content-center ">
            <input class="p-1 rounded" type="button" name="" id="plus" value="+" style="background-color: rgb(43, 202, 43);" onclick="plusOne(${json.id})">
        </div> </div>`);
            
        
            $("#itemsColumn").prepend(item);
            $(`#quantity${json.id}`).prop("readonly", true);
        });
    }
})

function plusOne(id){
    for(order of orders){
        if(order["productId"] == id){
            order["quantity"] += 1; 
        }
    }
    console.log(id);
    let curVal = $(`#quantity${id}`).val();
    curVal++;
    $(`#quantity${id}`).val(curVal);    
}

function minusOne(id){
    console.log(id);
    let curVal = $(`#quantity${id}`).val();
    curVal--;
    if(curVal < 0){
        curVal = 0;
    }
    $(`#quantity${id}`).val(curVal);    
}


