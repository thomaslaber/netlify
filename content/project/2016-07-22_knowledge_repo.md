---
title: "Airbnb Knowledge Repo"
url: "Airbnb Knowledge Repo"
description: Some webdev stuff
date: 2018-06-25
thumbnail: img/banner/airbnb_know_repo.png
categories:
  - "project"
tags: 
  - "web development"
draft: false
---
The Knowledge Repo project is focused on facilitating the sharing of knowledge between data scientists and other technical roles using data formats and tools that make sense in these professions. It provides various data stores (and utilities to manage them) for "knowledge posts", with a particular focus on notebooks (R Markdown and Jupyter / IPython Notebook) to better promote reproducible research.

* Source <https://github.com/airbnb/knowledge-repo>
* Tutorial: <https://github.com/airbnb/knowledge-repo/issues/401>

## Activation

1. Docker-compose-relevante Dateien in einen entsprechend autorisierten Zielfolder kopieren, in dem docker-compose-Befehle (vor allem “build“/“up“/“down“) auszuführen sind.
2. Im Terminal zum Zielfolder navigieren, per `docker-compose build` Anwendung vorbereiten. Es wird ein git-Repository heruntergeladen („git clone“) und entsprechende Folder erzeugt.
3. Im Terminal zum Zielfolder navigieren, per `docker-compose up` Anwendung starten.
4. Anwendung im Webbrowser ansehen. (siehe `SERVER_NAME` in der Datei `config_defaults.py`
5. SCHLIESSEN: `STRG + C` terminiert den Thread, hinterlässt dabei kritische Informationen im Docker-Compose-System. Erst mit `docker-compose down` werden alle Informationen gelöscht und ein sauberer Neustart (`docker-compose up`) möglich. 


## Knowledge repo in docker

All of the below files should be placed in your root directory, starting the local server can be done through the commands aliased in the `Makefile`:

{{< highlight makefile >}}
make run
{{< /highlight >}} 

**Note**: I was unable to get the deploy configuration running on my containers, especially with Auth/Logins enabled - if anyone has any success with this then please let me know!

### Dockerfile

{{< highlight makefile >}}
FROM python:3
COPY . /app
WORKDIR /app
RUN pip install knowledge-repo[all]
RUN pip install --upgrade requests psycopg2 requests_oauthlib flask_login flask_principal

CMD bash /app/start.sh
{{< /highlight >}} 

### start.sh

This clones your git post store (delete if necessary) and starts the server based on the `RUNTIME_CONTEXT` environment variable passed in `docker-compose`.

{{< highlight bash >}}
#!/usr/bin/env bash

echo
echo "Setting up server"
echo "--------"
echo

# Exit script if any command returns a non-zero status
set -e

if [ ! -d "/app/<GITHUB-POST-REPO>" ]; then
	echo "Cloning research repo "

	cd /app/
	if [ -z "$(ls -A <GITHUB-POST-REPO>)" ]; then
		echo "clone here"
#		This will need to be the PAT for the knowledge repo github account
		git clone https://${GITHUB_PAT}@github.com/<ORG>/<GITHUB-POST-REPO>.git
	fi
fi
echo Runtime context ${RUNTIME_CONTEXT}

echo
cd /app/
if [ "${RUNTIME_CONTEXT}" == "local" ]; then
    echo Starting local server
    echo ---
    python scripts/knowledge_repo --repo ./<GITHUB-POST-REPO> --debug runserver --config ./server_config.py --port ${PORT}
else
    echo Starting remote server
    echo ---
    python scripts/knowledge_repo --repo ./<GITHUB-POST-REPO> runserver --config ./server_config.py --port ${PORT}

fi
{{< /highlight >}} 

### docker-compose.yml

This defines environment variables for your application e.g. github personal access token (PAT), sets what ports are mounted from your container externally and mounts the your app data volume into your container so any code changes can be immediately reflected with no rebuilds.

*This file should be added to your gitignore for deployment

{{< highlight makefile >}}
version: '3'

services:
  app:
    build:
      args:
#This can be deleted for non-git backed repositories, it should be the PAT for your post-store account
        - GITHUB_PAT=${GITHUB_PAT}
      context: .
    ports:
      - 80:80
    networks:
      - default
    volumes:
      - .:/app
    environment:
# Fill in any Knowledge repo env variables here
      - PORT=80
      - SERVER_NAME=localhost
      - RUNTIME_CONTEXT=local
{{< /highlight >}} 

### Makefile

This aliases docker compose commands so you don't have to remember them.

{{< highlight makefile >}}
build:
	docker-compose build

shell:
	docker-compose run --rm app bash

clean:
	docker system prune -f
	docker-compose stop
	docker rmi knowledgerepo_app

run:
	docker-compose up
{{< /highlight >}} 
