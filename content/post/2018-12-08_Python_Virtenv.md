---
title: "Python Virtual Environment"
url: "python-virtual_environment"
editor_options: 
  chunk_output_type: inline
date: 2018-12-08
thumbnail: img/banner/python.png
categories:
  - "post"
tags:
  - "python"
draft: false
---

## Conda

How to set up a virtual environments using conda for the Anaconda Python distribution

    A virtual environment is a named, isolated, working copy of Python that that maintains its own files, directories, and paths so that you can work with specific versions of libraries or Python itself without affecting other Python projects. Virtual environmets make it easy to cleanly separate different projects and avoid problems with different dependencies and version requiremetns across components. The `conda` command is the preferred interface for managing intstallations and virtual environments with the Anaconda Python distribution. If you have a vanilla Python installation or other Python distribution see `virtualenv`.


### 1. Check conda is installed and in your PATH

Open a terminal client.
Enter `conda -V` into the terminal command line and press enter.
If conda is installed you should see something like the following.

{{< highlight python >}}
$ conda -V
conda 3.7.0
{{< /highlight >}}

### 2. Check conda is up to date

{{< highlight python >}}
conda update conda
{{< /highlight >}}

### 3. Create a virtual environment for your project

In the terminal client enter the following where `yourenvname` is the name you want to call your environment, and replace `x.x` with the Python version you wish to use. 
(To see a list of available python versions first, type `conda search "^python$"` and press enter.)

{{< highlight python >}}
conda create -n yourenvname python=x.x anaconda
{{< /highlight >}}

### 4. Activate your virtual environment

To activate or switch into your virtual environment, simply type the following where `yourenvname` is the name you gave to your environement at creation.

{{< highlight python >}}
source activate yourenvname
{{< /highlight >}}


### 5. Install additional Python packages to a virtual environment

To install additional packages only to your virtual environment, enter the following command where `yourenvname` is the name of your environemnt, and `[package]` is the name of the package you wish to install. Failure to specify `-n yourenvname` will install the package to the root Python installation.

{{< highlight python >}}
conda install -n yourenvname [package]
{{< /highlight >}}

### 6. Deactivate your virtual environment

To end a session in the current environment, enter the following. There is no need to specify the envname - which ever is currently active will be deactivated, and the `PATH` and shell variables will be returned to normal.

{{< highlight python >}}
source deactivate
{{< /highlight >}}

### 7. Delete a no longer needed virtual environment

To delete a conda environment, enter the following, where `yourenvname` is the name of the environment you wish to delete.

{{< highlight python >}}
conda remove -n yourenvname -all
{{< /highlight >}}

## Python3

If you want to work without `conda` you can work directly with `python3`.

The `python3-venv` module allows us to create lightweight virtual environments with their own site directories, optionally isolated from system site directories. Given that, we will be able to run multiple Python 3 environments with varying dependencies on the same computer.

### 1. Create a virtual environment for your project

{{< highlight python >}}
python3 -m venv ~/yourenvname
{{< /highlight >}}

### 2. Activate your virtual environment

In order to get into your Python 3 virtual environment with your terminal window, you need to run the `activate` script. 

{{< highlight python >}}
source ~/yourenvname/bin/activate
{{< /highlight >}}

### 3. Install additional Python packages to a virtual environment

After the command complete, you will find that your terminal prompt is appended with (yourenvname). While inside this virtual environment, you can install any Python dependencies with the `pip` command. 

{{< highlight python >}}
pip install [package]
{{< highlight python >}}

### 4. Deactivate your virtual environment

In order to get out of your Python 3 virtual environment, run:

{{< highlight python >}}
deactivate
{{< /highlight >}}

## Jupyter Notebooks

### 1. Activate your virtual environment

First, activate your virtual environment and make sure you have `ipykernel` installed.

{{< highlight python >}}
source activate myenv
pip install --user ipykernel
{{< /highlight >}}

### 2. Install kernel

We need to manually add the kernel if we want to have the virtual environment in the Jupyter Notebook.

{{< highlight python >}}
python -m ipykernel install --user --name yourenvname --display-name "Python (myenv)"
{{< /highlight >}}

With this, we have set up our virtual environment kernel and ready to be used in the Jupyter Notebook.
The notebook now has all the installed packages in this environment.

### 3. Uninstall 

If you want to remove it, run: 

{{< highlight python >}}
jupyter kernelspec uninstall yourenvname
{{< /highlight >}}