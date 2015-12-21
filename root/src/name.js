/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

(function($) {

  var pluginName = '{%= js_safe_name %}',
      dataKey    = 'plugin.' + pluginName,
      getData, setData, findData, removeData,
      Class;

  // Private methods.
  getData = function(e) {
    return (e === void(0) ? void(0) : e.data(dataKey));
  };

  setData = function(e, data) {
    if (e !== void(0) && data !== void(0)) {
      e.data(dataKey, data);
    };
  };

  findData = function(e) {
    return getData(e.parents('.' + pluginName).parent());
  };

  removeData = function(e) {
    if (e !== void(0)) {
      e.removeData(dataKey);
    };
  };

  Class = function(elem, i, opts) {
    this.elem = elem;
    this.index = i;
    this.opts = opts;
    $(elem).html('awesome' + i);
  };

  Class.prototype = {
    increment: function() {
      this.index += 1;
      $(this.elem).html('awesome' + this.index);
    },

    destroy: function() {
      $(this.elem).empty();
    }
  };
  Class.allowMethods = ['increment', 'destroy'];

  // Collection method.
  $.fn[pluginName] = function(method) {
    var value,
        opts = (typeof method === 'object' && method),
        args = Array.prototype.slice.call(arguments, 1);

    this.each(function(i) {
      var $this   = $(this),
          data    = getData($this),
          options = $.extend({}, $[pluginName].options, $this.data(), opts);

      if (typeof method === 'string') {
        if ($.inArray(method, Class.allowMethods) < 0) {
          throw new Error("Unknown method: " + method);
        };
        if (!data) { return; };

        value = data[method].apply(data, args);
        if (method === 'destroy') {
          removeData($this);
        };
      }
      if (!data) {
        setData($this, (data = new Class(this, i, options)));
      };
    });
    return typeof value === 'undefined' ? this : value;
  };

  // Static method.
  $[pluginName] = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $[pluginName].options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $[pluginName].options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'][pluginName] = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
