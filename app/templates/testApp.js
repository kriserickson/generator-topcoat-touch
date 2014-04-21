/** @namespace $iframeContents **/

/** There are issues with PhantomJS and jQuery.trigger (see http://stackoverflow.com/questions/16802795/click-not-working-in-mocha-phantomjs-on-certain-elements)
 *  so we have to implement mouse-click ourselves..
 */
function clickElement(el){
    var ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(
      "click",
      true /* bubble */, true /* cancelable */,
      window, null,
      0, 0, 0, 0, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/, null
    );
    el.dispatchEvent(ev);
}


describe("Test Home Page", function () {

    it('should be on the home page', function() {
        expect($iframeContents.find('#home').hasClass('page-center')).to.be.true;
    });

});

