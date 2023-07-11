//-------geting id from document of input field
let uname = document.getElementById("name");
let uemail = document.getElementById("emailuser");
let unumber = document.getElementById("contactNum");
let upurl = document.getElementById("porturl");
let usummary = document.getElementById("summaryUser");
let uskill = document.getElementById("skilltext");
// let ueduca =  document.getElementById("educationtext");
let ucerf = document.getElementById("certift");
let upreEduc = document.getElementById("preEduc");
let uCeducate = document.getElementById("cEduca");
// let uimageUp =  document.getElementById("imgupload");
let fileInput = document.getElementById("imgupload")
let databaseref = firebase.database().ref('cvmaker')
function saveData() {

  var file = fileInput.files[0]; 

  let key = firebase.database().ref('cvmaker').push().key;
    let cvmaker = {
        key:key,
        name:uname.value,
        email:uemail.value,
        number:unumber.value,
        url:upurl.value,
        summary:usummary.value,
        skill:uskill.value,
        certificate:ucerf.value,
        currentEducate:uCeducate.value,
        preEducate:upreEduc.value,
        img:file.type
    }
   
    showmesssage.style.display="block";
    firebase.database().ref('cvmaker/'+key).set(cvmaker);

    //File Uploaded Data 
    var reader = new FileReader();
    reader.onloadend = function () {
      firebase.database().ref('cvmaker').child('data').set(reader.result, function (error) {
        if (error) {
          console.error('Error uploading file:', error);
        } else {
          console.log('File uploaded successfully!');
        }
      });
    };
    reader.readAsDataURL(file);
    
    uname.value = " "
    uemail.value = " "
    unumber.value = " "
    upurl.value = " "
    usummary.value = ""
    uskill.value = " "
    ucerf.value = " "
    uCeducate.value =" " 

}











var form = document.getElementById('myForm');
var databaseRef = firebase.database().ref('data');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  var text1 = document.getElementById('text1').value;
  var text2 = document.getElementById('text2').value;
  var text3 = document.getElementById('text3').value;
  var imageInput = document.getElementById('imageInput');
  var file = imageInput.files[0];

  // Upload the file to Firebase Storage
  var storageRef = firebase.storage().ref();
  var fileRef = storageRef.child(file.name);

  fileRef.put(file).then(function (snapshot) {
    // Get the image URL after upload completes
    fileRef.getDownloadURL().then(function (url) {
      // Store the text values and image URL in the database
      var newDataRef = databaseRef.push();
      newDataRef.set({
        text1: text1,
        text2: text2,
        text3: text3,
        imageUrl: url
      }).then(function () {
        console.log('Data uploaded successfully!');
      }).catch(function (error) {
        console.error('Error uploading data:', error);
      });
    });
  }).catch(function (error) {
    console.error('Error uploading file:', error);
  });
});
