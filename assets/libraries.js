'use strict'
/* Anything installed through npm goes here */
import 'lazysizes'
import 'alpinejs'
import lunr from 'lunr'

window.lunr = lunr
// Banner write effect
import {init} from 'ityped'

const rolesPlayed = document.querySelector('#roles-played')
const allRolesElements = document.getElementsByClassName("roles-array");
const allRoles = [];

for(let i =0; i< allRolesElements.length;i++){
    allRoles.push(allRolesElements[i].innerText);
}
init(rolesPlayed, {showCursor: false, strings: allRoles});

// // Parallax the banner images
// import Rellax from "rellax";
//
// const rellax = new Rellax('.rellax', {
//     speed: -2,
//     center: true,
//     wrapper: null,
//     round: true,
//     vertical: true,
//     horizontal: true
// });
// Tags Cloud
