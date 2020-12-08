$(document).ready(function(){
function randomString( string_length =15) {
	//var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var chars = "0123456789";
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
	}
    
$("#newlive span").on('click',function()
{
    const roomId = randomString(8);
    document.getElementById("roomid").value=roomId;
    localStorage.setItem('live_id', roomId); 
});

$("#golive").on('click',function()
{
    
    //const roomId =  localStorage.getItem('live_id'); 
    const roomId =  document.getElementById("roomid").value; 
    if(roomId ===null || roomId =="")
    {
        alert("Enter a Valid Meeting Id");
    }
    
    else{
        jitsiplugin.loadURL('https://meet.jit.si/' + roomId, roomId, false, function (data) {
            if (data === "CONFERENCE_WILL_LEAVE") {
                jitsiplugin.destroy(function (data) {
                    // call finished
                }, function (err) {
                    console.log(err);
                });
            }
        }, function (err) {
            console.log(err);
        });
    }
});


$("#share").on('click',function(){
    const roomId =  document.getElementById("roomid").value; 
    if(roomId ===null || roomId =="")
    {
        alert("Create a Meeting First Then Share");
    }
    else{
     var msg ="Hi, I am using *LivePlant* App very easy, smooth and fast download Now and join with meeting id *" + roomId +"* Download Now \n";
	  var url ="https://bit.ly/liveplantapp";
	  
     /*navigator.screenshot.save(function(error,res){
	  if(error){
		console.error(error);
	  }else{
		console.log('ok',res.filePath); //should be path/to/myScreenshot.jpg
		imageLink = res.filePath;
		window.plugins.socialsharing.share(msg, null, 'file://'+imageLink, url );
		}
	  },'jpg',50,'myScreenShot');*/
      
       window.plugins.socialsharing.share(msg, null, null , url );
     }
});	


function alert(msg) {
  window.plugins.toast.showWithOptions(
    {
      message: msg,
      duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
      position: "bottom",
      addPixelsY: -40  // added a negative value to move it up a bit (default 0)
    }
    //onSuccess, // optional
    //onError    // optional
  );
}


});