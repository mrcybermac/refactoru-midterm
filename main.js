$(document).ready(function () {
//////////////////////////////  DATA  ///////////////////////////////////
    var data = {
        bitcoin: [700, 737, 738, 767, 783, 712, 711, 700, 738, 698, 678, 689, 675, 656, 660, 680, 685, 675, 665, 657, 675, 660, 675, 670, 660, 665, 655, 650],
        digitalcoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 15],
        dogecoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 15],
        feathercoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 15],
        litecoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 15],
        megacoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 15],
        mooncoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 1500],
        namecoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 15],
        novacoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 15],
        nxt: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 150],
        peercoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 150]
    }

//////////////////////////////  HANDLEBARS HELPERS  ///////////////////////////////////

    Handlebars.registerHelper('toLowerCase', function (str) {
        return str.toLowerCase();
    });

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

////////////////

    var Crypto = function (title, imageName, scriptTagID) {
        HandleBarsCreatable.call(this, scriptTagID);
        this.title = title;
        this.imageName = imageName;
//        this.getPriceData = function () {
//            return [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 15];
//        }

    };
    Crypto.prototype = new HandleBarsCreatable();
    Crypto.prototype.getPriceData = function () {
        return data[this.title.toLowerCase()];
    };
    Crypto.prototype.getCurrentPrice = function () {
        return 700;
    };
    Crypto.prototype.createSparkline = function () {
        //see http://omnipotent.net/jquery.sparkline/#s-faq
        //sparkline requires a live DOM element to append to.  Unfortunately,
        //this breaks the HandleBarsCreateable framework because the text DOM
        //element cannot be sent into the Handlebars template.
        //workaround is to 1.) create unique id names based on Crypt titles and
        //2.) pass the sparkline call into setTimeout(0) so that it will be called
        //after Handlebars execution.

        var that = this;
        setTimeout(function () {
            $("#" + that.title.toLowerCase() + "-sparkline").sparkline(that.getPriceData());
        }, 0);

    };

////////////////

//    var Sparkline = function (title, imageName, scriptTagID) {
//        HandleBarsCreatable.call(this, scriptTagID);
//    };
//    Sparkline.prototype = new HandleBarsCreatable();
//    Sparkline.prototype.getCurrentPrice = function () {
//        return 700;
//    };

////////////////

    var Portfolio = function (cryptos, scriptTagID) {
        HandleBarsCreatable.call(this, scriptTagID);
        this.cryptos = cryptos; //array of Crypto objects
    }
    Portfolio.prototype = new HandleBarsCreatable();


//////////////////////////////  EVENT HANDLERS  ///////////////////////////////////


//////////////////////////////  INSTANTIATE OBJECTS  ///////////////////////////////////
    var bitcoin = new Crypto("Bitcoin", "bitcoin.png", "#crypto-template");
    var digitalcoin = new Crypto("Digitalcoin", "digitalcoin.png", "#crypto-template");
    var dogecoin = new Crypto("Dogecoin", "dogecoin.png", "#crypto-template");
    var feathercoin = new Crypto("Feathercoin", "feathercoin.png", "#crypto-template");
    var litecoin = new Crypto("Litecoin", "litecoin.jpg", "#crypto-template");
    var megacoin = new Crypto("Megacoin", "megacoin.png", "#crypto-template");
    var mooncoin = new Crypto("Mooncoin", "mooncoin.png", "#crypto-template");
    var namecoin = new Crypto("Namecoin", "namecoin.png", "#crypto-template");
    var novacoin = new Crypto("Novacoin", "novacoin.png", "#crypto-template");
    var nxt = new Crypto("Nxt", "nxt.jpg", "#crypto-template");
    var peercoin = new Crypto("Peercoin", "peercoin.png", "#crypto-template");
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


    $("#portfolio-container").append(portfolio.createJqueryElement());


//////////////////////////////  END MAIN  ///////////////////////////////////
});