---
title: "Docker Python"
url: "docker_python"
editor_options: 
  chunk_output_type: inline
date: 2018-11-08_
thumbnail: "img/banner/docker.png"
categories:
  - "post"
tags: 
  - "azure"
  - "python"
draft: false
---


# Overview

## Testing the base image

{{< highlight bash >}}
docker run python:3 /bin/echo 'Hello world'  
{{< /highlight >}}

* `docker run` is a command to run a container.
* `python:3` is the image you run. For example, the Ubuntu operating system image. When you specify an image, Docker looks first for the image on your Docker host. If the image does not exist locally, then the image is pulled from the public image registry – Docker Hub.
* `/bin/echo ‘Hello world’` is the command that will run inside a new container. This container simply prints “Hello world” and stops the execution.

lets test the base image real quick:


{{< highlight bash >}}
docker run -i -t --rm python:3 /bin/bash
{{< /highlight >}}


    -t flag assigns a pseudo-tty or terminal inside the new container.
    -i flag allows you to make an interactive connection by grabbing the standard input (STDIN) of the container.
    –rm flag automatically removes the container when the process exits. By default, containers are not deleted. This container exists until we keep the shell session and terminates when we exit the session (like an SSH session with a remote server).

We can see that 

## Create DOCKERFILE

We know the base image we want to use, i.e. `FROM python:3`. Will put this in our `DOCKERFILE`.

After navigating to the folder we can build the 

{{< highlight docker >}}
docker build . 
{{< /highlight >}}

img

we should also name and tag it:

{{< highlight docker >}}
docker build -t <name>:<tag>. 
{{< /highlight >}}

Lets have a quick look at our image: 

{{< highlight docker >}}
docker images
{{< /highlight >}}

img

With the following command (`docker rbi <hash>`) we can remove unwanted or obsolete images. 

{{< highlight docker >}}
docker rbi 
{{< /highlight >}}


{{< highlight docker >}}
FROM python:3

COPY vmsim /

CMD [ "python", "./hello.py" ]

{{< /highlight >}}



{{< highlight docker >}}
{{< /highlight >}}



# First steps





{{< highlight bash >}}
docker run -i -t --rm ubuntu /bin/bash

{{< /highlight >}}


    
