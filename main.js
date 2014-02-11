$(document).ready(function () {



//////////////////////////////  DATA  ///////////////////////////////////


//////////////////////////////  OBJECTS  ///////////////////////////////////

    var Crypto = function (title, imageName) {
        this.title = title;
        this.imageName = imageName;
        this.test1 = function () {
            return "hello from test1";
        }

    };
    Crypto.prototype.createJqueryElement = function () {
        var source = $("#crypto-template").html();  // make this object property?
//        console.log(source);
        var template = Handlebars.compile(source);
//        console.log($(template(this)));
        return $(template(this));
    };
    Crypto.prototype.createDOMElement = function () {
        return this.createJqueryElement()[0];
    };
    Crypto.prototype.createTextElement = function () {
        return this.createJqueryElement().html();
    };
    Crypto.prototype.getCurrentPrice = function () {
        return 700;

    };

////////////////////////////////

    var Portfolio = function (cryptos) {
        this.cryptos = cryptos; //array of Crypto objects
    }
    Portfolio.prototype.createJqueryElement = function () {
        var source = $("#portfolio-template").html();  // make this object property?
//        console.log(source);
        var template = Handlebars.compile(source);
//        console.log($(template(this)));
        return $(template(this));

    };


//////////////////////////////  EVENT HANDLERS  ///////////////////////////////////


//////////////////////////////  MAIN  ///////////////////////////////////
//    $(".sparkline").sparkline([1, 4, 4, 7, 5, 9, 10, 1, 4, 4, 7, 5, 9, 10, 1, 4, 4, 7, 5, 9, 10, 1, 4, 4, 7, 5, 9, 10]);
//
//
//    google.load("visualization", "1", {packages: ["corechart"]});
//    google.setOnLoadCallback(drawChart);
//    function drawChart() {
//        var data = google.visualization.arrayToDataTable([
//            ['Year', 'Sales', 'Expenses'],
//            ['2004', 1000, 400],
//            ['2005', 1170, 460],
//            ['2006', 660, 1120],
//            ['2007', 1030, 540]
//        ]);
//
//        var options = {
//            title: 'Company Performance',
//            hAxis: {title: 'Year', titleTextStyle: {color: 'red'}}
//        };
//
//        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
//        chart.draw(data, options);
//    }


//    var source   = $("#crypto-template").html();  // make this object property?
//    console.log(source);
    var bitcoin = new Crypto("Bitcoin", "bitcoin.png");
    var portfolio = new Portfolio([bitcoin]);
    $("#portfolio-container").append(portfolio.createJqueryElement());

//////////////////////////////  END MAIN  ///////////////////////////////////
});