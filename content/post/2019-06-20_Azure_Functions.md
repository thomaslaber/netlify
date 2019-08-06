---
title: "Azure Functions"
url: "azure-functions"
editor_options: 
  chunk_output_type: inline
date: 2019-06-20
thumbnail: "img/banner/azure_functions.png"
categories:
  - "post"
tags: 
  - "azure"
  - "python"
draft: false
---

This blogpost will demonstrate how to set up Azure Functions with some Python code. More precisely, it will show how to call an Azure Function, add a parameter that specifies the name of the file that we want to read from and store that information in a database. Between reading and storing we have the chance to execute any python code we want. As long as it stays below the 30 min threshold :) 

## Setup

Most of the setup code is directly taken from here: <a href="https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function">Microsoft Tutorial: Create your first function in the Azure portal</a>
As soon as the typos start, it is my code and tutorial again :)

Before you start, you must have the following:

* <a href="https://www.python.org/downloads/" target="_blank">Python 3.6</a>
* <a href="https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#v2" target="_blank">Azure Functions Core Tools</a> version 2.6.666 or later
* <a href="https://docs.microsoft.com/en-us/cli/azure/install-azure-cli" target="_blank">Azure CLI</a> version 2.x or later
* An active Azure subscription

### Create and activate a virtual environment

{{< highlight bash >}}
# Bash
python3.6 -m venv .env
source .env/bin/activate

# PowerShell or CMD
py -3.6 -m venv .env
.env\scripts\activate
{{< /highlight >}}

### Create a local Functions project

{{< highlight bash >}} func init FunctionSample
{{< /highlight >}} 

Choose python as worker runtime:

![Choose python as worker runtime](/img/azure_functions/azure_function1.png)

A folder named MyFunctionProj is created, which contains the following three files:

* `local.settings.json` is used to store app settings and connection strings when running locally. This file doesn't get published to Azure.
* `requirements.txt` contains the list of packages to be installed on publishing to Azure.
* `host.json` contains global configuration options that affect all functions in a function app. This file does get published to Azure.

### Create a function

To add a function to your project, run the following command:

{{< highlight bash >}} func new
{{< /highlight >}} 

Choose the HTTP trigger template and gave a name to the function:

![Choose the HTTP trigger template](/img/azure_functions/azure_function2.png)

![Give the function a name](/img/azure_functions/azure_function3.png)

A subfolder named HttpTrigger is created, which contains the following files:

* `function.json`: configuration file that defines the function, trigger, and other bindings. Review this file and see that the value for scriptFile points to the file containing the function, while the invocation trigger and bindings are defined in the bindings array.
Each binding requires a direction, type and a unique name. The HTTP trigger has an input binding of type httpTrigger and output binding of type http.

* `init.py`: script file that is your HTTP triggered function. Review this script and see that it contains a default main(). HTTP data from the trigger is passed to this function using the req named binding parameter. Defined in function.json, req is an instance of the azure.functions.HttpRequest class.

### Run the function locally
{{< highlight bash >}} func host start
{{< /highlight >}} 

![Run the function locally](/img/azure_functions/azure_function4.png)

If we type `http://localhost:7071/api/HttpTrigger?name=Thomas` into the browser bar now we will get the following result. 

![Working Azure Function](/img/azure_functions/azure_function5.png)

## Analysis of the code so far

Let's a have closer look into `__init__.py`: 

{{< highlight python >}}
import logging
import azure.functions as func

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('name')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

    if name:
        return func.HttpResponse(f"Hello {name}!")
    else:
        return func.HttpResponse(
             "Please pass a name on the query string or in the request body",
             status_code=400
        )
{{< /highlight >}} 

We can see the parameter `name` was expected. If you need you will get an error messag. We will build directly on this stub and not even change its name. 

## Adding Storage

We will need to import the necessary python package for the Azure storage

{{< highlight python >}}
from azure.storage.file import FileService
{{< /highlight >}} 

Furthermore we add to functions:

1. check_file
2. read_file

{{< highlight python >}}
def check_file(name):
    file_service = FileService(account_name='<account_name>', account_key='<account_key>')
    return file_service.exists('foobar', None, name+'.txt')

def read_file(name):
    file_service = FileService(account_name='<account_name>', account_key='<account_key>')
    file_service.get_file_to_path('foobar', None, name+'.txt', 'download.txt')

    file = open("download.txt", "r") 
    file_content = file.read() 

    return file_content
{{< /highlight >}} 

## Adding Database 
Again we need to add the necessary library, this time pyodbc: 

{{< highlight python >}}
import pyodbc 
{{< /highlight >}} 

We define one function that simply saves the content of the file into the database: 

{{< highlight python >}}
def save_db(file_content):
    cnxn = pyodbc.connect('Driver={ODBC Driver 13 for SQL Server};Server=tcp:<name>.database.windows.net,1433;Database=<database>;Uid=XXX@XXX;Pwd=<password>;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')
    cursor = cnxn.cursor()
    cursor.execute("INSERT INTO <database> (<field>) VALUES('" + str(file_content) + "')")

    cnxn.commit()
    cursor.close()
    cnxn.close()
{{< /highlight >}} 

## Main Code

A little adaption to the main function: 

{{< highlight python >}}
if name:
        if not check_file(name):
            return func.HttpResponse("File doesn't exist")
            
        file_content = read_file(name)
        save_db(file_content)
        return func.HttpResponse(f"Content of file... {file_content}!")
{{< /highlight >}} 

## Final code base

Here is the final result: 

{{< highlight python >}}
import logging

import azure.functions as func
from azure.storage.file import FileService
import pyodbc 


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('name')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

    
    if name:
        if not check_file(name):
            return func.HttpResponse("File doesn't exist")
            
        file_content = read_file(name)
        save_db(file_content)
        return func.HttpResponse(f"Content of file... {file_content}!")
    else:
        return func.HttpResponse(
             "Please pass a name on the query string or in the request body",
             status_code=400
        )

def check_file(name):
    file_service = FileService(account_name='<account_name>', account_key='<account_key>')
    return file_service.exists('foobar', None, name+'.txt')

def read_file(name):
    file_service = FileService(account_name='<account_name>', account_key='<account_key>')
    file_service.get_file_to_path('foobar', None, name+'.txt', 'download.txt')
    
    file = open("download.txt", "r") 
    file_content = file.read() 
    
    return file_content

def save_db(file_content):
    cnxn = pyodbc.connect('Driver={ODBC Driver 13 for SQL Server};Server=tcp:<name>.database.windows.net,1433;Database=<database>;Uid=XXX@XXX;Pwd=<password>;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')
    cursor = cnxn.cursor()
    cursor.execute("INSERT INTO <database> (<field>) VALUES('" + str(file_content) + "')")

    cnxn.commit()
    cursor.close()
    cnxn.close()
{{< /highlight >}} 

In the next blog post we will talk about how to make this secure. 