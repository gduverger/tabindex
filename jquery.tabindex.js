/*
 * Tabindex - jQuery plugin
 * Author: Georges Duverger
 */

// Methods attached to the jQuery.fn object

jQuery.fn.tabindex = function(options) {
	var defaults = { focus: true };
	var settings = $.extend({}, defaults, options);

	this.resetindexes();
	if(settings["focus"]) { $("[tabindex=1]").focus(); } // BUG when the first one is hidden
	return this.each(function(){ $(this).bindtab(); });
};

jQuery.fn.bindtab = function() {
	return this.each(function(){
		$(this).keydown(function(e) {
			if(e.shiftKey && e.keyCode == 9) {
				// TODO/BUG should check if that value has indeed changed
				$(this).change();
				$(this).shifttab();
				return false; // Prevents the default behaviour
			} else if(!e.shiftKey && e.keyCode == 9) {
				// TODO/BUG should check if that value has indeed changed
				$(this).change();
				$(this).tab();
				return false; // Prevents the default behaviour
			} else {
				return true; // Allows the default behaviour
			}
		})
	});
};

jQuery.fn.resetindexes = function() {
	$("[tabindex]").removeAttr("tabindex");
	return this.each(function(i){ $(this).attr("tabindex", i+1); });
}

jQuery.fn.tab = function(options) {
	var defaults = {select: true, blur: true};
	var settings = $.extend({}, defaults, options);

	if(settings["blur"]) { this.blur() };
	var index = parseInt(this.attr("tabindex"));
	var element;
	this.each(function() {
		element = $("[tabindex="+(index+1)+"]");
		if(element.length != 0) {
			if(element.is(":visible")) {
				element.focus();
				if(settings["select"]) { element.select(); }
				$("body").trigger("tab");
				// Play sound
				// $.sound.play("http://google-axsjax.googlecode.com/svn/trunk/common/earcons/axsEarcons.swf?sound=item");
			}
			else { element = $("[tabindex="+(index+1)+"]").tab($.extend({}, {blur: false}, settings)); }
		} else {
			element = $("[tabindex]:visible:first").focus();
			// Play sound
			// $.sound.play("http://google-axsjax.googlecode.com/svn/trunk/common/earcons/axsEarcons.swf?sound=item");
		}
	});
	return element;
}

jQuery.fn.shifttab = function(options) {
	var defaults = {select: true, blur: true};
	var settings = $.extend({}, defaults, options);

	if(settings["blur"]) { this.blur() };
	var index = parseInt(this.attr("tabindex"));
	var element;
	this.each(function() {
		element = $("[tabindex="+(index-1)+"]");
		if(element.length != 0) {
			if(element.is(":visible")) {
				element.focus();
				if(settings["select"]) { element.select(); }
				// Play sound
				// $.sound.play("http://google-axsjax.googlecode.com/svn/trunk/common/earcons/axsEarcons.swf?sound=item");
			}
			else { element = $("[tabindex="+(index-1)+"]").shifttab($.extend({}, {blur: false}, settings)); }
		} else {
			element = $("[tabindex]:visible:last").focus();
			// Play sound
			// $.sound.play("http://google-axsjax.googlecode.com/svn/trunk/common/earcons/axsEarcons.swf?sound=item");
		}
	});
	return element;
}