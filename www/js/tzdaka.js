$(function() {
      
    
    
    
    $(document).on( "pageshow",'#page17', function( event, ui ) {
 
     jQuery.support.cors = true;
         $.mobile.loading( 'show', {
                text: 'Please wait..',
                textVisible: true,
                theme: 'b'
            });
        var url="http://customers.bontact.com/App_tromut/post.php?func=startAndGetObjet&userid=15";
    
    $.ajax({
  type: "POST",
  url: url,
  data: 'data',
  success: function(res) {
             $.mobile.loading('hide');
              res=$.parseJSON(res);
             console.log("Ret:");
             console.log(res);
            if(res.status == 200) {
               $("#headin_paid_this_month").text(res.actions.balance);
                
            }
             else{
            alert(res.status);
             }
            
    },
  
});
    
    });
        //Insert code here
   
        });