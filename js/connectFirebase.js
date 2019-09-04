console.log("-----TRIGGERED: connectFirebase.js");

/*
 * FIRESTORE CONNECTION
 * config + initialization + db variable
 */
var firebaseConfig = {
  apiKey: "AIzaSyA4ODjJojm8WEu1tIQeisg7TFTKtV7HhCY",
  authDomain: "coinrocketapp.firebaseapp.com",
  databaseURL: "https://coinrocketapp.firebaseio.com",
  projectId: "coinrocketapp",
  storageBucket: "coinrocketapp.appspot.com",
  messagingSenderId: "854571064111",
  appId: "1:854571064111:web:3d25cb49cbcaf869"
};
firebase.initializeApp({
  apiKey: "AIzaSyA4ODjJojm8WEu1tIQeisg7TFTKtV7HhCY",
  authDomain: "coinrocketapp.firebaseapp.com",
  projectId: "coinrocketapp",
});
var db = firebase.firestore();


/*
 * REALTIME DATA LISTENER
 */
// db.collection("users").doc("AyC0xdFfGljDuSx6NhHH")
//   .onSnapshot(function(doc) {
//     console.log("Current data:");
//     console.log(doc.data());
//   });



