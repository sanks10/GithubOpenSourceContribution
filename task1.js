let request=require('request');
let cheerio=require('cheerio');
request("https://www.github.com/topics",callback);
function callback(error, response, html){
    if(!error){
        const manipulationtool=cheerio.load(html);
        let r=manipulationtool(".no-underline.d-flex.flex-column.flex-justify-center");
        for(let i=0;i<3;i++){
            console.log(manipulationtool(r[i]).text());
            console.log("https://www.github.com"+manipulationtool(r[i]).attr("href"));
            
        }
 
    }
}