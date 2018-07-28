function search_wiki(){
  console.log('deep dark fantasy!');
  var x = $("#plantname").val();
  console.log(x);
  $.ajax({
      url:'http://43.226.165.24:8000/api/search/wiki/{' + x + '}' ,
      data: {},
      type: "GET",
      beforeSend: function(xhr){
          xhr.setRequestHeader("Accept" , "application/json");
      },
      success: function(result){
        console.log("???????");
      console.log("JSON DATA:" + result);
      },
      error: function(error){
        console.log(error)
      }
  });
}