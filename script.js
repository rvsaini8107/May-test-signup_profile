
//  if(getDataFromLocalStorage("token")==null){
//     console.log(window.origin+"/May-test-signup_profile/index.html",window.location.href)
//     console.log(window.origin+"/May-test-signup_profile/index.html"!=window.location.href)
//     if(window.origin+"/May-test-signup_profile/index.html"!=window.location.href){
//         loadUrl("./index.html");
//     }
// }else{
//    console.log(window.origin+"/May-test-signup_profile/profile.html"!=window.location.href)
//    console.log(window.origin+"/May-test-signup_profile/profile.html",window.location.href)

//     if(window.origin+"/May-test-signup_profile/profile.html",window.location.href){
//         loadUrl("./profile.html");
//     }
// }

function validateForm(event) {
    event.preventDefault(); 
    
    
    var fullname = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;
    var confirmPassword = document.getElementById('confirm-pass').value;
    var errorSpan = document.getElementById('error-span');
    var errDiv= document.getElementById('error-div');
    var SuccessDiv= document.getElementById('successfully-div');
    var logout= document.getElementById('logout');
    
    
    if (fullname === '' || email === '' || password === '' || confirmPassword === '') {
    //   alert('Please fill in all fields.');
      errDiv.style.display="block";    
      errorSpan.innerHTML=`All the fields are mandatory `;
      setTimeout(() => {
        errDiv.style.display="none";
      }, 5000);
      
      return; 
    }
    
    
    if (password !== confirmPassword) {
    //   alert('Passwords do not match.');
      
      errDiv.style.display="block";    
      errorSpan.innerHTML=`Passwords do not match.`;
      setTimeout(() => {
        errDiv.style.display="none";
      }, 5000);
      return; 
    }
    
   
    console.log('Full Name:', fullname);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    
    
    document.getElementById('form').reset();
    SuccessDiv.style.display="block";    
    SuccessDiv.innerHTML=`Successfully Signed Up!`;
      setTimeout(() => {
        SuccessDiv.style.display="none";
      }, 5000);

      
    var randomToken = generateRandomToken();    
    console.log(randomToken);
    saveDataToLocalStorage("name",fullname);
    saveDataToLocalStorage("email",email);
    saveDataToLocalStorage("password",password);
    saveDataToLocalStorage("token",randomToken);

    loadUrl("./profile.html");
    
  }

  

  function loadUrl(urlThis){
    setTimeout(() => {
        window.location.href=urlThis;
    }, 3000);
    
  }
if(window.origin+"/profile.html"==window.location.href){
    showDataInDiv();
    //   logout
    logout.addEventListener("click",()=>{
        localStorage.clear();
        loadUrl("./index.html");
    })

}
    



  function saveDataToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }
  
  // Retrieving data from local storage
  function getDataFromLocalStorage(key) {
    var value = localStorage.getItem(key);
    return value ? value : null;
  }
  

  function showDataInDiv(){

    var nameShow = getDataFromLocalStorage("name")
    var emailShow = getDataFromLocalStorage("email")
    var passShow = getDataFromLocalStorage("password")
    // getDataFromLocalStorage("token")
    var div = `<div>Full Name : <span id="show-name">${nameShow}</span></div>
    <div>Email : <span id="show-email">${emailShow}</span></div>
    <div>Password : <span id="show-password">${passShow}</span></div>` ;
    var showAllData = document.getElementById('show-all-data');
    showAllData.innerHTML=div;
  }


  function generateRandomToken() {
    var randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);
    
    var token = Array.from(randomBytes, function(byte) {
      return ('0' + byte.toString(16)).slice(-2);
    }).join('');
    
    return token;
  }
  
