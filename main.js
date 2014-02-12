$(document).ready(function () {
//////////////////////////////  DATA  ///////////////////////////////////


//////////////////////////////  OBJECTS  ///////////////////////////////////

    var HandleBarsCreatable = function (scriptTagID) {
        this.scriptTagID = scriptTagID;
    };
    HandleBarsCreatable.prototype.createJqueryElement = function () {
        var source = $(this.scriptTagID).html();  // make this object property?
        var template = Handlebars.compile(source);
        return $(template(this));
    };
    HandleBarsCreatable.prototype.createDOMElement = function () {
        return this.createJqueryElement()[0];
    };
    HandleBarsCreatable.prototype.createTextElement = function () {
        return this.createJqueryElement()[0].outerHTML;
    };

//////////////////////////////////

    var Crypto = function (title, imageName, scriptTagID) {
        HandleBarsCreatable.call(this, scriptTagID);
        this.title = title;
        this.imageName = imageName;
        this.test1 = function () {
            return "hello from test1";
        }

    };
    Crypto.prototype = new HandleBarsCreatable();
    Crypto.prototype.getCurrentPrice = function () {
        return 700;
    };

////////////////////////////////

    var Portfolio = function (cryptos, scriptTagID) {
        HandleBarsCreatable.call(this, scriptTagID);
        this.cryptos = cryptos; //array of Crypto objects
    }
    Portfolio.prototype = new HandleBarsCreatable();


//////////////////////////////  EVENT HANDLERS  ///////////////////////////////////



//////////////////////////////  INSTANTIATE OBJECTS  ///////////////////////////////////
    var bitcoin = new Crypto("Bitcoin", "bitcoin.png", "#crypto-template");
    var digitalcoin = new Crypto("digitalcoin", "digitalcoin.png", "#crypto-template");
    var dogecoin = new Crypto("dogecoin", "dogecoin.png", "#crypto-template");
    var feathercoin = new Crypto("feathercoin", "feathercoin.png", "#crypto-template");
    var litecoin = new Crypto("litecoin", "litecoin.jpg", "#crypto-template");
    var megacoin = new Crypto("megacoin", "megacoin.png", "#crypto-template");
    var mooncoin = new Crypto("mooncoin", "mooncoin.png", "#crypto-template");
    var namecoin = new Crypto("namecoin", "namecoin.png", "#crypto-template");
    var novacoin = new Crypto("novacoin", "novacoin.png", "#crypto-template");
    var nxt = new Crypto("nxt", "nxt.jpg", "#crypto-template");
    var peercoin = new Crypto("peercoin", "peercoin.png", "#crypto-template");
    var portfolio = new Portfolio([
        bitcoin,
        digitalcoin,
        dogecoin,
        feathercoin,
        litecoin,
        megacoin,
        mooncoin,
        namecoin,
        novacoin,
        nxt,
        peercoin
        ], "#portfolio-template");


//////////////////////////////  MAIN  ///////////////////////////////////


//    $(".sparkline").sparkline([1, 4, 4, 7, 5, 9, 10, 1, 4, 4, 7, 5, 9, 10, 1, 4, 4, 7, 5, 9, 10, 1, 4, 4, 7, 5, 9, 10]);



    console.log(bitcoin.createTextElement());
    console.log(portfolio.createTextElement());
    $("#portfolio-container").append(portfolio.createJqueryElement());

//////////////////////////////  END MAIN  ///////////////////////////////////
});