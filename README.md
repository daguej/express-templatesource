View Template Source for Express
================================

Node.js is pretty awesome -- you get to write server-side code in the same language that you use on the client.  You can even use the same templating language to render HTML on the <a href="https://github.com/kof/node-jqtpl">server</a> and the <a href="https://github.com/jquery/jquery-tmpl">client</a>.

Wouldn't it be awesomer if you could seamlessly use the same templates in both places?  This is a small plugin for Express that allows you to fetch the raw source of your templates (views/partials), taking advantage of Express' view caching (if enabled).  You can then extend your favorite templating engine to include template source in your rendered views.

Use
===

    var express = require('express'),
	    app = express.createServer();
	require('templatesource').attach(app);
	
We now extend our templating engine with a new tag.  I'm using node-jqtpl:

    var jqtpl = require('jqtpl');
	app.register('.jqtpl', jqtpl.express);
	
    jqtpl.tag.inc = {
        open: "_.push(app.getTemplateSource('$1'));"
    };

Now we can do this in a view:

    <script type="text/x-jquery-tmpl" id="mytmpl">
	{{inc hi-mom}}
	</script>
	
Magic!  The script block will be filled in with the contents of `hi-mom.jqtpl`, so rendering your template on the client is easy:

    $('#mytmpl').tmpl(data).appendTo('body');
	
