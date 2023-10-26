import firebase from 'firebase';
import emailjs from 'emailjs-com';

emailjs.init("user_6ai0gP0XM5VVs7nB7MYey");


const app = firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "zinger-d9313.firebaseapp.com",
    databaseURL: "https://zinger-d9313.firebaseio.com",
    projectId: "zinger-d9313",
    storageBucket: "zinger-d9313.appspot.com",
    messagingSenderId: "79743135020",
    appId: "1:79743135020:web:40874342f814d5ba125089",
    measurementId: "G-BHG0GTWV4D"
});
app.analytics();

// Get a reference to the database service
const database = firebase.database();

function writeUserData(userId, name, email) {
    database.ref('users/' + userId).set({
        username: name,
        email: email
    }).then(r => alert(r));
}

function getKeyFromEmail(email) {
    return email.replace('@', '-').replaceAll('.', '-');
}

function addEmail() {
    const email = document.getElementById("email-cta");
    if (email.value == null || email.value === "") return;
    // A post entry.
    const emailData = {
        email: email.value
    };
    // Get a key for a new Post.
    // const newEmailKey = firebase.database().ref().child('emails').push().key;
    const updates = {};
    updates['/emails/' + getKeyFromEmail(email.value)] = emailData;
    firebase.database().ref().update(updates).then(r => email.value = "");
}

function getAllEmails() {
    database.ref('/emails/').once('value').then((snapshot) => {
        console.log(snapshot);
        console.log(snapshot.val());
    });
}

function sendNewsLetter() {
    const templateParams = {
        name: 'May',
        to_email: 'maylodos92@gmail.com',
        message: 'This our message for this week. Remember I LOVE YOU!'
    };

    emailjs.send('gmail_service', 'blog_nomatech', templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });
}

const emailButton = document.getElementById("send-email");
emailButton.onclick = addEmail
