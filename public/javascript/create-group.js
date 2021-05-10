async function submitGroupHandler(event){
     event.preventDefault();
     console.log('FUNCTION RUNNING');

     let group_name = document.querySelector('#group-name').nodeValue.trim();

     let group_location = document.querySelector('#group-location').value.trim();

     let activity_date = document.querySelector('#activity-date').value.trim();

     let open_slots = document.querySelector('#open-slots').value.trim();

     let activity_title = document.querySelector('#activity-title').value.trim();

     let activity_description = document.querySelector('#activity-description').value.trim();

     const response = await fetch(`/api/groups`, {
          method: 'POST',
          body: JSON.stringify({
               group_name,
               group_location,
               activity_title,
               activity_description,
               activity_date,
               open_slots
          }),
          headers: {
               'Content-Type': 'application/json'
          }
     });

     if (response.ok) {
          console.log(response);
          document.location.replace('/dashboard');
     } else {
          console.log(response);
          alert(response.statusText);
     }
};

document.querySelector('#campfire-submit-btn').addEventListener('submit', submitGroupHandler);

// document.addEventListener('DOMContentLoaded', function() {
//      var elems = document.querySelectorAll('.datepicker');
//      var instances = M.Datepicker.init(elems, options);
//    });