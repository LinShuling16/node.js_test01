var http=require('http');
var cheerio=require('cheerio');
var url='http://www.cnblogs.com/Lwd-linux/archive/2017/01.html';

//获取
function filterChapters(html){
	var $=cheerio.load(html);

	var chapters=$('.entrylistItem');

	var courseData=[];
	chapters.each(function(){
		var chapter=$(this);
		var chapterTitle=chapter.find('.entrylistItemTitle').text();
		var summary=chapter.find('.c_b_p_desc').text();
		var chapterData={
			chapterTitle:chapterTitle,
			summary:summary
		};
		courseData.push(chapterData);
	})

	
	return courseData;
}
//打印
function printCourseInfo(courseData){
	courseData.forEach(function(item){
		var chapterTitle=item.chapterTitle;
		console.log(chapterTitle+'\n');
		var summary=item.summary;
		console.log(summary+'\n');
	})
}


http.get(url,function(res){
	var html='';

	res.on('data',function(data){
		html+=data;
	})

	res.on('end',function(){
		var courseData=filterChapters(html);
		printCourseInfo(courseData);
	}).on('error',function(){
		console.log('获取数据出错！');
	})
})