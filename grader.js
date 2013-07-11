#!/usr/bin/env node
/*
Automatically grade files for the presence of specified HTML tags/attributes.
Uses commander.js and cheerio. Teaches command line application development
and basic DOM parsing.

References:

 + cheerio
   - https://github.com/MatthewMueller/cheerio
   - http://encosia.com/cheerio-faster-windows-friendly-alternative-jsdom/
   - http://maxogden.com/scraping-with-node.html

 + commander.js
   - https://github.com/visionmedia/commander.js
   - http://tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-interfaces-made-easy

 + JSON
   - http://en.wikipedia.org/wiki/JSON
   - https://developer.mozilla.org/en-US/docs/JSON
   - https://developer.mozilla.org/en-US/docs/JSON#JSON_in_Firefox_2
*/

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var rest = require('restler');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
var URLPATH_DEFAULT = "http://guarded-lowlands-2137.herokuapp.com/";
var inurl=false;

var urlPass = function(inurl)
{
//console.log("in url pass"+inurl);
if(inurl==null)
{
console.log("%s does not exist. Exiting.", instr);
        process.exit(1);

}
else{
//console.log("again------------"+inurl);
URLPATH_DEFAULT = inurl;
//console.log(URLPATH_DEFAULT);
return URLPATH_DEFAULT.toString();
}
}
var assertFileExists = function(infile) {
//console.log("testing file name"+ infile);    
var instr = infile.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};
//
//var assertUrlExists = function(inurl) {
//var infile = getHtmlfile(URLPATH_DEFAULT);
// var instr = infile.toString();
   // if(!fs.existsSync(instr)) {
       // console.log("%s does not exist. Exiting.", instr);
     //   process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
   // }
  //  return instr;

//}; 
var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(htmlfile);
//return cheerio.load(fs.readFileSync(htmlfile));
};

var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(htmlfile, checksfile) {
//var htmlfile = getHtmlFile(URLPATH_DEFAULT);   
 $ = cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
        out[checks[ii]] = present;
    }
 var outJson = JSON.stringify(out, null, 4);
console.log(outJson);
    //return out;
};

var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

var getHtmlFile =  function(URLPATH_DEFAULT) {    
    rest.get(URLPATH_DEFAULT).on('complete', function(result){
	if (result instanceof Error) {        
        	// It's bad    
        	sys.puts('Error: ' + result.message);
   		 this.retry(5000);
    	} else {

  var checkJson = checkHtmlFile(result, program.checks);
  // var outJson = JSON.stringify(checkJson, null, 4);
//console.log(outJson);
//		return "tmpIndex.html";
       		//return (result);	
        // You may check the value of response : 
       // sys.puts(result);
       //checkHtmlFile(result, CHECKSFILE_DEFAULT);
        // If not, it's bad    
    }
});
}
if(require.main == module) {
    program
        .option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
        .option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
      .option('-u,  --url  <url>',       'url to crowdfundersite',clone(urlPass), URLPATH_DEFAULT)
 .parse(process.argv);
//	console.log("getting remote file");
//var x = urlPass();   
//console.log(x); 
//if(true)
  //  {

       var x= getHtmlFile(URLPATH_DEFAULT); 
    //}	//console.log("testing");
   //else
   //{  console.log('I am in file');
   
    //var checkJson = checkHtmlFile(x, program.checks);
    //var outJson = JSON.stringify(checkJson, null, 4);
    //console.log(outJson);
    //}
} 
else {
    exports.checkHtmlFile = checkHtmlFile;
}
