var DonateObject;
 
$(function() {
      
   
    
    
    $(document).on( "pageshow",'#page_main', function( event, ui ) {
         $("#headin_paid_this_month").text(DonateObject.actions.donated);
               $("#heading_Balance_billing").text(DonateObject.actions.todonate);
               $("#heading_Tax_credit").text(DonateObject.actions.taxdebit);
    
    });
    
     $(document).on( "pageshow",'#page_mydetails', function( event, ui ) {
         //details_page
                 $("#details_fname").val(DonateObject.user.firstname);
                 $("#details_lname").val(DonateObject.user.lastname);
                 $("#details_username").val(DonateObject.user.username);
                 $("#details_phone").val(DonateObject.user.phone);
                 //$("#details_title").val(res.user.title);
                var titleValue=parseInt(DonateObject.user.title);
                $("#details_title option").eq(titleValue).attr('selected', 'selected');
                
                $("#details_title").selectmenu("refresh", true);
    });
    
    $('#details_submit').click(function() {
      //alert('Handler for .submit() called.');
        var fname=$("#details_fname").val();
        var lname=$("#details_lname").val();
        var email=$("#details_username").val();
        var phone=$("#details_phone").val();
        var title=$("#details_title").val();
        sendAjax("func=saveMyDetails&userid="+DonateObject.user.id+"&fname="+fname+"&lname="+lname+"&email="+email+"&phone="+phone+"&title=0"+title,function(result){
            if(result.status==200){
            alert("OK");
            }
        });
        
      return false;
    });
        //Insert code here
   
        });



function sendAjax(param,callback){
     jQuery.support.cors = true;
         $.mobile.loading( 'show', {
                text: 'Please wait..',
                textVisible: true,
                theme: 'b'
            });
        var url="http://customers.bontact.com/App_tromut/post.php";
    
    $.ajax({
  type: "get",
  url: url,
  data: param,
  success: function(res) {
             $.mobile.loading('hide');
              res=$.parseJSON(res);
             console.log("Ret:");
             console.log(res);
            callback(res);             
    },
  error: function(err) {
    alert(err);
  }
});
    
}


