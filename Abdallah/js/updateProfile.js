$(document).ready(function () {
    var currentUser = {};
    var resultOfOldData = {};
    var keyOfCurrentUser = "";

    function getCurrentUserFromLocalStorage() {
        var emailOfCurrentUser = localStorage.getItem('currentUserEmail');
        var contOfUsers = Number(localStorage.getItem("contOfUsers"));
        var Students = localStorage.getItem("UserData");

        if (Students != null) {
            resultOfOldData = JSON.parse(Students);

            for (var i = 0; i < contOfUsers; i++) {
                var studentKey = `user${i}`;

                if (resultOfOldData[studentKey].email == emailOfCurrentUser) {
                    currentUser = resultOfOldData[studentKey];
                    keyOfCurrentUser = studentKey;
                    i = contOfUsers;
                }
            }
        }
    }

    if (!currentUser.hasOwnProperty("image")) {
        currentUser["image"] = "images/maleOrFemale.jpg";
    }

    getCurrentUserFromLocalStorage();

    var element = $("#registerAndLogin");
    element.html(`<div class='pe-5'><a href='studentProfile.html'><i class='fa-solid fa-user fa-2xl'></i><span class='fs-4'> ${currentUser["name"]}</span></a></div>`);

    var image = $("#profileImage");
    image.attr("src", currentUser["image"]);
    var imagesManOrGirl;

    function pushImageis() {
        if (resultOfOldData[keyOfCurrentUser].gender == "male") {
            imagesManOrGirl = `
                <div class="col-md col-6">
                    <img src="images/manChooice1.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage">
                </div>
                <div class="col-md col-6">
                    <img src="images/manChooice2.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage">
                </div>
                <div class="col-md col-6">
                    <img src="images/manChooice3.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage">
                </div>
                <div class="col-md col-6">
                    <img src="images/manChooice4.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage">
                </div>
                <div class="col-md col-6">
                    <img src="images/manChooice5.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage">
                </div>
            `;
        } else {
            imagesManOrGirl = `
                <div class="col-md col-6">
                    <img src="images/girlChooice1.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage">
                </div>
                <div class="col-md col-6">
                    <img src="images/girlChooice2.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage">
                </div>
                <div class="col-md col-6">
                    <img src="images/girlChooice3.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage">
                </div>
                <div class="col-md col-6">
                    <img src="images/girlChooice4.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage">
                </div>
                <div class="col-md col-6">
                    <img src="images/girlChooice5.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage">
                </div>
            `;
        }
    
        var imageContainer = $("#imageToChooice");
        if (imageContainer.length) {
            imageContainer.html(imagesManOrGirl);
    
            // Attach the click event using jQuery
            $(".lightboxImage").on("click", function() {
                selectedImage($(this));
            });
        }
    }
    
    pushImageis();
    
    function selectedImage(image) {
        var src = image.attr('src');
        currentUser["image"] = src;
        resultOfOldData[keyOfCurrentUser] = currentUser;
        var result = JSON.stringify(resultOfOldData);
        localStorage.setItem("stuentData", result);
        $("#profileImage").attr("src", src);
        closeLightbox();
    }
    

    pushImageis();

    var firstNameOfStudent = "";
    var lastNameOfStudent = "";
    var emailOfStudent = "";
    var addressOfStudent = "";
    var SSNOfStudent = "";
    var phoneOfStudent = "";
    var genderOfStudent = "";

    function getInputTags() {
        firstNameOfStudent = $("#firstName");
        lastNameOfStudent = $("#lastName");
        emailOfStudent = $("#email");
        addressOfStudent = $("#address");
        SSNOfStudent = $("#SSN");
        phoneOfStudent = $("#phone");
        genderOfStudent = $("#gendar");
    }

    getInputTags();

    function displayDataOfstudentInForm() {
        getCurrentUserFromLocalStorage();
        var userName = currentUser["name"];
        var firstAndLastName = userName.split(" ");
        firstNameOfStudent.val(firstAndLastName[0]);

        if (firstAndLastName.length > 1) {
            lastNameOfStudent.val(firstAndLastName[1]);
        }

        emailOfStudent.val(currentUser["email"]);
        SSNOfStudent.val(currentUser["ssn"]);

        if (currentUser.hasOwnProperty("phone")) {
            phoneOfStudent.val(currentUser["phone"]);
        }

        if (currentUser.hasOwnProperty("gender")) {
            var gendarOfStudent = currentUser["gender"];
            var selectedGender = $(`[value="${gendarOfStudent}"]`);
            if (selectedGender.length) {
                selectedGender.prop("selected", true);
            }
        }

        var addressOfStudent = currentUser["address"];
        var selectedAddress = $(`[value="${addressOfStudent}"]`);
        if (selectedAddress.length) {
            selectedAddress.prop("selected", true);
        }

        var fullName = firstNameOfStudent.val().concat(" " + lastNameOfStudent.val());
        $("#fullName").html(fullName);
    }

    displayDataOfstudentInForm();

    function searchAboutEmailInLocalStorage() {
        var contOfUsers = Number(localStorage.getItem("contOfUsers"));
        var Students = localStorage.getItem("UserData");
        var emailToUpdate = emailOfStudent.val();

        if (Students != null) {
            resultOfOldData = JSON.parse(Students);

            for (var i = 0; i < contOfUsers; i++) {
                var studentKey = `student${i}`;

                if (resultOfOldData[studentKey].email == emailToUpdate && studentKey != keyOfCurrentUser) {
                    //email is existing in local storage
                    return i;
                }
            }

            //email not exist in local storage
            return -1;
        }

        //error  in data in local storage  "not data in local storage"
        return -2;
    }

    var regularExpressionOfEmail = "^[a-zA-Z]{3,}[1-9]{1,}@[a-z]{2,6}\.[a-z]{2,6}$";
    var regularExpressionOfPhoneNumber = "^(011|010|012|015)[0-9]{8}$";

    function validRegExpMatchForEmail() {
        var email = emailOfStudent.val();
        var re = new RegExp(regularExpressionOfEmail);
        return re.test(email);
    }

    function validRegExpMatchForPhoneNumber() {
        var phone = phoneOfStudent.val();
        if (phone == "") {
            return true;
        } else {
            var re = new RegExp(regularExpressionOfPhoneNumber);
            return re.test(phone);
        }
    }

    function validateEmail() {
        var errorEmail = $("#errorUserEmail");
        errorEmail.addClass("error");
        var isEmail = validRegExpMatchForEmail();

        if (isEmail) {
            var isExists = searchAboutEmailInLocalStorage();

            if (isExists >= 0) {
                errorEmail.removeClass("error");
                errorEmail.html("This Email is already exists");
                $("#btnUpdate").addClass("disabled");
            } else {
                $("#btnUpdate").removeClass("disabled");
            }

            return true;
        } else {
            errorEmail.removeClass("error");
            errorEmail.html("Please enter correct Email");
            $("#btnUpdate").addClass("disabled");
            return false;
        }
    }

    function validatePhoneNumber() {
        var errorPhone = $("#errorUserPhone");
        errorPhone.addClass("error");
        var isPhone = validRegExpMatchForPhoneNumber();

        if (isPhone) {
            $("#btnUpdate").removeClass("disabled");
            return true;
        } else {
            errorPhone.removeClass("error");
            errorPhone.html("Please enter correct phone number");
            $("#btnUpdate").addClass("disabled");
            return false;
        }
    }

    $("#email").on("blur", validateEmail);
    $("#phone").on("blur", validatePhoneNumber);

    function getDataFromInputsTages() {
        getInputTags();
        getCurrentUserFromLocalStorage();
        var fullName = firstNameOfStudent.val().concat(" " + lastNameOfStudent.val());
        $("#fullName").html(fullName);
        currentUser["name"] = fullName;
        currentUser["email"] = emailOfStudent.val();
        currentUser["address"] = addressOfStudent.val();
        currentUser["phone"] = phoneOfStudent.val();
        currentUser["gender"] = genderOfStudent.val();

        resultOfOldData[keyOfCurrentUser] = currentUser;
        var result = JSON.stringify(resultOfOldData);
        localStorage.setItem("UserData", result);
        localStorage.setItem('currentUserEmail', emailOfStudent.val());

        image.attr("src", currentUser["image"]);
        pushImageis();
        displayDataOfstudentInForm();
    }

    $("#btnUpdate").on("click", getDataFromInputsTages);

    function showImages() {
        $("#lightbox").css("display", "block");
    }

    function closeLightbox() {
        $("#lightbox").css("display", "none");
    }
    
    $("#closeLightbox").on("click", closeLightbox);
    $("#changeImage").on("click", showImages);

    function selectedImage(image) {
        var src = $(image).attr('src');
        currentUser["image"] = src;
        resultOfOldData[keyOfCurrentUser] = currentUser;
        var result = JSON.stringify(resultOfOldData);
        localStorage.setItem("UserData", result);
        $("#profileImage").attr("src", src);
        closeLightbox();
    }
    // $("#changeImage").on("click", showImages);
});