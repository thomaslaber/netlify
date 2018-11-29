---
title: "hugo"
description: "Lorem ipsum dolor sit amet"
categories:
  - "project"
tags: 
  - "web development"
weight: 1
draft: false
---

### Create new hugo site

```{bash}
hugo new site [path] [flags]
```

### git init

#### Create a new repository on the command line

```{bash}
echo "# website2" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/thomaslaber/website2.git
git push -u origin master
```

#### Push an existing repository from the command line

```{bash}
git remote add origin https://github.com/thomaslaber/website2.git
git push -u origin master
```

### git submodule

```{bash}
git submodule add https://github.com/calintat/minimal.git themes/minimal
# https://github.com/vimux/mainroad themes/mainroad
git submodule init
git submodule update
```

#### update later

```{bash}
git submodule update --remote themes/minimal
```


```{bash}
cp themes/mainroad/exampleSite/config.toml .
```

### Start Hugo

```{bash}
hugo server -D
```

### Add custom CSS

Inside the config file I assign an array to a variable:


```{bash}
[params]
    custom_css = ["css/foo.css", "css/bar.css"]
```
You can reference as many stylesheets as you want. Their paths need to be relative to the static folder.

Inside the header partial you can include every custom stylesheet from above beside the original one:

```{bash}
{{ range .Site.Params.custom_css -}}
    <link rel="stylesheet" href="{{ . | absURL }}">
{{- end }}
```
Replace color codes with custom ones: #e64946 (red) with #191970 (midnight blue)
Of course, we copied the *stlye.css* into the static/css folder, so it overwrites the standard.

Adding Particles background

```{bash}
```

```{bash}
```