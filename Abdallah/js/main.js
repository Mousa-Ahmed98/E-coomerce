let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  });
}
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("closee");
});

let number = document.querySelector(".number-of-year");
let info = document.querySelector(".year-info");

number.addEventListener("click", () => {
  infoo.classList.toggle("show")  });


let numbers = document.querySelectorAll(".number-of-year");
let infoo = document.querySelectorAll(".year-info");

numbers.forEach(item=>{
  item.addEventListener("click",() => {
infoo.forEach(ele =>{
  if(item.dataset.index==ele.dataset.index)
  {
    ele.classList.toggle("show");
  }
})

  });
})

window.onload = function () {
  var txtPassword = document.getElementById("txtPassword");
  var txtConfirmPassword = document.getElementById("txtConfirmPassword");
  txtPassword.onchange = ConfirmPassword;
  txtConfirmPassword.onkeyup = ConfirmPassword;
  function ConfirmPassword() {
      txtConfirmPassword.setCustomValidity("");
      if (txtPassword.value != txtConfirmPassword.value) {
          txtConfirmPassword.setCustomValidity("Passwords do not match.");
      }
  }
}






