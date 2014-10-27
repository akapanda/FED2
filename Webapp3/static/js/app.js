var movieshelf = movieshelf || {};


(function(){

    movieshelf.controller = {
        init: function() {
            movieshelf.data.load("http://dennistel.nl/movies");
            //movieshelf.dataManipulate.reduceReviews();
            movieshelf.dataManipulate.filter();
            movieshelf.sections.init();
            movieshelf.router.init();
        },
    }

    movieshelf.router = {
        init: function(){
            routie({
                'about': function() {
                    movieshelf.sections.toggle("about");
                },
                'movies': function() {
                    movieshelf.sections.toggle("movies");
                },
                'details': function() {
                    movieshelf.sections.toggle("details");
                },
                '#/movies/:1' : function () {
                    movieshelf.sections.toggle("details");
                    console.log("bla!");
                },
                '*' : function () {
                    movieshelf.sections.toggle("about");
                }
            });
        }
    }

    movieshelf.xhr = {
        trigger: function(type, url, success, data) {
            var req = new XMLHttpRequest;
            req.open(type, url, true);

            req.setRequestHeader('Content-type','application/json');

            type === 'POST' ? req.send(data) : req.send(null);
            req.onreadystatechange = function() {
                if (req.readyState === 4) {
                    if (req.status === 200 || req.status === 201) {
                        success(req.responseText);
                    };
                };
            };
        }
    }

    movieshelf.content = {
        about: {
            header: "About this app",
            section1: "Cities fall but they are rebuilt. heroes die but they are remembered. the man likes to play chess; let's get him some rocks. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. bruce... i'm god. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all. rehabilitated? well, now let me see. you know, i don't have any idea what that means. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. rehabilitated? well, now let me see. you know, i don't have any idea what that means. cities fall but they are rebuilt. heroes die but they are remembered. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all.", 
            section2: "I did the same thing to gandhi, he didn't eat for three weeks. bruce... i'm god. cities fall but they are rebuilt. heroes die but they are remembered. i once heard a wise man say there are no perfect men. only perfect intentions. cities fall but they are rebuilt. heroes die but they are remembered. boxing is about respect. getting it for yourself, and taking it away from the other guy. well, what is it today? more spelunking? let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. bruce... i'm god. well, what is it today? more spelunking? it only took me six days. same time it took the lord to make the world. i did the same thing to gandhi, he didn't eat for three weeks.", 
            section3: "Let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. boxing is about respect. getting it for yourself, and taking it away from the other guy. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. you measure yourself by the people who measure themselves by you. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. you measure yourself by the people who measure themselves by you. you measure yourself by the people who measure themselves by you. that tall drink of water with the silver spoon up his ass. i once heard a wise man say there are no perfect men. only perfect intentions. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. boxing is about respect. getting it for yourself, and taking it away from the other guy.",  
            section4: "That tall drink of water with the silver spoon up his ass. well, what is it today? more spelunking? i now issue a new commandment: thou shalt do the dance. let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. i did the same thing to gandhi, he didn't eat for three weeks. the man likes to play chess; let's get him some rocks. i now issue a new commandment: thou shalt do the dance. i now issue a new commandment: thou shalt do the dance. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. i don't think they tried to market it to the billionaire, spelunking, base-jumping crowd. that tall drink of water with the silver spoon up his ass. it only took me six days. same time it took the lord to make the world."
        },
        movies: [],
    }

    movieshelf.data = {
        load: function(url) {
            movieshelf.xhr.trigger("GET", url, this.localStore);
            var parsedData = JSON.parse(localStorage.getItem("movieData"));
            this.localPull(parsedData);
        },
        localStore : function(data) {
            localStorage.setItem("movieData", data);
        },
        localPull: function(data) {
            movieshelf.content.movies = data;
        }
    }

    movieshelf.dataManipulate = {
        reduceReviews: function() {
                _.map(movieshelf.content.movies, function (movie, i){
                    movie.reviews = _.reduce(
                        movie.reviews, function(memo, review){   
                                return memo + review.score; 
                            }, 
                            0) / movie.reviews.length;
                            return movie;
                    })
        },
        filter: function () {
            _.filter(
                _.map(movieshelf.content.movies, function (movie, i){
                    return movie;
                }), 
                function (movie) { return _.contains(movie.genres, 'Crime');
            })
        }
    }

    movieshelf.sections = {
        init: function() {
            this.about();
            this.movies();
        },
        about: function() {
            Transparency.render(document.getElementById("content"), movieshelf.content.about);
        },
        directives: {
                    cover: {
                        src: function(params){
                            return this.cover
                        }
                    },
                    id: {
                        href: function(params){
                            return "#/movies/:" + this.id
                        }
                    }
            },
        movies: function (){
            Transparency.render(document.getElementById("movieInstance"), movieshelf.content.movies, this.directives);
        },
        toggle: function(section) {
            if (section == "movies") {
                document.querySelector("#movies").classList.add("active");
                document.querySelector("#about").classList.remove("active");
            }
            else if (section == "about") {
                document.querySelector("#about").classList.add("active");
                document.querySelector("#movies").classList.remove("active");
            }
            else if (section == "details") {
                var list = document.querySelectorAll(".actors");

                for(var i = 0; i < list.length; ++i) {
                    // print the tag name of the node (DIV, SPAN, etc.)
                    var curr_node = list[i];
                    console.log(curr_node.tagName);

                    // show all the attributes of the node (id, class, etc.)
                    for(var j = 0; j < curr_node.attributes.length; ++j) {
                        var curr_attr = curr_node.attributes[j];
                        curr_node.classList.remove("nodetail")
                    }
                }
            };
        },
    }

    movieshelf.controller.init();
    
})();