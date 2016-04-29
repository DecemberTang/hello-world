define(function (require) {

  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(hiworld);

  function hiworld() {
    this.defaultAttrs({
      widgetSelector: '.js-widget'
    });
    this.doAction= function (event, data) {
      console.log('success! in doAction method');

      if(!event.isDefaultPrevented()){
        event.preventDefault();
      }

      this.trigger('dataActionPerformed',{
        type: this.select('widgetSelector').attr('method'),
        url: this.select('widgetSelector').attr('action'),
        id: this.select('widgetSelector').attr('data-id'),
        handle: this.select('widgetSelector').attr('data-handle'),
        itemtype: this.select('widgetSelector').attr('data-type')
      });
    };

    this.doOtherFunction= function () {
      console.log('in doOtherFunction method');
    };

    this.update=function(event,data){
      this.trigger('clickButton');
      console.log('in update method');
      console.log(data.handle);
      console.dir(data);

    };



    this.after('initialize', function () {
      this.on('submit',{
        widgetSelector:this.doAction
      });

      this.on('clickButton',this.doOtherFunction);

      this.on('dataActionPerformed',this.update);
    });
  }

});
