var firebaseConfig = {
    apiKey: "AIzaSyCfyr3GbrCphfpOlZPpzN8KEb40Md3bDCU",
    authDomain: "spyfall-b2c57.firebaseapp.com",
    databaseURL: "https://spyfall-b2c57.firebaseio.com",
    projectId: "spyfall-b2c57",
    storageBucket: "spyfall-b2c57.appspot.com",
    messagingSenderId: "1055304348759",
    appId: "1:1055304348759:web:b662f2e97f456ac9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var rooms = db.collection("Rooms");





