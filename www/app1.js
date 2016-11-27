var myApp = new Framework7(); 


// Export selectors engine
var $$ = Dom7;
var page = 1;
var phots = new Array();
var allphots = new Array();
var totpages = 0;

$$.getJSON('http://battlebrotherhood.ru/api/?json=get_category_posts&id=2', function (data) {

	var output="<ul class='photo_content list-block' id='myid'>";
    
	for (var i in data.posts) {
        output+="<li class='OneFeedInList' id="+data.posts[i].id+"><center><b><a class='pb-standalone-dark feed_title' href='#'>"+data.posts[i].title+"</b><br>";
        output+="<img src='"+ data.posts[i].thumbnail_images.medium.url + " ' /></center></a></li>";
		 
			mm=data.posts[i].id;
			allphots[mm]= [];
			for (var p in data.posts[i].attachments){
				allphots[mm][p]=data.posts[i].attachments[p].url;
				allphots[mm][p]=allphots[mm][p].replace(/.mrserver/g, '');
				allphots[mm][p]=allphots[mm][p].replace(/ /g, '');
			}
    }
	
    output+="</ul>";
    document.getElementById("placephoto").innerHTML=output;
	totpages = data.pages;
});
$$(document).on('click', '.NextClass', function () {
	page=page+1;
	
	$$.getJSON('http://battlebrotherhood.ru/api/?json=get_category_posts&id=2&page='+page, function (data) {

	var output="";
	
    for (var k in data.posts) {
//		curnum = 9 * (page - 1) + data.posts[k].id;
//		console.log(curnum);
//      output+="<li class='OneFeedInList' id="+curnum+"><center><b><a class='pb-standalone-dark feed_title' href='#'>"+data.posts[k].title+"</b><br>";
		output+="<li class='OneFeedInList' id="+data.posts[k].id+"><center><b><a class='pb-standalone-dark feed_title' href='#'>"+data.posts[k].title+"</b><br>";
        output+="<img src='"+ data.posts[k].thumbnail_images.medium.url + " ' /></center></a></li>";
		
			mm=data.posts[k].id;
			allphots[mm]= [];
			for (var p in data.posts[k].attachments){
				allphots[mm][p]=data.posts[k].attachments[p].url;
				allphots[mm][p]=allphots[mm][p].replace(/.mrserver/g, '');
				allphots[mm][p]=allphots[mm][p].replace(/ /g, '');
			}
		
		
    }
   
   
    $$('#placephoto ul').append(output);
	
	
	if  (page>=totpages) { 
	$$('.NextClass').addClass('hide_btn');
	}
});
});


	
$$(document).on('click','#myid li', function() {
	
	qq = $$(this).attr('id');
	
	
});


$$(document).off('click', function(){}).on('click','.pb-standalone-dark', function () {
	
	var myPhotoBrowserDark = myApp.photoBrowser({
		photos : allphots[qq],	theme: 'dark', backLinkText: 'Закрыть', ofText: 'из'
		});
	myPhotoBrowserDark.open();
	});

/* You Tube video from chanal Battlebrotherhood */
var NextVideoPage = "";
$$.getJSON('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&controls=0&playlistId=UUKCzm_RjV_PDqV-k6sINuIg&key=AIzaSyDvPwsV6dAigO7Ogol8al10IbdsUoELbVs', function (data) {
	NextVideoPage = data.nextPageToken;
	var voutput="<ul class='video_content'>";
    for (var i in data.items) {
		voutput+="<div class='OneFeedInList'>";
        voutput+="<p><center><span class='feed_title'><b >"+data.items[i].snippet.title+"</b></span><br>";
		voutput+="<embed src='https://www.youtube.com/embed/" +data.items[i].snippet.resourceId.videoId+"?showinfo=0'/><br>";
		voutput+="</div>";
		
    };
    voutput+="</ul>";
    document.getElementById("placevideo").innerHTML=voutput;
});


	
$$(document).on('click', '.NextVideoClass', function () {
	
	
$$.getJSON('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&pageToken='+NextVideoPage+'&controls=0&playlistId=UUKCzm_RjV_PDqV-k6sINuIg&key=AIzaSyDvPwsV6dAigO7Ogol8al10IbdsUoELbVs', function (data) {
	NextVideoPage = data.nextPageToken;
	var voutput="<ul class='video_content'>";
    for (var i in data.items) {
		voutput+="<div class='OneFeedInList'>";
        voutput+="<p><center><span class='feed_title'><b >"+data.items[i].snippet.title+"</b></span><br>";
		voutput+="<embed src='https://www.youtube.com/embed/" +data.items[i].snippet.resourceId.videoId+"?showinfo=0'/><br>";
		voutput+="</div>";
		
    };
	voutput+="</ul>";
	$$('.VideoContent').append(voutput);
});
});

$$(document).on('refresh','.pull-to-refresh-content',function(e){
  setTimeout(function(){
    myApp.pullToRefreshDone();
    location.reload();
  },500);
});

