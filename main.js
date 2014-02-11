$(document).ready(function() {


$(".sparkline").sparkline([1,4,4,7,5,9,10,1,4,4,7,5,9,10,1,4,4,7,5,9,10,1,4,4,7,5,9,10]);




            google.load("visualization", "1", {packages:["corechart"]});
            google.setOnLoadCallback(drawChart);
            function drawChart() {
                var data = google.visualization.arrayToDataTable([
                ['Year', 'Sales', 'Expenses'],
                ['2004',  1000,      400],
                ['2005',  1170,      460],
                ['2006',  660,       1120],
                ['2007',  1030,      540]
                ]);

                var options = {
                title: 'Company Performance',
                hAxis: {title: 'Year', titleTextStyle: {color: 'red'}}
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
            chart.draw(data, options);
            }












});