//NameSpace
var circus = circus || {};

//annonymous self invocing function (IIFE)
//clown.js
(function(){
    console.log('Systems on line!');
    //clown.js
    circus.clown = {
        name:'Pipo'
    }
    //tiger.js
    circus.tiger = {
        name:'Kahn',
        roar: function() {
            console.log(this.name + ' is trying to eat ' + circus.clown.name + '!')
        }
    }
    circus.tiger.roar();
})();