google.charts.load('current', {packages: ['corechart']});
google.charts.load('current', {'packages':['bar']});


var mRevisions, lRevisions, lEdit, sEdit, lHistory, sHistory
var bdata, cdata, articleList, title, reNumber, users, tdata

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    
    $.each($('.tabcontent'), function(index) {
    	drawTopEditorsBar(tdata[index], $(this));
    });
}

function drawRevDistributeByBuTable(data){
    var columnData = google.visualization.arrayToDataTable(data);
    var barOptions = {
            bars: 'vertical',
            vAxis: {format: 'decimal'},
            colors: ['#1b9e77', '#d95f02', '#7570b3', '#3366cc'],
            'width':1000,
            'height':350
    };
    
    var chart = new google.charts.Bar($("#revDistributeByBuTable")[0]);
    chart.draw(columnData, google.charts.Bar.convertOptions(barOptions));
}

function revDistributePieChart(data){
   	graphData = new google.visualization.DataTable();
	graphData.addColumn('string', 'User type');
	graphData.addColumn('number', 'Percentage');
	$.each(data, function(key, val) {
		graphData.addRow([key, val]);
	})
	var chartOptions = {
        'width':600,
        'height':350,
        pieSliceText: 'percentage',
        slices: {  1: {offset: 0.3},
                   3: {offset: 0.3}
        }
	};
	var chart = new google.visualization.PieChart($("#revDistributePieChart")[0]);
	chart.draw(graphData, chartOptions);
}

function drawTopEditorsBar(data, pos) {
    var TopEditorsBarData = google.visualization.arrayToDataTable(data);
    var TopEditorsBarOptions = {
            bars: 'vertical',
            'width':400,
            'height':300
    };
    
    var chart = new google.charts.Bar(pos[0]);
    chart.draw(TopEditorsBarData, google.charts.Bar.convertOptions(TopEditorsBarOptions));	
}

function drawOverallPie(){
   	graphData = new google.visualization.DataTable();
	graphData.addColumn('string', 'User type');
	graphData.addColumn('number', 'Percentage');
	$.each(cdata, function(key, val) {
		graphData.addRow([key, val]);
	})
	var chartOptions = {
        'width':600,
        'height':350,
        pieSliceText: 'percentage',
        slices: {  1: {offset: 0.3},
                   3: {offset: 0.3}
        }
	};
	var chart = new google.visualization.PieChart($("#overallChart")[0]);
	chart.draw(graphData, chartOptions);
}

function drawLastBarChart(data){
    var columnData = google.visualization.arrayToDataTable(data);
    var barOptions = {
            bars: 'vertical',
            vAxis: {format: 'decimal'},
            colors: ['#1b9e77', '#d95f02', '#7570b3', '#3366cc', '#00FF00'],
            'width':800,
            'height':500
    };
    
    var chart = new google.charts.Bar(document.getElementById('lastBarChart'));
    chart.draw(columnData, google.charts.Bar.convertOptions(barOptions));
}

function drawOverallBar(){
    var columnData = google.visualization.arrayToDataTable(bdata);
    var barOptions = {
            bars: 'vertical',
            vAxis: {format: 'decimal'},
            colors: ['#1b9e77', '#d95f02', '#7570b3', '#3366cc'],
            'width':1000,
            'height':350
    };
    
    var chart = new google.charts.Bar(document.getElementById('overallChart'));
    chart.draw(columnData, google.charts.Bar.convertOptions(barOptions));
}

function fillList(){
		var aList = {};
   		aList.d = articleList;
   		
   		$('#myTable tr').not(':first').remove();
   		var html = '';
   		for(var i = 0; i < aList.d.length; i++)
   		            html += '<tr><td>' + aList.d[i].Article + '</td><td>' + aList.d[i].Revision + '</td></tr>';
   		$('#myTable tbody').first().after(html);
}

function topFiveRegUsersTable(user, number) {
		$('#topFiveRegUsersTable tr').remove();
   		var topFiveUsersHtml = '';
   		for(var i = 0; i < 5; i++)
   			topFiveUsersHtml += '<tr><td>' + user[i] + '</td><td>' + number[i] + '</td></tr>';
   		$('#topFiveRegUsersTable tbody').first().after(topFiveUsersHtml);
}

function keyWord() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("myInput");
	  filter = input.value.toUpperCase();
	  table = document.getElementById("myTable");
	  tr = table.getElementsByTagName("tr");

	  // Loop through all table rows, and hide those who don't match the search query
	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[0];
	    if (td) {
	      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    } 
	  }
}

