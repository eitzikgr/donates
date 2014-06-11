var DonateObject;
 
$(function() {
      
   function showBalance(){
   $(".heading_paid_this_month").text(DonateObject.actions.donated);
               $(".heading_Balance_billing").text(DonateObject.actions.todonate);
               $(".heading_Tax_credit").text(DonateObject.actions.taxdebit);
   }
    
    
    $(document).on( "pageshow",'#home_page', function( event, ui ) {
         showBalance();
    });
    $(document).on( "pageshow",'#Commitment_page', function( event, ui ) {
        showBalance();
    });
    $(document).on( "pageshow",'#Credit_commitment_page', function( event, ui ) {
        showBalance();
    });
    //Calculator_page
    $(document).on( "pageshow",'#Calculator_page', function( event, ui ) {
        $("#input_income").keyup(function(){
            culucate();
        });
         $("#input_Percent").keyup(function(){
            culucate();
        });
        $("#button_calculator_ok").click(function(){
            $("#input_total_paid").val($("#text_Calculation").val());
        });
        function culucate(){
            var sum=parseFloat($("#input_income").val());
            var per=parseFloat($("#input_Percent").val());
            if($("#input_income").val()=="")
                sum=0;
            if($("#input_Percent").val()=="")
                per=0;
            var c=parseFloat((sum*(1+(per/100)))-sum).toFixed(2);
            $("#text_Calculation").val(c);
        }
    });
    
    //Commitment_page
    $("#button_commitment_total").click(function(){
        if($("#input_total_paid").val()!=""){
        
            var sum=$("#input_total_paid").val();
           // var xsum=sum*-1;//parseFloat(sum*(-1)).toFixed(2);
            var description="description";//$("#input_description").val();
            //alert(sum+" - "+xsum);
            var data="func=addAction&userid="+DonateObject.user.id+"&sum="+sum+"&description="+description+"&minus=1";
            console.log(data);
            sendAjax(data,function(result){
                if(result.status==200){
                    DonateObject.actions.todonate+=parseFloat(sum);
                    showBalance();
                    $("#input_total_paid").val('')
                }
                else{
                alert(res);
                }
            });
        
            return false;
           
        }
    });
    
    
    
    
    
    
    
    //page_mydetails
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


