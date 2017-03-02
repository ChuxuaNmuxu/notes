;(function ($, window, document, undefined) {
    //Author：HANGWEI
    //Create the defaults once
    var pluginName = 'dlpcustomSelect',
        defaults = {
            addButtonEnabled : true,
            addButtonText: 'Add',
            delButtonText:'Delete'
        };
//... other code ...

// A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function (options) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted, instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                // If this is not a select
                if (!$(this).is('select')) {
                    $(this).find('select').each(function(index, item) {
                        // For each nested select, instantiate the dlp custom select
                        $(item).dlpcustomSelect(options);//注意此处的插件名称
                    });
                } else if (!$.data(this, 'plugin_' + pluginName)) {
                    // Only allow the plugin to be instantiated once so we check that the element has no plugin instantiation yet

                    // if it has no instance, create a new one, pass options to our plugin constructor,
                    // and store the plugin instance in the elements jQuery data object.
                    $.data(this, 'plugin_' + pluginName, new DlpCustomSelect(this, options));//注意此处插件的构造函数
                }
            });
            // If the first parameter is a string and it doesn't start with an underscore or "contains" the `init`-function,
            // treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call to make it possible to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);
                // Tests that there's already a plugin-instance and checks that the requested public method exists
                if (instance instanceof DlpCustomSelect && typeof instance[options] === 'function') {//注意此处插件构造函数名
                    // Call the method of our plugin instance, and pass it the supplied arguments.
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });

            // If the earlier cached method gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }

    };

})(jQuery, window, document);