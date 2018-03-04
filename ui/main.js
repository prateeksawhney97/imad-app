// counter javascript code
var button = document.getElementById('counter');
button.onclick = function(){
    
  //Create a request object.
  var request = new XMLHttpRequest();
  
  //Capture a response and store it in a variable.
  request.onreadystatechange = function (){
    if(request.readyState == XMLHttpRequest.DONE){
        //Take some action
        if(request.status == 200){
            var counter = request.responseText;
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();
        }
    }  
    //Not Done yet.
  };
  //Make a request.
  request.open('GET', 'http://prateeksawhney97.imad.hasura-app.io/counter', true);
  request.send(null);
};    
