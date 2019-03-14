---
title: "Blogging with hugo & netlify"
url: "hugo_netlify"
description: Creating a personal blog with hugo netlify
date: 2018-06-25
thumbnail: img/banner/hugo-netlify.png
categories:
  - "project"
tags: 
  - "web development"
draft: false
---

Here is a great tutorial on how to <a href="https://gohugo.io/hosting-and-deployment/hosting-on-netlify/" target="_blank">host hugo</a> on <a href="https://netlify.com/" target="_blank">netlify</a>

Other examples using the exact same theme:

* Tomas Westlake: <a href="https://r-mageddon.netlify.com/" target="_blank">r-mageddon.netlify.com</a>
* Sascha Wolfer: <a href="https://rcrastinate.rbind.io/" target="_blank">rcrastinate.rbind.io</a>

## Creating the hugo site

In order to create a new hugo site simply go: 

{{< highlight bash >}}
hugo new site [path] [flags]
{{< /highlight >}}

### Create a new repository via git

`init` the git repo and `push` it to the guthub repo: 

{{< highlight bash >}}
echo "# website2" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/thomaslaber/website2.git
git push -u origin master

# Push an existing repository from the command line
# Alternatively you could link it to an already existing git repo: 

git remote add origin https://github.com/thomaslaber/website2.git
git push -u origin master
{{< /highlight >}}

### Theme as git submodule

