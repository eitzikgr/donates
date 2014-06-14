var DonateObject;
 
$(function() {
      
   function showBalance(){
   $(".heading_paid_this_month").text(DonateObject.actions.donated);
               $(".heading_Balance_billing").text(DonateObject.actions.todonate);
               $(".heading_Tax_credit").text(DonateObject.actions.taxdebit);
       console.log(DonateObject.actions);
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
                    var newAction={"comments":description,"date":Date.now(),"debit":1,"id":0,"sum":sum,"userid":DonateObject.user.id};
                    DonateObject.actions.todonate+=parseFloat(sum);
                    DonateObject.actions.details.actions.push(newAction);
                    showBalance();
                    $("#input_total_paid").val('');
                }
                else{
                alert(res);
                }
            });
        
            return false;
           
        }
    });
    
     $("#button_paid_total").click(function(){
         $("#some_paid").val($("#input_total_paid").val());
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
    
    
    
     $(document).on( "pageshow",'#paid_page', function( event, ui ) {
         $("#companies_dialog input").attr("placeholder","חיפוש מהיר / שם עמותה");
         $('#companyList').html('');
         
         $("#companies_dialog input").click(function(){
             $('#companyList').html('');
         for (var key in DonateObject.companies.companies) {
              var comp=DonateObject.companies.companies[key];
              var aaa = "<li compid='"+comp.id+"' compname='"+comp.name+"'><a href='#' >" +
                "<img class='userIco' src='"+comp.logo+"'/>"+ 
                "<h4>"+comp.name + "</h4>"+ 
                "<p><label>"+comp.comments+"</label></p>"+
               // "<span class='ui-li-count surferTime'>" + "00:00:00" + "</span>"+
                "</a>"+
                "</li>";
               $('#companyList').append(aaa);
          }
           $('#companyList').listview('refresh');
             $('#companyList').children('li').on('click', function () {
  
                 selectCompany($(this).attr('compname'),$(this).attr('compid'));
});
         })
          
        // $("#companies_dialog input").val('awww');
   
    
    });
    
      $(document).on( "pageshow",'#Search_Organization', function( event, ui ) {
          for (var key in DonateObject.companies.companies) {
              var comp=DonateObject.companies.companies[key];
              var aaa = "<li compid='"+comp.id+"' compname='"+comp.name+"'><a href='#' >" +
                "<img class='userIco' src='"+comp.logo+"'/>"+ 
                "<h4>"+comp.name + "</h4>"+ 
                "<p><label>"+comp.comments+"</label></p>"+
               // "<span class='ui-li-count surferTime'>" + "00:00:00" + "</span>"+
                "</a>"+
                "</li>";
               $('#Organization_companyList').append(aaa);
          }
           $('#Organization_companyList').listview('refresh');
      });
    
     $(document).on( "pageshow",'#page_donate', function( event, ui ) {
        //setDonateDetails();
     });
    $("#button_paid_ok").click(function(){
        var sum=$("#some_paid").val();
        var organizationid=$("#companyid_todonate").val();
        if(organizationid==""||parseFloat(organizationid)<=0)
        {
        alert("לא נבחרה עמותה");
            return false;
        }
        
        if(sum==""||parseFloat(sum)<=0)
        {
        alert("סכום שגוי");
            return false;
        }
        setDonateDetails(organizationid,sum);
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
function selectCompany(name, id)
{
$("#companies_dialog input").val("שם העמותה: "+name);
    $('#companyList').html('');
    $("#companyid_todonate").val(id);
}
function setDonateDetails(organizationid,sum)
{
    //alert(organizationid);
    var comp=findOrganization(organizationid);
    if(comp==null)
        alert(organizationid);
    else{
    $("#donate_org_id").text(comp.org_number);
    $("#donate_org_name").text(comp.name);
    $("#donate_sum").text(sum);
             $("#donate_org_logo").attr("src",comp.logo);
}
}
function findOrganization(id)
{
for (var key in DonateObject.companies.companies) {
    if(DonateObject.companies.companies[key].id==id)
        return DonateObject.companies.companies[key];
}
    return null;
}

