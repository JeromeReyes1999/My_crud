import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD9OMewouDTBJnZfOjfTMGCBub4Ng5i8qo",
    authDomain: "my-crud-e7517.firebaseapp.com",
    databaseURL: "https://my-crud-e7517-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "my-crud-e7517",
    storageBucket: "my-crud-e7517.appspot.com",
    messagingSenderId: "581756600046",
    appId: "1:581756600046:web:4a456f73641d8bc7e63dff"
  };
  // Initialize Firebase
  var contactDb = firebase.initializeApp(firebaseConfig);

  export default contactDb.database().ref();