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
// const TagCloud = require('TagCloud');
//
// const container = '.tag-cloud-content';
// const allSkillsElements = document.getElementsByClassName("skills-array");
//
// const texts = [];
// for(let i =0; i< allSkillsElements.length;i++){
//     texts.push(allSkillsElements[i].innerText);
// }
// const options = {
//     radius: 400
// };
//
// TagCloud(container, texts, options);
//
// let rootEl = document.querySelector('.tag-cloud-content');
// rootEl.addEventListener('click', function clickEventHandler(e) {
//     if (e.target.className === 'tagcloud--item') {
//         window.open(`https://www.google.com/search?q=${e.target.innerText}`, '_blank');
//         // your code here
//     }
// });
// rootEl.onscroll = function (e){
//     console.log("=============");
//     console.log(e);
// }
// rootEl.onmousemove = function (e){
//     console.log("=============");
//     console.log(e);
// }