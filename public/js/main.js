const form = document.querySelector('form');
function addAlertMsg(data)
  {
    let resData = JSON.parse(data);
    const alertElement =`
      <div class="alert alert-${resData.color} alert-dismissible fade show" role="alert">
        <strong>${resData.msg}</strong> 
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `;
    document.getElementById('alert_area').innerHTML=alertElement;
}

const createFrom = document.querySelector('#createForm');
createFrom.addEventListener('submit', (e)=>{
  e.preventDefault();
  
const formData = new FormData(createFrom);
const searchParam = new URLSearchParams();

for (const pair of formData)
{
  searchParam.append(pair[0],pair[1]);
}

fetch('/createNote', {

  method:'POST',
  body:searchParam,
}).then(function(response){
  // console.log(response);
  return response.text();

}).then(function(data){

addAlertMsg(data);

}).catch(function(error){

  console.log(error);
})
})

