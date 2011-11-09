// express-templatesource
// (c) 2011 Josh Dague
// https://github.com/daguej/express-templatesource
// GPL/MIT licensed.

var express = require('express');

exports.attach = function(app) {
	app.getTemplateSource = function(tmpl) {
		var view;
		var isCache = app.enabled('view cache');
		var root = app.set('views') || process.cwd() + '/views';
		
		if (isCache) view = app.cache[tmpl];
		if (!view) {
			view = new express.View(tmpl, {
				defaultEngine: app.set('view engine'),
				root: root,
				engines: app.engines
			});
			if (isCache) app.cache[tmpl] = view;
		}
		
		return view.contents;
	}
}