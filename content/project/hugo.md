---
title: "hugo & netlify"
description: "Creating a personal blog with hugo & netlify"
date: 2018-02-16
categories:
  - "project"
tags: 
  - "web development"
weight: 1
thumbnail: "img/banner/hugo.png"
draft: false
---

Here is a great tutorial on how to host hugo on [netlify](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/)

### Create hugo site

In order to create a new hugo site simply go: 

{{< highlight bash >}}
hugo new site [path] [flags]
{{< /highlight >}}


### git

#### Create a new repository on the command line

Init the git repo and push it to the guthub repo: 

{{< highlight bash >}}
echo "# website2" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/thomaslaber/website2.git
git push -u origin master
{{< /highlight >}}

#### Push an existing repository from the command line

Alternatively you could link it to an already existing git repo: 

{{< highlight bash >}}
git remote add origin https://github.com/thomaslaber/website2.git
git push -u origin master
{{< /highlight >}}

### git submodule

Now you could add a theme of your choice git simply cloning it. However, it is more elegant to add it as a [submodule](https://blog.github.com/2016-02-01-working-with-submodules/). 

> Submodules allow you to include or embed one or more repositories as a sub-folder inside another repository.

{{< highlight bash >}}
git submodule add https://github.com/vimux/mainroad themes/mainroad
git submodule init
git submodule update
{{< /highlight >}}

This means it can be updated by running:

{{< highlight bash >}}
git submodule update --remote themes/minimal
{{< /highlight >}}

### hugo again

Now we simply copy the config.toml in order to immediately have a running config for the theme. 

{{< highlight bash >}}
cp themes/mainroad/exampleSite/config.toml .
{{< /highlight >}}

We also could copy the examplesite folder from the theme folder in order to have some sample content to display. However, for now we refrain from doing that. 
We start the hugo server by: 

{{< highlight bash >}}
hugo server -D
{{< /highlight >}}

#### Add custom CSS

We do not want to change anything in the theme folder as it will be updated and thus overwritten at some point of time. Therefore, we have to persist all our changes in the 

Inside the config file we assign the path to an css file which can be found in *static/css*:

{{< highlight bash >}}
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

#### Changing colors

Unfortunately, the mainroad theme does not come with a built-in color-theme-support. Therefore, we have to replace color codes manually: 
I chose to go from <span style="color: #e64946">&block;&block;&block; #e64946 &block;&block;&block;</span> to <span style="color: #191970">&block;&block;&block; #191970 &block;&block;&block;</span>. This can easily be done by runnnig a search and replace in the *style.css* after it was copied to the static/css folder. 

> Remember: No changes in the theme folder!

#### Adding Particles background

In order to set a simple but important optical highlight, I decided to include the [particle.js](https://vincentgarreau.com/particles.js/).
This is done by adding the scripts in the static/js folder. 

{{< highlight html >}}
<div id="particles-js">	</div>
<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<script src="{{ .Site.BaseURL }}js/particles.js"></script> 
{{< /highlight >}}

{{< highlight css >}}
#particles-js {
	/* position: absolute; */
	width: 100%;
	height: 100px;
	background-color: #000; /* 191970 */
	/* background-image: url("../images/screen.jpg"); */
	/* background-image: url("../images/screen2.png"); */
	background-image: linear-gradient(to bottom right, black, navy,#aaa);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
  }
{{< /highlight >}}

#### Main menu

A big upset was the possibility to add new menu items: It only works 

{{< highlight html >}}
<li class="menu__item">
  <a class="menu__link" href="/categories/book/">Books</a>
</li>
<li class="menu__item">
  <a class="menu__link" href="/categories/project/">Projects</a>
</li>
{{< /highlight >}}

#### Adding highlight.js

config.toml

{{< highlight bash >}}
highlight = true
highlightStyle = "monokai-sublime"
highlightLanguages = ["r", "sql", "bash", "css"]
{{< /highlight >}}

baseof.

{{< highlight html >}}
{{ if .Site.Params.highlight | default false }}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
    {{ range .Site.Params.highlightLanguages }} 
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/{{ . }}.min.js"></script> 
    {{ end }}
  <script>hljs.initHighlightingOnLoad();</script>
{{ end }}
{{< /highlight >}}

#### Adding a custom search function


[source](http://www.johann-oberdorfer.eu/blog/2017/11/11/17-11-01_add_site_search_to_hugo_static_site_generator/)
add to config.toml

{{< highlight html >}}
[outputs]
  home = [ "HTML", "RSS", "JSON"]
{{< /highlight >}}

Add the following to your config.toml configuration file:

Note: Make shure to locate the required index.json file in the layouts folder. Once the file exists, hugo is going to dump the index to file.

The index.json file looks like:

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

Once this is done, hugo generates a lunrjs index.json at the root of your public folder. If you encounter some problems run: hugo --verbose and check messages and warnings.
Web site configuration:

../layouts/partials/header.html

Typically, that’s where the css files are:

{{< highlight html >}}
<head>
...
{{ if not .Site.Params.disableSearch }}
    <link href="{{ .Site.BaseURL }}css/auto-complete.css" rel="stylesheet">
{{ end }}
...
</head>
{{< /highlight >}}

../layouts/partials/scripts.html

Please note: as lunr.js is based on jquery, make sure jquery.js gets loaded 1st.

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

and finally, add a search entry box somewhere in your webpage layout:

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

