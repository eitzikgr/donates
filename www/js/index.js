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
            console.log("1");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
            alert("bindEvents");
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        alert("deviceready");
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
              res=$.parseJSON(res);
             console.log("Ret:");
             console.log(res);
        $.mobile.loading('hide');
           
            if(res.status == 200) {
                DonateObject=res;
              
                
               
                
            }
             else{
            alert(res.status);
             }
            
    },
  error: function(err) {
    //alert(err);
  }
});
    
}
