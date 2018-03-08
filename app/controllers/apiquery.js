
var wdk = require('wikidata-sdk');
const breq = require('bluereq');
var http = require('https');
const ids = ['Q647268', 'Q771376', 'Q860998', 'Q965704']
const url1 = wdk.getWikidataIdsFromWikipediaTitles('Australia')
function cb(err, docs) {
    if (err) {
        // TODO: handle error
    } else {
        console.info(docs);
    }
}
https://en.wikipedia.org
	var titles;
    var rvstart;
	var options = {
		hostname: 'en.wikipedia.org',
		path: '/w/api.php?action=query&format=json&prop=revisions&titles=Australia&rvprop=timestamp%7Cuser&rvlimit=max&rvstart=2017-04-02T19%3A00%3A34.000Z'
};
http.request(options, function(res){
	var data = '';
	res.on('data', function(chunk){
	data += chunk;
	});
	res.on('end', function(){
	data = JSON.parse(data);
	console.log(data)
	});
	}).end();