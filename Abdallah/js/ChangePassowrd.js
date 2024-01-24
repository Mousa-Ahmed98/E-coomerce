$(document).ready(function () {
    var oldPasswordFromLocalStorage = "";
    var keyOfCurrentUser = "";
    var Users = localStorage.getItem("UserData");
    var resultOfOldData = JSON.parse(Users);

    function getCurrentUserFromLocalStorage() {
        var emailOfCurrentUser = localStorage.getItem('currentUserEmail');
        var contOfUsers = Number(localStorage.getItem("contOfUsers"));
        for (var i = 0; i < contOfUsers; i++) {
            if (resultOfOldData[`user${i}`].email == emailOfCurrentUser) {
                oldPasswordFromLocalStorage = resultOfOldData[`user${i}`].password;
                keyOfCurrentUser = `user${i}`;
                return true;
            }
        }
        return false;
    }

    getCurrentUserFromLocalStorage();
    $("#fullName").html(resultOfOldData[keyOfCurrentUser].name);
    $("#profileImage").attr("src", resultOfOldData[keyOfCurrentUser].image);

    console.log(oldPasswordFromLocalStorage);

    var regularExpressionOfPassword = "^[a-zA-Z]{3,}[0-9]{1,}[@#$%^&*()+_\-][a-z]{2,}$";

    function validRegExpMatchPassword() {
        var password = $("#newPassword").val();
        var re = new RegExp(regularExpressionOfPassword);
        return re.test(password);
    }

    function validatePassword() {
        var errorPassword = $("#errorUserPassword");
        errorPassword.addClass("error");
        var isPassword = validRegExpMatchPassword();
        if (isPassword) {
            return true;
        } else {
            errorPassword.removeClass("error");
            return false;
        }
    }

    function validPasswordMatch() {
        var password = $("#newPassword");
        var repeatPassword = $("#confirmNewPassword");
        var passwordMatchError = $("#errorUserPasswordAndConfirm");
        passwordMatchError.addClass("error");
        if (password.val() !== repeatPassword.val() && (password.val() != "" || repeatPassword.val() != "")) {
            passwordMatchError.removeClass("error");
            return false;
        } else {
            passwordMatchError.addClass("error");
            return true;
        }
    }

    function clearInputs() {
        $("#newPassword, #confirmNewPassword, #oldPassword").val("");
    }

    function changePassword() {
        console.log("changePassword")
        var password = $("#newPassword").val();
        var oldPassword = $("#oldPassword").val();
        var oldPasswordError = $("#errorOldPassword");
        if (oldPassword == "") {
            oldPasswordError.removeClass("error").text("Please enter an old password");
        } else if (oldPassword != oldPasswordFromLocalStorage) {
            oldPasswordError.removeClass("error").text("Password is incorrect");
        } else if (password == "") {
            var errorPassword = $("#errorUserPassword");
            errorPassword.removeClass("error");
        }
        else {
            var matchedPasswords = validPasswordMatch();
            if (matchedPasswords) {
                var password = $("#newPassword").val();
                resultOfOldData[keyOfCurrentUser].password = password;
                var result = JSON.stringify(resultOfOldData);
                localStorage.setItem("UserData", result);
                $("#changedSuccessfully").removeClass("error");
                clearInputs();
                oldPasswordError.addClass("error");
                var errorPassword = $("#errorUserPassword");
                errorPassword.addClass("error");
            }
        }
    }

    $("#newPassword").on("blur", validatePassword);
    $("#confirmNewPassword").on("blur", validPasswordMatch);
    $("#btnChangePassword").on("click", changePassword);
});
