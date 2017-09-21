const http = require('https');
const fs = require('fs');
var tokenvk = 'bed7f2d479c29347a75363bbb5a089e0a13057d05721a571cdbf66d6dac98b98283b3bb175ff50c72f76c';
var id_count = 0;
var id_telegram = {};
var message = {};
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
function get(url,array,col,t){
	http.get(a(url,array), (res)=>{ 
      res.setEncoding('utf-8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
         var parsedData = JSON.parse(rawData);
         if(col!=undefined){
         	col(parsedData,t);
         }
	  });
	});  
}
function idtelegramm(telegram_answer) {
   if(telegram_answer.result!=undefined){
   	   for(var i=id_count;i<telegram_answer.result.length;i++){
           id_count++;
           if(id_telegram[telegram_answer.result[i].message.chat.id]==undefined){
           	  id_telegram[telegram_answer.result[i].message.chat.id] = 1;
           }

        }
   }

}
function postvk(vk,e){
	   if(vk.response!=undefined){
		       if(vk.response[2].media==undefined){
		       	 if( vk.response[2].id!=grups[grup[e]]){
		       	  text = vk.response[2].text;
			      grups[grup[e]] = postvk.response[2].id;
			      text.unshft();
		       	 }
			   
		    }
	    }
	    e++;
	    if(e==7){
		  e = 0;
	    }
	   get('https://api.vk.com/method/wall.get?',wall_get,postvk,e);
	        
}
get('https://api.vk.com/method/wall.get?',wall_get,postvk,0);

setInterval(function() {
  get('https://api.telegram.org/bot391942399:AAFDs5fetT-92lBpb1i2NJxHKm3x02HEQ-g/getUpdates',[],idtelegramm);
  message['text'] = encodeURIComponent('привет'); 
  for(var chat_id in id_telegram){
      message['chat_id'] = chat_id;
      console.log(id_telegram);
      get('https://api.telegram.org/bot391942399:AAFDs5fetT-92lBpb1i2NJxHKm3x02HEQ-g/sendmessage?',message);
  }
},3000);