const navbarBtn = document.getElementById('navbar-btn')
const navbarMobile = document.getElementById('navbar-mobile')

if (!navbarBtn || !navbarMobile) throw new Error('Navbar element do not exist!')

navbarBtn.onclick = () => {
  navbarMobile.classList.toggle('show')
}
