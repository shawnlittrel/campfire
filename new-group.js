async function groupSignupFormHandler(event){
     event.preventDefault();

     const groupName = document.querySelector('#groupname-signup').value.trim();
     const email = document.querySelector('#email-signup').value.trim();
     const location = document.querySelector('#activity-location').value.trim();
     const title = document.querySelector('#activity-title').value.trim();
     const description = document.querySelector('#activity-description').value.trim();
     const slots = document.querySelector('#open-slots').value.trim();
     const date = document.querySelector('#activity-date').value();
     const user_id = req.session.id

     console.log('values received');

     if (groupName && email && location && title && description && slots && date && user_id) {
          const response = await fetch('/api/groups', {
               method: 'post',
               body: JSON.stringify({
                    groupName,
                    email,
                    location,
                    title,
                    description,
                    slots,
                    date,
                    user_id
               }),
               headers: { 'Content-Type': 'application/json' }
          });
          //check response status
          if (response.ok) {
            console.log('Success');
            document.location.replace('dashboard');   
          } else {
               alert(response.statusText);
          }
          
     }

};

document.querySelector('#group-submit-button').addEventListener('click', groupSignupFormHandler);