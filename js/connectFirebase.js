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

/*
 * GRAB COINDATA FROM FIREBASE
 */
const getUserPortfolios = userId => {
  db.collection("users").doc(userId).get().then(doc => {
    if (doc.exists) {
      const x = doc.data();
      console.log(x);
      return doc.data();
    } else {
      console.log("No such document!");
    }
  }).catch(error => {
    console.log("Error getting document:", error);
  });
};

const loadAllCoins = () => {
  db.collection("coins").doc("all").get().then(doc => {
    if (doc.exists) {
      allCoins = doc.data();
      allCoins.updatedAt = allCoins.updatedAt.toDate().toLocaleString();
    } else {
      console.log("No such document!");
    }
  }).catch(error => {
    console.log("Error getting document:", error);
  });
};

const getCoinData = symbol => {
  return allCoins[symbol];
};

// const getAllUsers = () => {
//   const results = {};
//   db.collection("users").get().then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//       let data = doc.data();
//       // data["id"] = doc.id;
//       results[doc.id] = data;
//     });
//   });
//   return results;
// };

const getUserId = () => {
  return document.URL.split("/?user=")[1];
};

const getUser = userId => {
  return db.collection("users").doc(getUserId()).get().then(snap => {
    return snap.data();
  })
};