This is the theme I decided to go for <a href="https://themes.gohugo.io/mainroad/" taget="_blank">Mainroad</a>.
Now you could add a theme of your choice git simply cloning it. However, it is more elegant to add it as a [submodule](https://blog.github.com/2016-02-01-working-with-submodules/). 

> Submodules allow you to include or embed one or more repositories as a sub-folder inside another repository.

{{< highlight bash >}}
git submodule add https://github.com/vimux/mainroad themes/mainroad
git submodule init
git submodule update

# This means it can be updated by running:

git submodule update --remote themes/mainroad
{{< /highlight >}} 

## Adapting the theme

Now we simply copy the config.toml in order to immediately have a running config for the theme. 

{{< highlight bash >}}
cp themes/mainroad/exampleSite/config.toml .
{{< /highlight >}}

We also could copy the examplesite folder from the theme folder in order to have some sample content to display. However, for now we refrain from doing that. 
We start the hugo server by: 

{{< highlight bash >}}
hugo server -D
{{< /highlight >}}

### Add custom CSS

We do not want to change anything in the theme folder as it will be updated and thus overwritten at some point of time. Therefore, we have to persist all our changes in the 

Inside the config file we assign the path to an css file which can be found in `static/css`:

{{< highlight ini >}}
[params]
    custom_css = ["css/tl.css"]
{{< /highlight >}}
You can reference as many stylesheets as you want. Their paths need to be relative to the static folder.
Inside the header partial you can include every custom stylesheet from above beside the original one:

{{< highlight bash >}}
{{ range .Site.Params.custom_css -}}
    <link rel="stylesheet" href="{{ . | absURL }}">
{{- end }}
{{< /highlight >}}

### Changing colors

Unfortunately, the mainroad theme does not come with a built-in color-theme-support. Therefore, we have to replace color codes manually: 
I chose to go from <span style="color: #e64946">&block;&block;&block; `#e64946` &block;&block;&block;</span> to <span style="color: #191970">&block;&block;&block; `#191970` &block;&block;&block;</span>. This can easily be done by runnnig a search and replace in the `style.css` after it was copied to the `static/css` folder. 

> Remember: No changes in the theme folder!

### Adding Particles background

In order to set a simple but important optical highlight, I decided to include the <a href="https://vincentgarreau.com/particles.js/" target="_blank">particle.js</a>.
This is done by adding the scripts in the `static/js` folder. 

{{< highlight html >}}
<div id="particles-js">	</div>
<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<script src="{{ .Site.BaseURL }}js/particles.js"></script> 
{{< /highlight >}}

{{< highlight css >}}
#particles-js {
	/* position: absolute; */
	height: 100px;
	background-image: linear-gradient(to bottom right, black, navy,#aaa);
  }
{{< /highlight >}}

### Main menu

A big upset was the possibility to add new menu items: It only works by adding the following code directly into `menu.html` (\layouts\partials) and not into the template file. A more elegant way would include an option in the config file, i.e. `config.toml`.

{{< highlight html >}}
<li class="menu__item">
  <a class="menu__link" href="/categories/book/">Books</a>
</li>
<li class="menu__item">
  <a class="menu__link" href="/categories/project/">Projects</a>
</li>
{{< /highlight >}}

### Adding highlight.js

We are adding a few options to our config file:

{{< highlight bash >}}
highlight = true
highlightStyle = "monokai-sublime"
highlightLanguages = ["r", "sql", "bash", "css"]
{{< /highlight >}}

Using these parameter we are loading them in the `<head>` of `baseof.html`:

{{< highlight html >}}
{{ if .Site.Params.highlight | default false }}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
    {{ range .Site.Params.highlightLanguages }} 
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/{{ . }}.min.js"></script> 
    {{ end }}
  <script>hljs.initHighlightingOnLoad();</script>
{{ end }}
{{< /highlight >}}

### Adding a custom search function

Following a <a href="http://www.johann-oberdorfer.eu/blog/2017/11/11/17-11-01_add_site_search_to_hugo_static_site_generator/" target="_blank">tutorial</a> we again start by adding some parameters to `config.toml`.

{{< highlight bash >}}
[outputs]
  home = [ "HTML", "RSS", "JSON"]
{{< /highlight >}}

Note: Make shure to locate the required `index.json` file in the layouts folder. Once the file exists, hugo is going to dump the index to file. It should look like:

{{< highlight bash >}}
[{{ range $index, $page := .Site.Pages }}
{{- if ne $page.Type "json" -}}
{{- if and $index (gt $index 0) -}},{{- end }}
{
    "uri": "{{ $page.Permalink }}",
    "title": "{{ htmlEscape $page.Title}}",
    "tags": [{{ range $tindex, $tag := $page.Params.tags }}{{ if $tindex }}, {{ end }}"{{ $tag| htmlEscape }}"{{ end }}],
    "description": "{{ htmlEscape .Description}}",
    "content": {{$page.Plain | jsonify}}
}
{{- end -}}
{{- end -}}]
{{< /highlight >}}

Once this is done, hugo generates a `lunrjs`-`index.json` at the root of your public folder. If you encounter some problems run: `hugo --verbose` and check messages and warnings.

We add another css file `css/auto-complete.css` to our `<head>`.

Finally, we need to load lunr.
Please note: as `lunr.js` is based on jquery, make sure `jquery.js` gets loaded first.

{{< highlight html >}}
<body>
...
<!-- custom search -->
{{ if not .Site.Params.disableSearch }}
    <script type="text/javascript" src="{{ .Site.BaseURL }}js/lunr.min.js"></script>
    <script type="text/javascript" src="{{ .Site.BaseURL }}js/auto-complete.js"></script>
            
    <script type="text/javascript">
        var baseurl = "{{ .Site.BaseURL }}";
    </script>
    <script type="text/javascript" src="{{ .Site.BaseURL }}js/search.js"></script>
{{ end }}
...
  </body>
{{< /highlight >}}

and finally, we add a search entry box somewhere in your webpage layout:

{{< highlight html >}}
{{ if not .Site.Params.disableSearch }}
    <li class="dropdown">
    <a>
        <i class="fa fa-search"></i>
        <div class="searchbox pull-right">
        <input data-search-input id="search-by" type="text">
        </div>
    </a>
    </li>
{{ end }}
{{< /highlight >}}

Finally, we delete `Â` in `Â»` in `search.js` at line 80. I do not know what purpose is served. 

### Custom sidebar

I had to create a new widget in layouts\partials\widgets and called it `toc.html`:

{{< highlight html >}}
{{ if eq .Kind "page"  }}
<div class="widget-toc" id="sticker">
  <h4 class="widget__title">Table of Content</h4>
  <div class="toc__menu">
    {{ .TableOfContents }}
  </div>
</div>
{{ end }}
{{< /highlight >}}

Please not that `{{ .TableOfContents }}` virtually does all of the work. 

The new widget has to be added to the site via the `config.toml`. Please not the right section: 

{{< highlight ini >}}
[Params.sidebar]
  widgets_page = ["toc"]
{{< /highlight >}}

I added some javascript for two toggle effects for the table of content:

1. Make the toc sticky. <!--img src="/img/pin.png" height="10" /-->
2. Make the toc disappear.  

{{< highlight javascript >}}
$(document).ready(function(){
  $("#sticker").sticky({topSpacing:10});
});

var clicked = false;

function toggleBtnClick() {
  if (clicked) {
    $("#sticker").sticky({topSpacing:10});
    $("#pin_button img").removeClass("deactivated");
    $("#pin_button img").addClass("activated");
    clicked = false;
  } else {
    $("#sticker").unstick();
    $("#pin_button img").removeClass("activated");
    $("#pin_button img").addClass("deactivated");
    clicked = true;
  }
}

var clicked2 = false;

function toggleBtnClick2() {
  if (clicked2) {
    $("aside").show();
    $("#hide_button img").removeClass("deactivated");
    $("#hide_button img").addClass("activated");
    clicked2 = false;
  } else {
    $("aside").hide();
    $("#hide_button img").removeClass("activated");
    $("#hide_button img").addClass("deactivated");
    clicked2 = true;
  }
}
{{< /highlight >}}


I pushed the table of content in the sidebar and made it sticky using <a href="http://stickyjs.com/" target="_blank">stickyjs.com</a>. This means I also have to add a custom javascript-file to get loaded: `custom.js`. I did this by adding the following lines to `baseof.html` in \layouts\_default. I also added to small icons to be execute the javascript commands: 

{{< highlight html >}}
<script type="text/javascript" src="{{ .Site.BaseURL }}js/jquery.sticky.js"></script>
<script type="text/javascript" src="{{ .Site.BaseURL }}js/custom.js"></script> 
...
</head>

<body class="body">
{{ if eq .Kind "page"  }}
  <div class="sidebar_menu">
    <span onclick="toggleBtnClick()" id="pin_button"><sup><img src="{{ .Site.BaseURL }}img/pin.png" width="25px" class="activated"></sup></span>
    <span onclick="toggleBtnClick2()" id="hide_button"><sup><img src="{{ .Site.BaseURL }}img/eye.png" width="25px" class="activated"></sup></span>
  </div>
  {{ end }}
{{< /highlight >}}
