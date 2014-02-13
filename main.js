$(document).ready(function () {
//////////////////////////////  DATA  ///////////////////////////////////
    var priceData = {
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

    Handlebars.registerHelper('createTextElement', function (str, obj) {
        var source = $(str).html();
        var template = Handlebars.compile(source);
        return $(template(obj))[0].outerHTML;
    });

//////////////////////////////  OBJECTS  ///////////////////////////////////

    var HandlebarsHTMLTrunkCreatable = function (scriptTagID) {
        this.scriptTagID = scriptTagID;
    };
    HandlebarsHTMLTrunkCreatable.prototype.createJqueryElement = function () {
        var source = $(this.scriptTagID).html();  // make this object property?
        var template = Handlebars.compile(source);
        return $(template(this));
    };
    HandlebarsHTMLTrunkCreatable.prototype.createDOMElement = function () {
        return this.createJqueryElement()[0];
    };
    HandlebarsHTMLTrunkCreatable.prototype.createTextElement = function () {
        return this.createJqueryElement()[0].outerHTML;
    };

////////////////

    var Crypto = function (title, imageName) {
        this.title = title;
        this.imageName = imageName;
    };
    Crypto.prototype.getPriceData = function () {
        return priceData[this.title.toLowerCase()];
    };
    Crypto.prototype.getCurrentPrice = function () {
        return 700;
    };
    Crypto.prototype.createSparkline = function () {
        //see http://omnipotent.net/jquery.sparkline/#s-faq
        //sparkline requires a live DOM element to append to.  Unfortunately,
        //this breaks the HandleBarsCreateable mini-framework because the text DOM
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

    var UserSettings = function (scriptTagID) {
        HandlebarsHTMLTrunkCreatable.call(this, scriptTagID);
        this.settings = {};
        for (var i = 0; i < cryptoArray.length; i++) {
            this.settings[cryptoArray[i].title] = 0;
        }
    };
    UserSettings.prototype = new HandlebarsHTMLTrunkCreatable();

////////////////

    var Portfolio = function (cryptos, scriptTagID) {
        HandlebarsHTMLTrunkCreatable.call(this, scriptTagID);
        this.cryptos = cryptos; //array of Crypto objects
    }
    Portfolio.prototype = new HandlebarsHTMLTrunkCreatable();


//////////////////////////////  EVENT HANDLERS  ///////////////////////////////////


//////////////////////////////  INSTANTIATE OBJECTS  ///////////////////////////////////
    var bitcoin = new Crypto("Bitcoin", "bitcoin.png");
    var digitalcoin = new Crypto("Digitalcoin", "digitalcoin.png");
    var dogecoin = new Crypto("Dogecoin", "dogecoin.png");
    var feathercoin = new Crypto("Feathercoin", "feathercoin.png");
    var litecoin = new Crypto("Litecoin", "litecoin.jpg");
    var megacoin = new Crypto("Megacoin", "megacoin.png");
    var mooncoin = new Crypto("Mooncoin", "mooncoin.png");
    var namecoin = new Crypto("Namecoin", "namecoin.png");
    var novacoin = new Crypto("Novacoin", "novacoin.png");
    var nxt = new Crypto("Nxt", "nxt.jpg");
    var peercoin = new Crypto("Peercoin", "peercoin.png");

    var cryptoArray = [];  //global array of all defined cryptos

    cryptoArray.push(
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
        peercoin);

    var portfolio = new Portfolio(cryptoArray, "#portfolio-template");

    var userSettings = new UserSettings("#settings-template");
    //console.log(userSettings);


//////////////////////////////  MAIN  ///////////////////////////////////

    $("#settings-modal-body").append(userSettings.createJqueryElement());
    $("#portfolio-container").append(portfolio.createJqueryElement());


//////////////////////////////  END MAIN  ///////////////////////////////////
});


//TODO
//settings rendered and saved
//total value calculated and for each
//html storage of settings... set userSettings=html storage object if exist
//sort by alpha, price, portfolio value