let request=require('request');
let cheerio=require('cheerio');
let fs=require('fs');
let data={};


request("https://www.github.com/topics",callback);
function callback(error, response, html){
    if(!error){
        const manipulationtool=cheerio.load(html);
        let r=manipulationtool(".no-underline.d-flex.flex-column");
        for(let i=0;i<3;i++){
            topicProcessor("https://www.github.com/"+manipulationtool(r[i]).attr("href"),manipulationtool(manipulationtool(r[i]).find("p")[0]).text().trim());

            // console.log(manipulationtool(r[i]).text());
            // console.log("https://www.github.com"+manipulationtool(r[i]).attr("href"));
            
        }
 
    }
}

function topicProcessor(url, topicName){
    request(url, function(err, res, html){
        let mt=cheerio.load(html);
        let headings=mt(".f3.color-text-secondary.text-normal.lh-condensed");
        headings=headings.slice(0,5);
        for(let i=0;i<headings.length;i++){
            //console.log(mt(mt(headings[i]).find("a")[1].attr("href")));
            if(!data[topicName]){
                data[topicName]=[];
                data[topicName].push({name: mt(mt(headings[i]).find("a")[1]).text().trim() , });
            }
            else{
                data[topicName].push({name: mt(mt(headings[i]).find("a")[1]).text().trim(), });
            }
            console.log("https://github.com/"+mt(mt(headings[i]).find("a")[1]).attr("href"));
        }
        fs.writeFileSync("data.json",JSON.stringify(data))

    });
}

function projectProcessor(projectUrl, topicName, projectName){

}