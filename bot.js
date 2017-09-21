const http = require('https');
const fs = require('fs');
var fields = ['sex', 'bdate', 'city','country'];
var token = 'bed7f2d479c29347a75363bbb5a089e0a13057d05721a571cdbf66d6dac98b98283b3bb175ff50c72f76c';
var mass= {
	count:60,
	user_id:140104825,
	access_token:token,
	fields:'photo_50',
}
var wall_get = {
	access_token:token,
	count:2,
	filter:'all'
}
var grups = {
	'styd.pozor':0,
	'styd.pozor':0,
	'mhkoff':0
	,'konturgusya':0,
	'sh_ring':0,
	'21jqofa':0,
	'icecreamvan':0,
	'top5aliexpressa':0

}
var t = 0;
var postvk = {}
var telegram_answer = {};
var text = '';
function a(url,mass){
	var get = '';
    for(var i in mass){
    	if(typeof(mass[i])!="object"){
    		get += i+'='+mass[i]+'&';
    	}else{
            get +=i +'=';
            for(var j in mass[i]){
            	get +=mass[i][j]+'%2';
            }
            get = get.substring(0, get.length - 1);
            get +='&';
    	}
      
    }
    get = get.substring(0, get.length - 1);
    url +=get;
    return url;
}
var e = 0; 
function get(url,mass,b,e){
	// http.get(a('https://api.vk.com/method/wall.get?',wall_get), (res)=>{
	 http.get(a(url,mass), (res)=>{
	 const { statusCode } = res;
     const contentType = res.headers['content-type'];
   	 res.setEncoding('utf-8');
   	 //res.setHeader('Content-Type','text/plain');
   	 let rawData = '';
     res.on('data', (chunk) => { rawData += chunk; });
     res.on('end', () => {
         const parsedData = JSON.parse(rawData);
         if(b==1){
         	telegram_answer = parsedData;
         }
         if(b==2){
         	postvk = parsedData;
         	wall_get['domain'] = grup[e]; 
            if(postvk.response!=undefined){
	    	    console.log(postvk);
		       if(postvk.response[2].media==undefined){
		       	 if( postvk.response[2].id!=grups[grup[e]]){
		       	  text = postvk.response[2].text;
			      grups[grup[e]] = postvk.response[2].id;
			      console.log('отправка');
			      smstelegram();
		       	 }
			   
		       }
	        }
	       e++;
	       if(e==7){
		      e = 0;
	        }
	        get('https://api.vk.com/method/wall.get?',wall_get,2,e)
         }
          
         //console.log(parsedData);
          //console.log(parsedData.response[1].likes);
         //console.log(parsedData);
         //for(var i=1;i<parsedData.response.length;i++){
        //     console.log(parsedData.response[i].first_name)
        // }
     });

   });
}
//get();
//телеграмм
// url : https://api.telegram.org/bot391942399:AAFDs5fetT-92lBpb1i2NJxHKm3x02HEQ-g/getUpdates
//var token = 391942399:AAFDs5fetT-92lBpb1i2NJxHKm3x02HEQ-g;
//var s1  = 'getUpdates'; //все сообщения;
//https://vk.com/photo226225302_456240476
var id_count = 0;
var id_telegram = {}
// получение id пользователей
setInterval(function() {
   get('https://api.telegram.org/bot391942399:AAFDs5fetT-92lBpb1i2NJxHKm3x02HEQ-g/getUpdates',[],1);
   //console.log(a('https://api.telegram.org/bot391942399:AAFDs5fetT-92lBpb1i2NJxHKm3x02HEQ-g/getUpdates',[]));
   if(telegram_answer.result!=undefined){
   	   for(var i=id_count;i<telegram_answer.result.length;i++){
            //console.log(telegram_answer.result[i].message.chat.id);
           id_count++;
           if(id_telegram[telegram_answer.result[i].message.chat.id]==undefined){
           	  id_telegram[telegram_answer.result[i].message.chat.id] = 1;
           	  smstelegram();
           }

        }
   }

},3000);
//отправка сообщения
function smstelegram() {
   var message = {}
   message['text'] = encodeURIComponent(text); 
   for(var chat_id in id_telegram){
      message['chat_id'] = chat_id;
      get('https://api.telegram.org/bot391942399:AAFDs5fetT-92lBpb1i2NJxHKm3x02HEQ-g/sendmessage?',message,0);
      //console.log(a('https://api.telegram.org/bot391942399:AAFDs5fetT-92lBpb1i2NJxHKm3x02HEQ-g/sendmessage?',message));
      //console.log(id_telegram);
   }
   
}
//получение постов вк 

var grup = ['mhkoff','konturgusya','sh_ring','21jqofa','icecreamvan','styd.pozor','top5aliexpressa']
setInterval(function() {
	//for(var key in grups){
	
     	wall_get['domain'] = grup[e]; 
get('https://api.vk.com/method/wall.get?',wall_get,2,e);

	

	
	
	});

   //console.log(postvk);
//},3000);
