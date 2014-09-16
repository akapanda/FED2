/***
* cmdaan.js
*   Bevat functies voor CMDAan stijl geolocatie welke uitgelegd
*   zijn tijdens het techniek college in week 5.
*
*   Author: J.P. Sturkenboom <j.p.sturkenboom@hva.nl>
*   Credit: Dive into html5, geo.js, Nicholas C. Zakas
*
*   Copyleft 2012, all wrongs reversed.
*/
function global(){
    var initFile = initFile || {};
    var controller = {
        init:function(){
            controller.init();
        }
    // Event functies - bron: http://www.nczonline.net/blog/2010/03/09/custom-events-in-javascript/ Copyright (c) 2010 Nicholas C. Zakas. All rights reserved. MIT License
    // Gebruik: ET.addListener('foo', handleEvent); ET.fire('event_name'); ET.removeListener('foo', handleEvent);
    function EventTarget(){this._listeners={}}
    EventTarget.prototype={constructor:EventTarget,addListener:function(a,c){"undefined"==typeof this._listeners[a]&&(this._listeners[a]=[]);this._listeners[a].push(c)},fire:function(a){"string"==typeof a&&(a={type:a});a.target||(a.target=this);if(!a.type)throw Error("Event object missing 'type' property.");if(this._listeners[a.type]instanceof Array)for(var c=this._listeners[a.type],b=0,d=c.length;b<d;b++)c[b].call(this,a)},removeListener:function(a,c){if(this._listeners[a]instanceof Array)for(var b=
    this._listeners[a],d=0,e=b.length;d<e;d++)if(b[d]===c){b.splice(d,1);break}}}; var ET = new EventTarget();
    
    
    
    var gps = {
        function gpsInit(){
        }
        function startInterval(event){
        }
        function updatePosition(){
        }
        function setPosition(position){
        }
    }

    var locatie = {
        function checkLocations(event){
        }
        function calculateDistance(p1, p2){
        }
        function updatePositie(event){
        }
    }

    var map = {
    function generate_map(myOptions, canvasId){
    }
    if(tourType == LINEAIR){
        debug_message("Route intekenen");
        var route = new google.maps.Polyline({
    }
    currentPositionMarker = new google.maps.Marker({
    });
    }

    var debug = {
        function _geo_error_handler(code, message) {
        }
        function debug_message(message){
        }
        function set_custom_debugging(debugId){
        }
    }
        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
    } 
    console.log(SANDBOX); 
}
global();