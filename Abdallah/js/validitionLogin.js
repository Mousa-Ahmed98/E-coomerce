// Commenting out the existing code you provided
// var userPasswordLogin = document.getElementById("passwordLogin").value;
// var userNameLogin = document.getElementById("userNameLogin").value;
// console.log(userPasswordLogin);
// console.log(userNameLogin);

$("#myFormLogin").submit(function (event) {
    event.preventDefault();
    var correctDataOfLogin = validateLogin();
    if (correctDataOfLogin) {
        var email = $("#userNameLogin").val();
        localStorage.setItem("currentUserEmail", email);
        event.target.submit();
    }
});

function validateLogin() {
    $("#errorUserNameLogin").addClass("error");
    $("#errorPasswordLogin").addClass("error");
    var userPasswordLogin = $("#passwordLogin").val();
    var userNameLogin = $("#userNameLogin").val();
    console.log(userNameLogin);
    var flag = true;
    if (userNameLogin === "" || userPasswordLogin === "") {
        if (userNameLogin === "") {
            $("#errorUserNameLogin").removeClass("error");
            clearLogInForm();
            flag = false;
        }
        if (userPasswordLogin === "") {
            $("#errorPasswordLogin").removeClass("error");
            flag = false;
        }
    } else {
        var formAction = $("#myFormLogin");
        var isExist = searchAboutUser(userNameLogin, userPasswordLogin);
        if (isExist === 1) {
            formAction.attr("action", "../home-page/home.html");
            if (isExist === 0) {
                formAction.attr("action", "../home-page/home.html");
                $("#errorUserNameLogin").removeClass("error");
                flag = false;
            } else if (isExist === -1) {
                formAction.attr("action", "../home-page/home.html");
                $("#errorPasswordLogin").removeClass("error");
                flag = false;
            }
        }
        return flag;
    }
}
    /*
    This function returns:
        1 if userName and password are exist
        0 if userName are not exist
        -1 if password is not correct and userName is exist
        -2 if localStorage don't contain any data
    */
    function searchAboutUser(userNameLogin, userPasswordLogin) {
        console.log("userName: " + userNameLogin);
        var oldData = localStorage.getItem("UserData");
        if (oldData !== null) {
            var resultOfOldData = JSON.parse(oldData);
            console.log(resultOfOldData);
            var contOfUsersAreRegistered = Number(localStorage.getItem("contOfUsers"));
            for (var i = 0; i < contOfUsersAreRegistered; i++) {
                console.log("email from LocalStorage: " + resultOfOldData[`user${i}`].email);
                console.log("User Log In: " + userNameLogin);
                if (resultOfOldData[`user${i}`].email === userNameLogin) {
                    console.log("email:" + resultOfOldData[`user${i}`].email);
                    if (resultOfOldData[`user${i}`].password === userPasswordLogin) {
                        return 1;
                    }
                    return -1;
                }
            }
            return 0;
        } else {
            $("#errorUserNotFind").removeClass("error");
            clearLogInForm();
            return -2;
        }
    }

    function clearLogInForm() {
        $("#passwordLogin").val(null);
        $("#userNameLogin").val(null);
    }
