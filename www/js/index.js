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
        if(checkConnection())
            loadDetails();
    }
};
function checkConnection() {
     try{
     var networkState = (navigator.connection)?navigator.connection.type:navigator.network.connection.type;
     //networkState=Connection.NONE;
       
    var Conn=(navigator.connection)?navigator.connection.__proto__:Connection;       
     var states = {};
        states[Conn.UNKNOWN]  = 'Unknown connection';
        states[Conn.ETHERNET] = 'Ethernet connection';
        states[Conn.WIFI]     = 'WiFi connection';
        states[Conn.CELL_2G]  = 'Cell 2G connection';
        states[Conn.CELL_3G]  = 'Cell 3G connection';
        states[Conn.CELL_4G]  = 'Cell 4G connection';
        states[Conn.NONE]     = 'No network connection';
    
     if(networkState== Conn.NONE){
        navigator.notification.alert('Your device is not connected to the network',  // message
            function(){},         // callback
            'Menu',            // title
            'Done'  );
         
         return false;
        }
     else{
        return true;
     }
        //alert('Connection type: ' + states[networkState]);    
    }
     catch(e){console.log("Err: "+e);
             console.log(e);}
 }
function loadDetails(){
    
    try{
        if(!loadLocaldateils()){
     jQuery.support.cors = true;
         $.mobile.loading( 'show', {
                text: 'Please wait..',
                textVisible: true,
                theme: 'b'
            });
        }
        //return;
        var url="http://customers.bontact.com/App_tromut/post.php?func=startAndGetObjet&token=hffd5hkjmnd-sdfdf-987fnj-kkk";
    $.post(url, {}, function(res) {     
              res=$.parseJSON(res);
     // alert("convert json");
        
             console.log("Ret:");
             console.log(res);
      //alert("hide loading..");
        $.mobile.loading('hide');
           
            if(res.status == 200) {
                DonateObject=res;
                saveInLocalStorge();
                /*--*/
                
                /*--*/
            }
             else{
            alert(res.status);
             }           
    
});
    }
    catch(e)
    {
    alert(e);
    }
}
function loadLocaldateils()
{

// Put the object into storage
//localStorage.setItem('testObject', JSON.stringify(testObject));

// Retrieve the object from storage
var retrievedObject = localStorage.getItem('DonateObject');

console.log('DonateObject: ', retrievedObject==null);
    if(retrievedObject==null)
        return false;
   DonateObject= JSON.parse(retrievedObject)
console.log('retrievedObject: ', JSON.parse(retrievedObject));
    return true;
}
function saveInLocalStorge()
{
     localStorage.setItem('DonateObject', JSON.stringify(DonateObject));               
}