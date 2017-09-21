var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter;
var fs = require('fs');
var http = require('https');
var url = require('url');
var telegram = 'https://api.telegram.org/bot391942399:AAFDs5fetT-92lBpb1i2NJxHKm3x02HEQ-g/getUpdates';
var tokenvk = 'bed7f2d479c29347a75363bbb5a089e0a13057d05721a571cdbf66d6dac98b98283b3bb175ff50c72f76c';
var wall_get = {
	access_token:tokenvk,
	count:2,
	filter:'all'
}
var grups = [
	'styd.pozor',
	'styd.pozor',
	'mhkoff'
	,'konturgusya',
	'sh_ring',
	'21jqofa',
	'icecreamvan',
	'top5aliexpressa'
];
var x = 0;
var telegramid = [];
function get(url,e){
	http.get(url, (res)=>{ 
	   res.setEncoding('utf-8');
	   let rawData = '';
	   res.on('data', (chunk) => { rawData += chunk;});
	   res.on('end', () => {
	     var parsedData = JSON.parse(rawData);  
	     //console.log(parsedData.result[0].message.chat.id);
         event.emit('loading',{content:parsedData,type:e});

	   });
	});
}
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
setInterval(function() {
	get(telegram,'telegram');
},3000);
setInterval(function() {
	wall_get['domain']= grups[x];
	if(x>grups.length-1){x=0}else{x++;}
	get(a('https://api.vk.com/method/wall.get?',wall_get),'vk');
},25000);
event.on('loading',function(e){ 
   if(e.type=='telegram'){
   	 telegrammass(e.content);
   }
   if(e.type=='vk'){
   	 vkMass(e.content);
   }
   
})

function telegrammass(e){
	var mass = [];
	for(var i =0;i<e.result.length;i++){
	  mass.push(e.result[i].message.chat.id);
	}
	telegramid = mass;
}
var contenttext = [];
function vkMass(e){
	var b = true;
	if(e.response[2].media==undefined){
      var text = e.response[2].text; 
      for(var i=0;contenttext.length>i;i++){
      	if(contenttext[i]==text){b = false;}
      }
      if(b){
      	otpravka(text)
      	contenttext.unshift(text)
      	if(contenttext.length>10){
      		contenttext.pop();
      	}
      }
	}
}
function otpravka(text){
   var message = {}
   message['text'] = encodeURIComponent(text); 
   for(var i=0;telegramid.length>i;i++){
      message['chat_id'] = telegramid[i];
      get(a('https://api.telegram.org/bot391942399:AAFDs5fetT-92lBpb1i2NJxHKm3x02HEQ-g/sendmessage?',message),'null');

   }
   //get('https://api.telegram.org/bot391942399:AAFDs5fetT-92lBpb1i2NJxHKm3x02HEQ-g/sendmessage?',);
}