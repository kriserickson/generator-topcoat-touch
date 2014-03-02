generator-topcoat-touch
=======================

[![Build Status](https://travis-ci.org/kriserickson/generator-topcoat-touch.png?branch=master)](https://travis-ci.org/kriserickson/generator-topcoat-touch)

Yeoman Generator for Topcoat Touch.  

Creates either the Kitchen Sink demo or a bare-bones applications.  Allows using JQuery or Zepto for DOM manipulation and turning on and off optional libraries (iScroll, Fastclick, Hammer).  

Example run:

<pre>
$npm install -g generator-topcoat-touch
$yo topcoat-touch

     _-----_
    |       |
    |--(o)--|   .--------------------------.
   `---------'  |    Welcome to Yeoman,    |
    ( _'U`_ )   |   ladies and gentlemen!  |
    /___A___\   '__________________________'
     |  ~  |
   __'.___.'__
 '   `  |° ' Y `

[?] Topcoat Touch Project Name? Example
[?] Would you like to enable Cordova for this project? Yes
[?] Cordova platforms: (Press <space> to select)
>[X] ios
 [X] android
 [ ] wp8
 [ ] windows8
 [ ] amazon-fireos
 [ ] firefoxos
 [ ] blackberry10
[?] Light or dark theme? (Use arrow keys)
> light
  dark
[?] Light or dark theme? (Use arrow keys)
> light
  dark
[?] Include Hammer.js for gesture support? (Y/n)
[?] Include fastclick.js to remove click delays? (Y/n)
[?] Include IScroll.js for scrolling (required for KitchenSink demo)? (Y/n)
[?] MVC or Single Document? (Use arrow keys)
> mvc
  single document
[?] Include the KitchenSink demo? (y/N)
   create app\index.html
   create app\js\app.js
   create app\css\app.css
   create bower.json
   create .bowerrc
   create Gruntfile.js
   create package.json
   create app\cordova.js
   create app\templates\home.ejs

I'm all done. Running bower install & npm install for you to install the required dependencies. 
If this fails, try running the command yourself.

</pre>

