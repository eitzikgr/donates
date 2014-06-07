/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        
        console.log('Received Event: ' + id);
        loadDetails();
    }
};

function loadDetails(){
     jQuery.support.cors = true;
         $.mobile.loading( 'show', {
                text: 'Please wait..',
                textVisible: true,
                theme: 'b'
            });
        var url="http://customers.bontact.com/App_tromut/post.php?func=startAndGetObjet&token=hffd5hkjmnd-sdfdf-987fnj-kkk";
    
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
               $("#headin_paid_this_month").text(res.actions.donated);
               $("#heading_Balance_billing").text(res.actions.todonate);
               $("#heading_Tax_credit").text(res.actions.taxdebit);
                
                //details_page
                 $("#details_fname").val(res.user.firstname);
                 $("#details_lname").val(res.user.lastname);
                 $("#details_username").val(res.user.username);
                 $("#details_phone").val(res.user.phone);
                 //$("#details_title").val(res.user.title);
                var titleValue=parseInt(res.user.title);
                $("#details_title option").eq(titleValue).attr('selected', 'selected');
                
                $("#details_title").selectmenu("refresh", true);
                
            }
             else{
            alert(res.status);
             }
            
    },
  error: function(err) {
    alert(err);
  }
});
    
}
