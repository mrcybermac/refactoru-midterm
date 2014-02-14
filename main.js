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
        //console.log(fnc, obj, argArray);
        return fnc.apply(obj, argArray);
    });

    Handlebars.registerHelper('createTextElement', function (str, obj) {
        var source = $(str).html();
        var template = Handlebars.compile(source);
        return $(template(obj))[0].outerHTML;
    });

//////////////////////////////  OBJECTS  ///////////////////////////////////

    var HandlebarsCreatable = function (scriptTagID) {
        if (scriptTagID) {
            this.scriptTagID = scriptTagID;
        }
    };
    HandlebarsCreatable.prototype.createJqueryElement = function (scriptTagID) {
        //console.log("hello",scriptTagID,arguments);
        var source = $(scriptTagID ? scriptTagID : this.scriptTagID).html();  // make this object property?
        var template = Handlebars.compile(source);
        return $(template(this));
    };
    HandlebarsCreatable.prototype.createDOMElement = function (scriptTagID) {
        return this.createJqueryElement(scriptTagID)[0];
    };
    HandlebarsCreatable.prototype.createTextElement = function (scriptTagID) {
        //console.log("hello",scriptTagID,arguments);
        return this.createJqueryElement(scriptTagID)[0].outerHTML;
    };

////////////////

    var Crypto = function (title, imageName, quantity, inPortfolio) {
        HandlebarsCreatable.call(this);
        this.title = title;
        this.imageName = imageName;
        this.quantity = quantity;
        this.inPortfolio = inPortfolio;

    };
    Crypto.prototype = new HandlebarsCreatable();
    Crypto.prototype.getPriceData = function () {
        return priceData[this.title.toLowerCase()];
    };
    Crypto.prototype.getCurrentPrice = function () {
        return _.last(priceData[this.title.toLowerCase()]);
    };
    Crypto.prototype.getCurrentWorth = function () {
        var currentWorth = this.quantity * _.last(priceData[this.title.toLowerCase()]);
        return currentWorth;
    };
    Crypto.prototype.getCurrentWorthFormatted = function () {
        var currentWorth = this.quantity * _.last(priceData[this.title.toLowerCase()]);
        return currentWorth.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
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


    var UserPortfolio = function (cryptos, scriptTagID) {
        HandlebarsCreatable.call(this, scriptTagID);
        this.cryptos = cryptos; //object of Crypto objects
    };
    UserPortfolio.prototype = new HandlebarsCreatable();
    UserPortfolio.prototype.addCrypto = function (crypto) {
        this.cryptos[crypto.toLowerCase()].inPortfolio = true;
    };
    UserPortfolio.prototype.removeCrypto = function (crypto) {
        this.cryptos[crypto.toLowerCase()].inPortfolio = false;
    };
    UserPortfolio.prototype.updateQuantity = function (crypto, quantity) {
        this.cryptos[crypto.toLowerCase()].quantity = quantity;
    };
    UserPortfolio.prototype.getCurrentWorth = function () {
        var currentWorth = 0;
        for (var crypto in this.cryptos){
            if (this.cryptos[crypto].inPortfolio === true){
            currentWorth += Number(this.cryptos[crypto].getCurrentWorth());
            }
        }
        return currentWorth;
    };
    UserPortfolio.prototype.getCurrentWorthFormatted = function () {
        var currentWorth = 0;
        for (var crypto in this.cryptos){
            currentWorth += Number(this.cryptos[crypto].getCurrentWorth());
        }
        return currentWorth.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    };

////////////////

    var Settings = function () {
        HandlebarsCreatable.call(this);
    }
    Settings.prototype = new HandlebarsCreatable();


//////////////////////////////  EVENT HANDLERS  ///////////////////////////////////


    $("#settings-modal").find(".submit").on("click", function () {

        $("#settings-modal").find("input:checkbox").each(function () {

            for (var crypto in userPortfolio.cryptos) {
                if ($(this).is(":checked")) {
                    userPortfolio.cryptos[$(this).closest(".crypto").attr("data-id")].inPortfolio = true;
                } else {
                    userPortfolio.cryptos[$(this).closest(".crypto").attr("data-id")].inPortfolio = false;
                }
            }
        });

        $("#settings-modal").find("input:text").each(function () {
            for (var crypto in userPortfolio.cryptos) {
                userPortfolio.cryptos[$(this).closest(".crypto").attr("data-id")].quantity = $(this).val();
            }
        });

        //reload modal
        renderPage();
    });


//////////////////////////////  INSTANTIATE OBJECTS  ///////////////////////////////////

    //cryptoArray is created solely for the purpose of subsequently building cryptoObject.
    //cryptoObject is used throughout the app to access the Crypto objects:

    var cryptoArray = [  //local array of all defined cryptos
        new Crypto("Bitcoin", "bitcoin.png", 0, true),
        new Crypto("Digitalcoin", "digitalcoin.png", 0, true),
        new Crypto("Dogecoin", "dogecoin.png", 0, true),
        new Crypto("Feathercoin", "feathercoin.png", 0, true),
        new Crypto("Litecoin", "litecoin.jpg", 0, true),
        new Crypto("Megacoin", "megacoin.png", 0, true),
        new Crypto("Mooncoin", "mooncoin.png", 0, true),
        new Crypto("Namecoin", "namecoin.png", 0, true),
        new Crypto("Novacoin", "novacoin.png", 0, true),
        new Crypto("Nxt", "nxt.jpg", 0, true),
        new Crypto("Peercoin", "peercoin.png", 0, true)
    ];

    var cryptoObject = {};  //local object containing all crypto objects by title key
    for (var i = 0; i < cryptoArray.length; i++) {
        cryptoObject[cryptoArray[i].title.toLowerCase()] = cryptoArray[i];
    }

   // var serializer = new GSerializer();

//console.log(localStorage.hasOwnProperty("userPortfolio"));
    //var globalPortfolio = new GlobalPortfolio(cryptoObject, "#portfolio-template");
 //   if (localStorage.hasOwnProperty("userPortfolio")){
//        var userPortfolio = JSON.parse(localStorage["userPortfolio"]);
 //       var userPortfolio = serializer.deserialize(localStorage.getItem("userPortfolio"));
//    } else {
        var userPortfolio = new UserPortfolio(cryptoObject, "#settings-template");
 //   }
    //userPortfolio.removeCrypto("novacoin");
    //console.log(userPortfolio);

 //   console.log(userPortfolio);

//////////////////////////////  MAIN  ///////////////////////////////////

    var renderPage = function () {
        $("#settings-modal-body").empty().append(userPortfolio.createJqueryElement());
        $("#portfolio-container").empty().append(userPortfolio.createJqueryElement("#portfolio-template"));
        $(".jumbotron .panel span").text("$" + userPortfolio.getCurrentWorthFormatted());

//        localStorage["userPortfolio"] = JSON.stringify(userPortfolio);

 //       var serializedXML = serializer.serialize(userPortfolio, "userPortfolio");
 //       localStorage.setItem("userPortfolio", serializedXML);
    }

    renderPage();
//////////////////////////////  END MAIN  ///////////////////////////////////
});


//TODO
//About modal
//settings rendered and saved
//total value calculated and for each
//html storage of settings... set userSettings=html storage object if exist
//sort by alpha, price, portfolio value
//animate stuff