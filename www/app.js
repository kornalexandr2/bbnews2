var myApp = new Framework7(); 

var allphot = [];



// Export selectors engine
var $$ = Dom7;
var page = 1;

//social links




var FB = '<li><a class="external link" target="_blank" href="http://www.facebook.com/boewoebratstwo/" ><img src="soc_img/fb.png"/></a></li>';
$$(FB).on('click', function () {


});
$$('.ss_l').append(FB);


var VKurl = 'http://www.facebook.com/boewoebratstwo/';
var VK = '<li><a class="external link" target="_blank" href="'+VKurl+'" ><img src="soc_img/fb.png"/></a></li>';
$$(VK).on('click', function () {
 
 
});
$$('.ss_r').append(VK);




//var ref = cordova.InAppBrowser.open('http://apache.org', '_blank', 'location=yes');

$$.getJSON('http://battlebrotherhood.ru/api/?json=get_category_posts&id=2', function (data) {

	var output="<ul class='photo_content list-block' id='myid'>";
	
    for (var i in data.posts) {

        output+="<li class='OneFeedInList' id="+data.posts[i].id+"><center><b><a class='pb-standalone-dark feed_title' href='#'>"+data.posts[i].title+"</b><br>";
        output+="<img src='"+ data.posts[i].thumbnail_images.medium.url + " ' /></center></a></li>";
		
		allphot [data.posts[i].id] = data.posts[i].url;

    }
	
    output+="</ul>";
    document.getElementById("placephoto").innerHTML=output;
	//$$('placephoto').append(output) ;

var totpages = data.pages;

$$(document).on('click', '.NextClass', function () {
	
	page=page+1;
	
	$$.getJSON('http://battlebrotherhood.ru/api/?json=get_category_posts&id=2&page='+page, function (data) {

	var koutput="";
    for (var k in data.posts) {

        koutput+="<li class='OneFeedInList' id="+data.posts[k].id+"><center><b><a class='pb-standalone-dark feed_title' href='#'>"+data.posts[k].title+"</b><br>";
        koutput+="<img src='"+ data.posts[k].thumbnail_images.medium.url + " ' /></center></a></li>";


    }
	
   // koutput+="</ul>";
    $$('.list-block ul').append(koutput);
	
	if  (page>=totpages) { 
	$$('.NextClass').addClass('hide_btn');

	}
})
});

$$(document).on('click','#myid li', function() {
  

	qq = $$( this).attr("id");
	console.log (qq);
	console.log (allphot[qq]);
	
	
});


$$(document).off('click', function(){}).on('click','.pb-standalone-dark', function () {

/*for (i = 0; i < data.posts[qq].attachments; i++) {*/
		for (var i in data.posts[qq].attachments) {
		
var phots = [];
for(var ii in data.posts[qq].attachments) {
phots [ii] = data.posts[qq].attachments[ii].url;
}
		
		}
	
	
	var myPhotoBrowserDark = myApp.photoBrowser({
		photos : phots,

	theme: 'dark', backLinkText: 'Закрыть', ofText: 'из'
	
		});
		
console.log (phots);
	
	myPhotoBrowserDark.open();
	
	});

	
});


		
		
		//Video in YouTube chanel BattleBrothrhood
/*	
		
		$$.getJSON('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&controls=0&playlistId=UUKCzm_RjV_PDqV-k6sINuIg&key=AIzaSyDvPwsV6dAigO7Ogol8al10IbdsUoELbVs', function (data) {
	
	var output="<ul class='video_content'>";
    for (var i in data.items) {
		output+="<div class='OneFeedInList'>";
        output+="<p><center><span class='feed_title'><b >"+data.items[i].snippet.title+"</b></span><br>";
		output+="<embed src='https://www.youtube.com/embed/" +data.items[i].snippet.resourceId.videoId+"?showinfo=0'/><br>";
		output+="</div>";
		
    }
    output+="</ul>";
    document.getElementById("placevideo").innerHTML=output;
	
});
*/
	
$$(document).on('refresh','.pull-to-refresh-content',function(e){
  setTimeout(function(){
    myApp.pullToRefreshDone();
    location.reload();
  },500);
});
