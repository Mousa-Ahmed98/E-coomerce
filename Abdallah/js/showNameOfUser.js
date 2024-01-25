var emailOfCurrentUser = localStorage.getItem("currentUserEmail");

function logout()
{
  localStorage.removeItem("currentUserEmail");
}

if (emailOfCurrentUser) {
document.getElementById("login").classList.add("login");
}