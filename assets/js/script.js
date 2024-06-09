document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navigation = document.querySelector('.navigation');
  
    hamburgerMenu.addEventListener('click', function () {
      navigation.classList.toggle('show');
    });
  });