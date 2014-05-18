/*jslint browser:true */
/*global console:false */

(function () {
    'use strict';

    function generateUUID() {
        var d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {

            //noinspection NonShortCircuitBooleanExpressionJS
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            //noinspection NonShortCircuitBooleanExpressionJS
            return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
    }

    window.cordova = {
        addConstructor:function (fn) {
            fn.call(this);
        },
        exec:          function () {
        }
    };


    window.Connection = {
        UNKNOWN: "unknown",
        ETHERNET:"ethernet",
        WIFI:    "wifi",
        CELL_2G: "2g",
        CELL_3G: "3g",
        CELL_4G: "4g",
        NONE:    "none"
    };

    function voidFunc() {

    }

    function navAlert(message, callback, title, done) {
        window.alert(message);
        if (callback) {
            callback();
        }
    }

    navigator.connection = { type:window.Connection.ETHERNET };

    navigator.notification = { alert:navAlert, beep:voidFunc, vibrate:voidFunc };

    navigator.app = { exitApp: function () {
        alert('App exited')}
    };



    navigator.splashscreen = {
        hide:function () {

        },
        show: function () {

        }
    };

    window.device = {name:'Browser', model:'Browser', version:'2.0', platform:'Browser', uuid:generateUUID()};

    function createEvent(type, data) {
        var event = document.createEvent('Events');
        event.initEvent(type, false, false);
        if (data) {
            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    event[i] = data[i];
                }
            }
        }
        return event;
    }

    window.cordova.fireDocumentEvent = function (type, data, noDetach) {
        var evt = createEvent(type, data);
        document.dispatchEvent(evt);
    };

    window.cordova.fireWindowEvent = function (type, data) {
        var evt = createEvent(type, data);
        window.dispatchEvent(evt);
    };

    window.socialmessage = {
        send : function(message) {
            console.log('message: ' + message.text + '\n' + 'activityTypes: %o', message.activityTypes);
        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(function() {
            window.cordova.fireDocumentEvent('deviceready');
        }, 500);
    });

})();