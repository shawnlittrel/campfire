async function loginFormHandler(event) {
<<<<<<< HEAD
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
=======
     event.preventDefault();
   
     const email = document.querySelector('#email-login').value.trim();
     const password = document.querySelector('#password-login').value.trim();
   
     if (username && password) {
       const response = await fetch('/api/users/login', {
         method: 'post',
         body: JSON.stringify({
           email,
           password
         }),
         headers: { 'Content-Type': 'application/json' }
       });
       
       console.log('RESPONSE', response);
       if (response.ok) {
         document.location.replace('/dashboard');
       } else {
         alert(response.statusText);
       } 
   }
};


function registerRedirect(){
  document.location.replace('/register');
}

document.querySelector('#login-submit-button').addEventListener('click', loginFormHandler);

document.querySelector('#register-btn').addEventListener('click', registerRedirect);
>>>>>>> main
