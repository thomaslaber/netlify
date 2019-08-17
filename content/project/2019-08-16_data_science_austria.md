---
title: "data-science-austria.at"
url: "data-science-austria.at"
date: 2019-08-16
thumbnail: img/banner/template.png
categories:
  - "project"
tags: 
  - "web development"
draft: true
---

The last few months I set out to build up to build a news and event aggregator. You can see the work in progress here: <a href="https://data-science-austria.at/">data-science-austria.at</a>

## Wordpress

### Plugins

Here is a list of plugins that I use for the site grouped by the general overall purpose. The first one is a collection that I would generally recommend for any site, i.e. some ssl and security plugins. 

- <a href="https://wordpress.org/plugins/backupwordpress/">BackUpWordPress</a> - automatic backup tool
- <a href="https://wordpress.org/plugins/cloudflare-flexible-ssl/">Cloudflare Flexible SSL</a> - ssl encryption
- <a href="https://wordpress.org/plugins/really-simple-ssl/">Really Simple SSL</a> - ssl encryption
- <a href="https://wordpress.org/plugins/wordpress-https/">WordPress HTTPS</a> - ssl encryption
- <a href="https://wordpress.org/plugins/wordfence/">Wordfence Security</a> - additional security
- <a href="https://wordpress.org/plugins/login-recaptcha/">Login No Captcha reCAPTCHA (Google)</a> - additional security
- <a href="https://wordpress.org/plugins/ga-google-analytics/">GA Google Analytics</a> - additional security

The following are more specific and solve content problems. 

- <a href="https://wordpress.org/plugins/cybersyn/">CyberSEO Lite (CyberSyn)</a> - rss feed importer
- <a href="https://wordpress.org/plugins/search-filter/">Search & Filter Pro</a> - this 
- <a href="https://wordpress.org/plugins/the-events-calendar/">The Events Calendar</a> - great calendar plugin
- <a href="https://wordpress.org/plugins/favorites/">Favorites</a> - save your favorite posts to your profile
- <a href="https://wordpress.org/plugins/user-submitted-posts/">User Submitted Posts</a> - enable users to submit content

### RSS Feeds

The following RSS feeds are being imported. 

### Events Feed

Using the automatic import function of "The Events Calendar"-plugin, it reads all upcoming events from my meetup profile. Bigger conferences such as useR! are added by hand. 

## Machine Learning

I am also working on a feature that auto-tags all my content. The plan looks like this:

1. Create a proper training set with hand-tagged articles. 
2. Use it to train a model with Azure text analysis service.
3. Whenever a new article is imported, send it to the text analysis service via email (using a logic app).
4. Write the tags back to Wordpress via REST-api. 

## git-ftp

A pretty cool way to work on a website and yet have all the features of version control is called <a href="https://github.com/git-ftp/git-ftp">git-ftp</a>

    If you use Git and you need to upload your files to an FTP server, Git-ftp can save you some time and bandwidth by uploading only those files that changed since the last upload.

    It keeps track of the uploaded files by storing the commit id in a log file on the server. It uses Git to determine which local files have changed.

    You can easily deploy another branch or go back in the Git history to upload an older version.

Here is a small extract of how to use it: 

{{< highlight bash >}}
# Setup
git config git-ftp.url "ftp://ftp.example.net:21/public_html"
git config git-ftp.user "ftp-user"
git config git-ftp.password "secr3t"

# Upload all files
git ftp init

# Or if the files are already there
git ftp catchup

# Work and deploy
echo "new content" >> index.txt
git commit index.txt -m "Add new content"
git ftp push
# 1 file to sync:
# [1 of 1] Buffered for upload 'index.txt'.
# Uploading ...
# Last deployment changed to ded01b27e5c785fb251150805308d3d0f8117387.
{{< /highlight >}}