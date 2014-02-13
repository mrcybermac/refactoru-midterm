$(document).ready(function () {
//////////////////////////////  DATA  ///////////////////////////////////
    var priceData = {
        bitcoin: [700, 737, 738, 767, 783, 712, 711, 700, 738, 698, 678, 689, 675, 656, 660, 680, 685, 675, 665, 657, 675, 660, 675, 670, 660, 665, 655, 650],
        digitalcoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 15],
        dogecoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 12],
        feathercoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 18],
        litecoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 15],
        megacoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 14],
        mooncoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 56],
        namecoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 12],
        novacoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 13],
        nxt: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 65],
        peercoin: [1, 4, 4, 7, 5, 9, 10, 8, 4, 5, 7, 5, 9, 10, 7, 4, 6, 7, 5, 9, 10, 6, 4, 4, 7, 5, 9, 17]
    }

//////////////////////////////  HANDLEBARS HELPERS  ///////////////////////////////////

    Handlebars.registerHelper('toLowerCase', function (str) {
        return str.toLowerCase();
    });

    Handlebars.registerHelper('apply', function (fnc, obj) {
        var argArray = Array.prototype.slice.call(arguments);
        argArray.shift();
        argArray.shift();
        return fnc.apply(obj, argArray);
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
    HandlebarsHTMLTrunkCreatable.prototype.createJqueryElement = function (scriptTagID) {
        //console.log("hello",scriptTagID,arguments);
        var source = $(scriptTagID?scriptTagID:this.scriptTagID).html();  // make this object property?
        var template = Handlebars.compile(source);
        return $(template(this));
    };
    HandlebarsHTMLTrunkCreatable.prototype.createDOMElement = function (scriptTagID) {
        return this.createJqueryElement(scriptTagID)[0];
    };
    HandlebarsHTMLTrunkCreatable.prototype.createTextElement = function (scriptTagID) {
        //console.log("hello",scriptTagID,arguments);
        return this.createJqueryElement(scriptTagID)[0].outerHTML;
    };

////////////////

    var Crypto = function (title, imageName) {
        HandlebarsHTMLTrunkCreatable.call(this);
        this.title = title;
        this.imageName = imageName;
    };
    Crypto.prototype = new HandlebarsHTMLTrunkCreatable();
    Crypto.prototype.getPriceData = function () {
        return priceData[this.title.toLowerCase()];
    };
    Crypto.prototype.getCurrentPrice = function () {
        return _.last(priceData[this.title.toLowerCase()]);
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
            $("." + that.title.toLowerCase() + "-sparkline").sparkline(that.getPriceData());
        }, 0);

    };

////////////////

    var UserSettings = function (scriptTagID) {
        HandlebarsHTMLTrunkCreatable.call(this, scriptTagID);
        this.settings = {};
        for (var key in cryptoObject){
            this.settings[key] = {
                cryptoObj: cryptoObject[key],
                quantity: 0
            }
        }
    };
    UserSettings.prototype = new HandlebarsHTMLTrunkCreatable();
    UserSettings.prototype.addCrypto = function (crypto) {
        if (!this.settings.hasOwnProperty(crypto.toLowerCase())){
            this.settings[crypto.toLowerCase()] = {
                cryptoObj: cryptoObject[crypto.toLowerCase()],
                quantity: 0
            }
        }
    };
    UserSettings.prototype.removeCrypto = function (crypto) {
        if (this.settings.hasOwnProperty(crypto.toLowerCase())){
            delete this.settings[crypto.toLowerCase()];
        }
    };
    UserSettings.prototype.updateQuantity = function (crypto, quantity) {

    };

////////////////

    var Portfolio = function (cryptos, scriptTagID) {
        HandlebarsHTMLTrunkCreatable.call(this, scriptTagID);
        this.cryptos = cryptos; //object of Crypto objects
    }
    Portfolio.prototype = new HandlebarsHTMLTrunkCreatable();


//////////////////////////////  EVENT HANDLERS  ///////////////////////////////////


//////////////////////////////  INSTANTIATE OBJECTS  ///////////////////////////////////
//    var bitcoin = new Crypto("Bitcoin", "bitcoin.png");
//    var digitalcoin = new Crypto("Digitalcoin", "digitalcoin.png");
//    var dogecoin = new Crypto("Dogecoin", "dogecoin.png");
//    var feathercoin = new Crypto("Feathercoin", "feathercoin.png");
//    var litecoin = new Crypto("Litecoin", "litecoin.jpg");
//    var megacoin = new Crypto("Megacoin", "megacoin.png");
//    var mooncoin = new Crypto("Mooncoin", "mooncoin.png");
//    var namecoin = new Crypto("Namecoin", "namecoin.png");
//    var novacoin = new Crypto("Novacoin", "novacoin.png");
//    var nxt = new Crypto("Nxt", "nxt.jpg");
//    var peercoin = new Crypto("Peercoin", "peercoin.png");

//    var cryptoArray = [];  //local array of all defined cryptos
//    cryptoArray.push(
//        bitcoin,
//        digitalcoin,
//        dogecoin,
//        feathercoin,
//        litecoin,
//        megacoin,
//        mooncoin,
//        namecoin,
//        novacoin,
//        nxt,
//        peercoin);


    //cryptoArray is created solely for the purpose of subsequently building cryptoObject.
    //cryptoObject is used throughout the app to access the Crypto objects:

    var cryptoArray = [  //local array of all defined cryptos
    new Crypto("Bitcoin", "bitcoin.png"),
    new Crypto("Digitalcoin", "digitalcoin.png"),
    new Crypto("Dogecoin", "dogecoin.png"),
    new Crypto("Feathercoin", "feathercoin.png"),
    new Crypto("Litecoin", "litecoin.jpg"),
    new Crypto("Megacoin", "megacoin.png"),
    new Crypto("Mooncoin", "mooncoin.png"),
    new Crypto("Namecoin", "namecoin.png"),
    new Crypto("Novacoin", "novacoin.png"),
    new Crypto("Nxt", "nxt.jpg"),
    new Crypto("Peercoin", "peercoin.png")
    ];

    var cryptoObject = {};  //local object containing all crypto objects by title key
    for (var i = 0; i < cryptoArray.length; i++) {
        cryptoObject[cryptoArray[i].title.toLowerCase()] = cryptoArray[i];
    }



    var portfolio = new Portfolio(cryptoObject, "#portfolio-template");

    var userSettings = new UserSettings("#settings-template");
        //console.log(userSettings);


//////////////////////////////  MAIN  ///////////////////////////////////

    $("#settings-modal-body").append(userSettings.createJqueryElement());
    $("#portfolio-container").append(portfolio.createJqueryElement());


//////////////////////////////  END MAIN  ///////////////////////////////////
});


//TODO
//About modal
//settings rendered and saved
//total value calculated and for each
//html storage of settings... set userSettings=html storage object if exist
//sort by alpha, price, portfolio value
//animate stuff