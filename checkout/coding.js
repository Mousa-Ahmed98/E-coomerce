$(document).ready(function () {
    let User = fillData();
    $("#fNameAlert").hide();
    $("#addressAlert").hide();
    $("#emailAlert").hide();
    $("#telephoneAlert").hide();

    $("#placeOrder").click(() => {

        let fName = getInputVal("fName");
        if (fName == "") {
            $("#fNameAlert").show()
            return;
        }
        let lName = getInputVal("lName");
        let company = getInputVal("company");
        let country = getInputVal("country");
        let city = getInputVal("city");
        let address = getInputVal("address");
        if (address == "") {
            $("#addressAlert").show()
            return;
        }
        let email = getInputVal("email");
        if (email == "") {
            $("#emailAlert").show()
            return;
        }
        let password = getInputVal("password");
        let telephone = getInputVal("telephone");
        if (telephone == "") {
            $("#telephoneAlert").show()
            return;
        }

        
        if (password != User["password"]) {
            alert(User["password"])
            alert("Wrong password");
        }


        let wrappedOrder = {
            order: JSON.parse(localStorage.getItem("orders")),
            name: fName + " "+lName,
            company: company,
            country: country,
            city:city,
            address: address,
            email: email,
            telephone: telephone,
            mobile: mobile,
            additionalInformation: additionalInformation,
        }

        localStorage.removeItem("order");
        localStorage.setItem("wrappedItem", JSON.stringify(wrappedOrder));

    })
});

function getInputVal(title) {
    return $("#" + title).val();
}

function fillData() {

    let user = getCurrentUserFromLocalStorage();
    //console.log(user);
    $("#fName").val(user["name"]);
    $("#email").val(user["email"]);
    $("#address").val(user["address"]);
    return user;
}



function getCurrentUserFromLocalStorage() {
    let currentUserEmail = localStorage.getItem("currentUserEmail");
    let users = JSON.parse(localStorage.getItem("UserData"));

    let arrOfUsers = $.map(users, function (value) {
        return value;
    });
    let i = -1;
    let User;
    if (arrOfUsers.length > 0)
        do {
            i++;
            User = arrOfUsers[i];
        } while (i < arrOfUsers.length && arrOfUsers[i]["email"] != currentUserEmail)

    return User;
}


