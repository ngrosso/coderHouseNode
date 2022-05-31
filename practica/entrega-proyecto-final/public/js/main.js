
document.cookie = "adminAccess=user";

function isAdmin() {
  const admin = document.getElementById("adminAccess").checked
  if (admin) {
    document.cookie = "adminAccess=admin"
  } else {
    document.cookie = "adminAccess=user";
  }
  console.log(document.cookie)
}