#!/usr/bin/env bash

echo
echo "Setting up server"
echo "--------"
echo

# Exit script if any command returns a non-zero status
set -e


### clone repo if not exists
if [ ! -d "/app/LocalKnoRepo" ]; then
        echo "Cloning research repo "

        cd /app/
        if [ -z "$(ls -A LocalKnoRepo)" ]; then
                echo "clone here"
#               This will need to be the PAT for the knowledge repo github account
                git clone https://${GITHUB_PAT}@github.com/u13e1us/LocalKnoRepo.git
        fi
fi
echo Runtime context ${RUNTIME_CONTEXT}

echo
cd /app/
if [ "${RUNTIME_CONTEXT}" == "local" ]; then
    echo Starting local server
    echo ---
### run server with configurations specified in config_defaults.py
    knowledge_repo --repo ./LocalKnoRepo --debug runserver --config ./config_defaults.py --port ${PORT}
else
    echo Starting remote server
    echo ---
    knowledge_repo --repo ./LocalKnoRepo runserver --port ${PORT}

fi