$(document).ready(function() {
    $.getJSON('/overviewdata', null, function(rdata) {
    	bdata = rdata.barData;
    	cdata = rdata.chartData;
    	mRevisions = rdata.mRevisons;
    	lRevisions = rdata.lRevisions;
    	lEdit = rdata.lEdit;
    	sEdit = rdata.sEdit;
    	lHistory = rdata.lHistory;
    	sHistory = rdata.sHistory;
    }
    );
    
    $.getJSON('/individualdata', null, function(rdata) {
    	articleList = rdata.articleList;
    }
    );
    
    $(".individual").hide();
    $('.reNumber').hide();
    
    $("#overviewLink").click(function(event){
    	event.preventDefault();
   		$("#individualLink").css("background-color","");
   		$(this).css("background-color","#0F0");
   		$("#mostRevisions").text("The article with the most number of revisions: " + mRevisions);
   		$("#leastRevisions").text("The article with the least number of revisions: " + lRevisions);
   		$("#lEditors").text("The article edited by largest group of registered users: " + lEdit);
   		$("#sEditors").text("The article edited by smallest group of registered users: " + sEdit);
   		$("#lHistory").text("The article with the longest history: " + lHistory);
   		$("#sHistory").text("The article with the shortest history: " + sHistory);
   		drawOverallBar();  
    	$('.reNumber').show();
    	$("#overallBarChart").click();
    	$(".overview").show();
    	$(".individual").hide();
   	})
   	
    $("#individualLink").click(function(event){
    	event.preventDefault();
   		$("#overviewLink").css("background-color","");
   		$(this).css("background-color","#0F0");
   		fillList();
   		
    	$(".overview").hide();
    	$(".individual").show();
    	$(".loader").hide();
    	$('.userinfo').hide();
    	$('.articleChart').hide();
   	})
	
   	$("#overallBarChart").click(function(event){
   		event.preventDefault();
   		$("#overallPieChart").css("background-color","");
   		$(this).css("background-color","#0F0");
   		drawOverallBar()
   	})
   	
   	$("#overallPieChart").click(function(event){
   		event.preventDefault();
   		$("#overallBarChart").css("background-color","");
   		$(this).css("background-color","#0F0");
   		drawOverallPie();
   	})
    
    $('#topFiveRegUsers').click(function(event){
    	event.preventDefault();
    	$('.articleChart').hide();
    	$('.articleTab').css("background-color","");
    	$(this).css("background-color","#0F0");
    	$('#topFiveRegUsersTable').show();
    })
    
    $('#revDistributeByBu').click(function(event){
    	event.preventDefault();
    	$('.articleChart').hide();
    	$('.articleTab').css("background-color","");
    	$(this).css("background-color","#0F0");
    	$('#revDistributeByBuTable').show();
    })    

    $('#revDistributePie').click(function(event){
    	event.preventDefault();
    	$('.articleChart').hide();
    	$('.articleTab').css("background-color","");
    	$(this).css("background-color","#0F0");
    	$('#revDistributePieChart').show();
    })
    
    $('#revDistribute').click(function(event){
    	event.preventDefault();
    	$('.articleChart').hide();
    	$('.articleTab').css("background-color","");
    	$(this).css("background-color","#0F0");
    	$('#distributeChart').show();
    })
    
    $('#lastChartTab').click(function(event){
    	event.preventDefault();
    	$('.articleChart').hide();
    	$('.articleTab').css("background-color","");
    	$(this).css("background-color","#0F0");
    	$('#lastBarChart').show();
    })    
    
    $('#myTable').delegate('tr', 'click', function(){
    	$(".loader").show();
        title = $(this).find('td:first').html();
        reNumber = $(this).find('td:nth-child(2)').html();
        
        let getArticle = $.getJSON('/articledata', {title: title});
        
        getArticle.done(function(rdata) {
        	lastReNumber = rdata.reNumber;
	    	users = rdata.users;
	    	usersRevNumber = rdata.usersRevNumber;
	    	tdata = rdata.userRevisions;
	    	bybudata = rdata.bybu;
	    	piedata = rdata.piedata;
	    	lastBarData = rdata.lastBarChart;
	    	
	    	$("#articleTitle").text("The title: " + title);
	    	$("#totalRevisions").text("The total number of revisions: " + lastReNumber);
	    	topFiveRegUsersTable(users, usersRevNumber);
	    	drawRevDistributeByBuTable(bybudata);
	    	revDistributePieChart(piedata);
	    	drawLastBarChart(lastBarData);
	        $.each($('.tablinks'), function(index) {
	        	$(this).text(users[index]);
	        });
	        
	        $(".loader").hide();
	        if (lastReNumber > reNumber) {
	        	alert(lastReNumber - reNumber + ' new revisions has been downloaded.');	        	
	        } else {
	        	alert('no new revisions.');
	        }	      
	        $('.userinfo').show();
        });
    })
});