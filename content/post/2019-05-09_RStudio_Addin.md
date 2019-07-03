---
title: "RStudio Addin"
url: rstudio-addin
editor_options:
  chunk_output_type: inline
date: 2019-05-09
thumbnail: img/banner/rstudio_addin.png
categories: 
  - "post"
tags: 
  - "R"
draft: false
---
# How to write your own Rstudio Addin

If you want to create your own RStudio addins, all you need to do is:

1. Create an R package
2. Create some R functions
3. Create a file at `inst/rstudio/addins.dcf`

### Links

* https://rstudio.github.io/rstudioaddins/
* https://github.com/rstudio/addinexamples
* `devtools::install_github("rstudio/addinexamples")`


## 1. Create am R Package

### Set up tools for package development

{{< highlight r >}}
library(devtools)
library(roxygen2)

# getwd() 
# setwd("path/to/repo")
{{< /highlight >}}

### Create Package

I am mainly following: https://hilaryparker.com/2014/04/29/writing-an-r-package-from-scratch/

{{< highlight r >}}
create("rstudio_addin")
{{< /highlight >}}

This creates the following files and folder structure:

![RStudio Folder Structure](/img/rstudio_addin/rstudio_addin1.png)

## 2. Create some R functions

We will put the following code in our package, more specifically into the R folder: 

{{< highlight r >}}
serverlessAddin <- function() {
  rstudioapi::insertText(" Rstudio Addin works ")
}
{{< /highlight >}}

### Document

{{< highlight r >}}
document()
{{< /highlight >}}


Use `STRG + SHIFT + d` for document. 


### Build & Install

Use `STRG + SHIFT + b` for build. 

{{< highlight r >}}
library(rstudio_addin)
{{< /highlight >}}

## 3. Register the Addin

### Create `addins.dcf`

The last step is to create a file at `inst/rstudio/addins.dcf` within your R package.

https://github.com/rstudio/webinars/blob/master/17-Understanding-addins/Understanding%20RStudio%20Add-ins.pdf

```
"C:\Users\u1341vs\Documents\R\win-library\3.4\addinexamples\rstudio"
"C:\Users\u1341vs\Documents\R\R-3.5.3\library\addinexamples
```

This is what the content of the file looks like:

```
Name: Find and Replace
Description: Find and replace words in a document.
Binding: findAndReplaceAddin
Interactive: true

Name: Reformat R Code
Description: Reformat R code using 'formatR::tidy_source()'.
Binding: reformatAddin
Interactive: true

Name: Subset a Data Frame
Description: Interactively subset a data frame.
Binding: subsetAddin
Interactive: true
```

Therefore we simply add the following lines of code in the mandatory format:

```
Name: RStudio Addin
Description: Creates a DOCKERFILE with the current content.
Binding: rstudio_addin
Interactive: false
```
After installing the package and restarting RStudio we have a new Addin:

![addin menu](/img/rstudio_addin/rstudio_addin2.png)

### Create keyboard shortcut

In `Tools > Addins > Browse Addins` we can set a shortcut for the addin. 

In our case `SHIFT + STRG + ALT + s`.
