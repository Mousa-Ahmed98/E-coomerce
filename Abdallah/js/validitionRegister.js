$(document).ready(function() {
    // Regular Expressions for name, email, password, and SSN
    var regularExpressionOfFullName = "^[a-zA-Z]{3,}";
    var regularExpressionOfEmail = "^[a-zA-Z]{3,}[1-9]{1,}@[a-z]{2,6}\.[a-z]{2,6}$";
    var regularExpressionOfPassword = "^[a-zA-Z]{3,}[0-9]{1,}[@#$%^&*()+_\-][a-z]{2,}$";
    var regularExpressionOfSSN = "^[0-9]{14}$";

    // Check if the username matches the pattern
    function validRegExpMatchForName() {
        var name = $("#userName").val();
        var re = new RegExp(regularExpressionOfFullName);
        return re.test(name);
    }

    function validRegExpMatchForEmail() {
        var email = $("#userEmail").val();
        var re = new RegExp(regularExpressionOfEmail);
        return re.test(email);
    }

    function validRegExpMatchPassword() {
        var password = $("#userPassword").val();
        var re = new RegExp(regularExpressionOfPassword);
        return re.test(password);
    }

    function validRegExpMatchForSSN() {
        var ssn = $("#userSSN").val();
        var re = new RegExp(regularExpressionOfSSN);
        return re.test(ssn);
    }

    function validateFullName() {
        var errorName = $("#errorUserName");
        errorName.addClass("error");
        var isName = validRegExpMatchForName();
        
        if (isName) {
            return true;
        } else {
            errorName.removeClass("error");
            return false;
        }
    }

    function validateSSN() {
        var errorSSN = $("#errorUserSSN");
        errorSSN.addClass("error");
        var isSSN = validRegExpMatchForSSN();
        
        if (isSSN) {
            return true;
        } else {
            errorSSN.removeClass("error");
            return false;
        }
    }

    function validateAddress() {
        var address = $("#address").val();
        var errorAddress = $("#errorUserAddress");
        errorAddress.addClass("error");
        
        if (address !== "none") {
            return true;
        } else {
            errorAddress.removeClass("error");
            return false;
        }
    }

    function validateEmail() {
        var errorEmail = $("#errorUserEmail");
        errorEmail.addClass("error");
        var isEmail = validRegExpMatchForEmail();
        
        if (isEmail) {
            return true;
        } else {
            errorEmail.removeClass("error");
            errorEmail.html("Please enter correct Email");
            return false;
        }
    }

    function validPasswordMatch() {
        var password = $("#userPassword");
        var repeatPassword = $("#ConfirmPassword");
        var passwordMatchError = $("#errorUserPasswordAndConfirm");
        passwordMatchError.addClass("error");
        
        if (password.val() !== repeatPassword.val()) {
            passwordMatchError.removeClass("error");
            return false;
        } else {
            passwordMatchError.addClass("error");
            return true;
        }
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

    // Add event 'blur' to all inputs in the Form 
    $("#userName").on("blur", validateFullName);
    $("#userEmail").on("blur", validateEmail);
    $("#userPassword").on("blur", validatePassword);
    $("#ConfirmPassword").on("blur", validPasswordMatch);
    $("#userSSN").on("blur", validateSSN);
    $("#address").on("blur", validateAddress);

    $("#myForm").on("submit", function(event) {
        // Stop the default action of the Form 
        event.preventDefault();
        
        var isPassword = validatePassword();
        var isConfirmPassword = validPasswordMatch();
        var isName = validateFullName();
        var isEmail = validateEmail();
        var isSSN = validateSSN();
        
        console.log(" Name: " + isName);
        console.log(" Password: " + isPassword);
        console.log(" Email: " + isEmail);
        console.log(" SSN: " + isSSN);
        console.log(" Confirm Password: " + isConfirmPassword);

        if (isPassword == false || isName == false || isEmail == false || isSSN == false || isConfirmPassword == false) {
        } else {
            var isSaved = saveInformationToLocalStorage();
            if (isSaved) {
                window.location.href = "../home-page/home.html";
            }
        }
    });

    function saveInformationToLocalStorage() {
        var userNameRegister = $("#userName").val();
        var userEmailRegister = $("#userEmail").val();
        var userPasswordRegister = $("#userPassword").val();
        var userSsnRegister = $("#userSSN").val();
        var userAddressRegister = $("#address").val();

        var object = {
            "name": userNameRegister,
            "email": userEmailRegister,
            "address": userAddressRegister,
            "password": userPasswordRegister,
            "ssn": userSsnRegister,
            "image": "images/maleOrFemale.jpg"
        }

        var contOfUsers = 0;

        if (localStorage.getItem("contOfUsers") == null) {
            localStorage.setItem("contOfUsers", contOfUsers);
        } else {
            contOfUsers = Number(localStorage.getItem("contOfUsers"));
        }

        var flagForEmail = false;
        var oldData = localStorage.getItem("UserData");

        if (oldData != null) {
            resultOfOldData = JSON.parse(oldData);

            for (var i = 0; i < contOfUsers; i++) {
                if (resultOfOldData[`user${i}`].email == userEmailRegister) {
                    flagForEmail = true;
                    i = contOfUsers;
                }
            }
        } else {
            var resultOfOldData = {};
        }

        var errorEmail = $("#errorUserEmail");

        if (flagForEmail) {
            errorEmail.removeClass("error");
            errorEmail.html("This Email is already exists");
            return false;
        } else {
            errorEmail.addClass("error");
            resultOfOldData[`user${contOfUsers}`] = object;
            var result = JSON.stringify(resultOfOldData);
            localStorage.setItem("UserData", result);
            contOfUsers += 1;
            localStorage.setItem("contOfUsers", contOfUsers);
            localStorage.setItem("currentUserEmail", userEmailRegister)
            return true;
        }
    }
});