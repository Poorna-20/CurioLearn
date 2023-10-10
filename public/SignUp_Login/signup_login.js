const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});



// signup_login.js
const auth = firebase.auth();
const db = firebase.firestore();

// Function to sign up a user with email and password
function signUpWithEmailAndPassword(name, email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User signed up successfully
      const user = userCredential.user;
      // Store additional user data in Firestore
      return db.collection("users").doc(user.uid).set({
        name: name,
        email: email
      });
    })
    .catch((error) => {
      // Handle errors here
      console.error(error.message);
    });
}

// Function to sign in a user with email and password
function signInWithEmailAndPassword(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User signed in successfully
      const user = userCredential.user;
      // You can redirect the user to another page here
      window.location.href='public/index.html'
    })
    .catch((error) => {
      // Handle errors here
      console.error(error.message);
    });
}

// Function to sign in with Google
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((userCredential) => {
      // User signed in with Google successfully
      const user = userCredential.user;
      // You can redirect the user to another page here
      window.location.href='public/index.html'
    })
    .catch((error) => {
      // Handle errors here
      console.error(error.message);
    });
}

// Event listeners for your sign-up and sign-in buttons (assuming you have these in your HTML)
document.getElementById("signUp").addEventListener("click", () => {
  const name = document.querySelector("#container .sign-up-container input[type='text']").value;
  const email = document.querySelector("#container .sign-up-container input[type='email']").value;
  const password = document.querySelector("#container .sign-up-container input[type='password']").value;
  signUpWithEmailAndPassword(name, email, password);
});

document.getElementById("signIn").addEventListener("click", () => {
  const email = document.querySelector("#container .sign-in-container input[type='email']").value;
  const password = document.querySelector("#container .sign-in-container input[type='password']").value;
  signInWithEmailAndPassword(email, password);
});

document.querySelector("#container .form-container .social-container .social:first-child").addEventListener("click", () => {
  signInWithGoogle();
});
