console.log('Client side javascript file is loaded!');

const  submitBtn = document.getElementById("submitBtn");
let search;
if(submitBtn){
    submitBtn.addEventListener("click",(event) =>{
      search = document.getElementById("search").value;
        event.preventDefault();
        fetch('http://localhost:3000/weather?address='+search)
        .then(
          function(response) {
            span1 = document.getElementById("message1");
            txt1 = document.createTextNode("loading");
            span1.appendChild(txt1);
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
        
            // Examine the text in the response
            response.json().then(function(data) {
              console.log(data);
              if(document.getElementById("message1") && document.getElementById("message2")){
                span1 = document.getElementById("message1");
                txt1 = document.createTextNode(data.forecast);
                span1.appendChild(txt1);
                span2 = document.getElementById("message2");
                txt2 = document.createTextNode(data.location);
                span2.appendChild(txt2);
               // document.getElementById("message1").innerHTML ==data.forecast;
               // document.getElementById("message2").innerHTML ==data.location;
              }
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
          document.getElementById("message1").textContent == err;
        });
    });
    
}

