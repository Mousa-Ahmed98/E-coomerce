$(document).ready(function () {
    var resultOfOldData = {};
    var keyOfCurrentUser = "";
    var emailOfCurrentUser = localStorage.getItem('currentUserEmail');

    function getCurrentUserFromLocalStorage(emailOfCurrentUser) {
        var contOfUsers = Number(localStorage.getItem("contOfUsers"));
        var Users = localStorage.getItem("UserData");
        if (Users != null) {
            resultOfOldData = JSON.parse(Users);
            for (var i = 0; i < contOfUsers; i++) {
                if (resultOfOldData[`user${i}`].email == emailOfCurrentUser) {
                    keyOfCurrentUser = `user${i}`;
                    i = contOfUsers;
                }
            }
        }
    }

    getCurrentUserFromLocalStorage(emailOfCurrentUser);

    function chackEmail() {
        console.log("chackEmail");
        var errorEmail = $("#errorUserEmail");
        errorEmail.addClass("error");
        var interdEmail = $("#chackEmail").val();
        if (interdEmail == "") {
            errorEmail.removeClass("error").html("Please enter a valid email");
        } else if (interdEmail != emailOfCurrentUser) {
            errorEmail.removeClass("error").html("This email is not correct");
        } else {
            createBodyOfPassword();
        }
    }

    function createBodyOfPassword() {
        // Creating elements using jQuery
        var h1Element = $("<h1>").addClass("text-center mb-5 col-12").text("Change Password");
        var divParentElement = $("<div>").addClass("col-12 d-flex justify-content-center row mb-3");
        var input1NewPasswordElement = $("<input>").attr({
            id: "newPassword",
            type: "password",
            class: "form-control  w-75",
            placeholder: "Enter New Password..."
        }).on("blur", validatePassword);
        var input2ConfirmNewPasswordElement = $("<input>").attr({
            id: "confirmNewPassword",
            type: "password",
            class: "mt-3 form-control  w-75",
            placeholder: "Confirm New Password..."
        }).on("blur", validPasswordMatch);

        var errorNewPasswordDivElement = $("<div>").attr({
            id: "errorNewPassword",
            class: "error w-75 ps-3 mt-2  alert alert-danger p-0"
        }).text("Enter Complex Password");

        var errorConfirmNewPasswordDivElement = $("<div>").attr({
            id: "errorConfirmNewPassword",
            class: "error w-75 ps-3 mt-2  alert alert-danger p-0"
        }).text("New Password, Confirm New Password do not match");

        var containerOfButtonElement = $("<div>").addClass("px-0 col-12 d-flex justify-content-center mb-4");
        var buttonSubmitElement = $("<button>").attr({
            id: "addNewPassword",
            class: "disabled btn mt-3 d-block btn-success w-75"
        }).text("submit").on("click", changeOldPasswordInLocalStorage);

        // Appending elements to their parent
        divParentElement.append(h1Element, input1NewPasswordElement, errorNewPasswordDivElement, input2ConfirmNewPasswordElement, errorConfirmNewPasswordDivElement, containerOfButtonElement.append(buttonSubmitElement));

        // Emptying and appending the parent element to the section
        $("#bodyOfSection").empty().append(divParentElement);
    }

    var regularExpressionOfPassword = "^[a-zA-Z]{3,}[0-9]{1,}[@#$%^&*()+_\-][a-z]{2,}$";

    function validRegExpMatchPassword() {
        var newPassword = $("#newPassword").val();
        var re = new RegExp(regularExpressionOfPassword);
        return re.test(newPassword);
    }

    function validatePassword() {
        var btnSubmitNewPassword = $("#addNewPassword");
        btnSubmitNewPassword.removeClass("disabled");
        var errorPassword = $("#errorNewPassword");
        errorPassword.addClass("error");
        var isPassword = validRegExpMatchPassword();
        if (!isPassword) {
            btnSubmitNewPassword.addClass("disabled");
            errorPassword.removeClass("error");
        }
    }

    function validPasswordMatch() {
        var btnSubmitNewPassword = $("#addNewPassword");
        btnSubmitNewPassword.removeClass("disabled");
        var password = $("#newPassword");
        var repeatPassword = $("#confirmNewPassword");
        var passwordMatchError = $("#errorConfirmNewPassword");
        passwordMatchError.addClass("error");
        if (password.val() != repeatPassword.val()) {
            btnSubmitNewPassword.addClass("disabled");
            passwordMatchError.removeClass("error");
            return false;
        }
        return true;
    }

    function changeOldPasswordInLocalStorage() {
        console.log("changeOldPasswordInLocalStorage");
        var matched = validPasswordMatch();
        console.log("matched", matched);
        if (matched) {
            var password = $("#newPassword").val();
            console.log(password);
            resultOfOldData[keyOfCurrentUser].password = password;
            var result = JSON.stringify(resultOfOldData);
            localStorage.setItem("UserData", result);
            window.location.href = "login.html";
        }
    }

    $("#btnChackEmail").on("click", chackEmail);
});
