FROM python:3
COPY . /app
WORKDIR /app
RUN pip install knowledge-repo[all]
RUN pip install --upgrade requests psycopg2 requests_oauthlib flask_login flask_principal


RUN apt-get update -y
RUN apt-get upgrade -y
### R and R packages are required for autogenerating Rmd knowledge posts
RUN apt-get install r-recommended -y
RUN Rscript -e "install.packages('knitr', repos = 'http://cran.us.r-project.org')" -y


### calling start.sh script
CMD bash /app/start.sh
