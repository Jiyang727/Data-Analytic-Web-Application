/**
 * The file to start a server
 *
 */

var express = require('express');
var path = require('path')
var app = express()

var overviewVal = {
			'mRevisons': 666,
			'lRevisions': 1,
			'lEdit': 'largest group of registered users',
			'sEdit': 'smallest group of registered users',
			'lHistory': 'The article with the longest history',
			'sHistory': 'The article with the shortest history',
			'barData': [['Timestamp', 'Administrator', 'Anonymous', 'Bot', 'Regular user'], ['2001', 0, 0, 0, 0], ['2002', 0, 500, 0, 1000], ['2003', 0, 1000, 0, 2000], ['2004', 1000, 5000, 0, 8000],
			            ['2005', 3000, 23000, 0, 28000], ['2006', 5000, 49000, 2500, 75000], ['2007', 4000, 24000, 2400, 65000],
			            ['2008', 2500, 11000, 2300, 45000], ['2009', 3000, 10000, 1000, 35000], ['2010', 1000, 3000, 1100, 30000],
			            ['2011', 1000, 2000, 1000, 20000], ['2012', 1000, 1500, 500, 22000], ['2013', 1500, 2000, 0, 12500],
			            ['2014', 1000, 1300, 0, 12000], ['2015', 1500, 1600, 0, 13000], ['2016', 1000, 1000, 0, 10000]],
			'chartData': {'Regular user': 679, 'Bot': 23, 'Anonymous': 250, 'Administrator': 49}
}

var indiVal = {
	'articleList': [{Article: 'First', Revision: '20'}, 
	   		          {Article: 'Cheese', Revision: '98'},
	   		          {Article: 'Martin', Revision: '45'}, 
	   		          {Article: 'Cheese', Revision: '98'},
	   		          {Article: 'Martin', Revision: '45'}, 
	   		          {Article: 'Cheese', Revision: '98'},
	   		          {Article: 'Martin', Revision: '45'}, 
	   		          {Article: 'Cheese', Revision: '98'},
	   		          {Article: 'Martin', Revision: '45'}, 
	   		          {Article: 'Cheese', Revision: '98'},
	   		          {Article: 'Last', Revision: '45'}],   		          
}

var articleInfo = {
	'title': 'First',
	'reNumber': 100,
	'users': ['First user1', 'First user2', 'First user3', 'First user4', 'First user5']
}

app.set('views', path.join(__dirname,'app','views'));
app.use(express.static(path.join(__dirname, 'public')));
	
app.get('/',function(req,res){
	res.render("entry.pug")
})

app.get('/overviewdata', function(req, res){
	res.json(overviewVal);
});

app.get('/individualdata', function(req, res){
	res.json(indiVal);
});

app.get('/articledata', function(req, res){
	res.json(articleInfo);
});

app.listen(3000, function () {
	  console.log('Plot app listening on port 3000!')
	})

module.exports = app;