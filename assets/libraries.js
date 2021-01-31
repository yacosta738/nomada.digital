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

/* ========================================================================= */
/*	Portfolio Filtering Hook
/* =========================================================================  */
// import Shuffle from 'shufflejs';
//
// const containerEl = document.querySelector('.shuffle-wrapper');
// if (containerEl) {
//     const myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
//         itemSelector: '.shuffle-item'
//     });
//     const filters = document.getElementsByName("shuffle-filter");
//     filters.forEach(filter => filter.onchange = (evt) => {
//         const input = evt.currentTarget;
//         console.log(input);
//         console.log(input.checked);
//         if (input.checked) {
//             myShuffle.filter(input.value);
//             console.log("<<<<<Filter>>>>>");
//             console.log(myShuffle);
//         }
//     });
//     // jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
//     //     const input = evt.currentTarget;
//     //     if (input.checked) {
//     //         myShuffle.filter(input.value);
//     //     }
//     // });
// }
