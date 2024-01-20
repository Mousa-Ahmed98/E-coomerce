
var Admins = {
    admin1: {
        name: "Abdallah Mahfouz",
        email: "abdallahmahfouze111@gmail.com",
    },
    admin2: {
        name: "Mahmoud Salah",
        email: "mahmoudsalah111@gmail.com",
    },
    admin3: {
        name: "Mousa Ahmed",
        email: "mousaahmed111@gmail.com",
    }
};
var AdminsStringify = JSON.stringify(Admins);
localStorage.setItem("Admins", AdminsStringify);

var contOfUsers = 0;
if (localStorage.getItem("contOfUsers") == null) {
    localStorage.setItem("contOfUsers", contOfUsers);
}
else {
    contOfUsers = Number(localStorage.getItem("contOfUsers"));
}

for (var j = 1; j <= 3; j++) {
    var resultOfOldData = {};
    var oldData = localStorage.getItem("UserData");
    if (oldData != null) {
        var flag = false;
        resultOfOldData = JSON.parse(oldData);
        for (var i = 0; i < contOfUsers; i++) {
            if (resultOfOldData[`user${i}`].email == Admins[`admin${j}`]["email"]) {
                flag = true;
                i = contOfUsers;
            }
        }
        if (flag == false) {
            var object = {
                "name": Admins[`admin${j}`]['name'],
                "email": Admins[`admin${j}`]["email"],
                "password": "abdallah123@mo",
                "ssn": "12345678910111"
            }
            resultOfOldData[`user${contOfUsers}`] = object;
            contOfUsers += 1;
            var result = JSON.stringify(resultOfOldData);
            localStorage.setItem("UserData", result);
            localStorage.setItem("contOfUsers", contOfUsers);
        }
    }
    else {
        var result = JSON.stringify(resultOfOldData);
        localStorage.setItem("UserData", result);
        localStorage.setItem("contOfUsers", contOfUsers);
    }
}
