# How to setup MkDocs

## Preconditions
- - -
#### 1. Install Python

Download latest version installer from [Python download page](https://www.python.org/downloads/)

Or

Use Chocholaty to install python package (command line as Adminstrator)

`choco install python`

#### 2. Install Pip (Python package manager)

if not installed when install Python, at command line as adminstrator, use following command to check if pip already installed

`pip --version`
`choco install pip`

Command to upgrade pip version

`python -m pip install --upgrade pip`

#### 3. Set Path environnment variables

The default installed folder of Python command is at `c:\Python37`, and pip command is at`Scripts` subfolder, if these two folders are not in PATH environement variables, add them

## Install MkDocs
- - -
#### 1. Install MkDocs package

`pip install mkdocs`

`mkdocs --version`

`pip install -U mkdocs` to upgrade to latest version

After instal mkdocs, the Python Markdown is also installed, use following command to check the version:

`python -m markdown --version`

if it's not installed, use following command to install Python Markdown:

`pip install Markdown`

`pip install pymdown-extensions`

#### 2. Add mkdocs to PATH enviroment variables
The mkdocs.exe is at `Scripts` subfolder of python, use following command to check mkdocs is available:

`mkdocs -h`

#### 3. Install Theme used by MkDocs

[Available pre-build themes:](https://github.com/mkdocs/mkdocs/wiki/MkDocs-Themes)

	pip install mkdocs-material
	pip install mkdocs-cinder
	pip install mkdocs-windmill

Details about custom installed themes:

* [Custom Material Theme](https://squidfunk.github.io/mkdocs-material/getting-started)

    Strong support to Python-Markdown Extensions
    [supported extensions](https://squidfunk.github.io/mkdocs-material/extensions/admonition/)
	[extensions examples](https://omicsoftdocs.github.io/ArraySuiteDoc/about/example/#extensions)

* [Custom Cinder Theme](https://sourcefoundry.org/cinder/#about)
* [Custom Windmill Theme](https://gristlabs.github.io/mkdocs-windmill/#customization/)

	Best layout for tables for more table columns

* [Create Your Own Theme](https://www.mkdocs.org/user-guide/custom-themes/)

#### 4. Install other extentions

|Package Command| Description| Config | Usage|
|--|--|--|--|
|pip install pygments| Python syntax highlighter (supports 300+ langauges)|- codehilite:<br>&nbsp;&nbsp;guess_lang: false|\`\`\`C#|
|pip install markdown-include| enable include md file into another md file|- markdown_include.include:<br>&nbsp;&nbsp;base_path: docs|`{\!report-documents/QPMM-report/cardiac-center-list.md\!}` (Without backslash)|


## Work with MkDocs
- - -
#### 1. Create project

`mkdocs new [project name]`

The project layout would be like below:

```
	mkdocs.yml    # The configuration file.
	docs/
    index.md  # The documentation homepage.
    ...       # Other markdown pages, images and other files.
```

#### 2. Edit mkdocs.yml config file under project root folder

	site_name: DAR Project
	site_description: Formal report requiremennt documents about four major reports used in CorHealth
	theme: windmill

#### 3. Start the project site

`mkdocs serve`

visit local site pages via [localhost:8000](http://localhost:8000)

#### 4. Build project
The generated html will be saved to site diretory

`mkdocs build`

Or

`mkdocs build --clean`

#### 5. Enable GitHub Pages
* From Repository page, create a branch named "gh-pages", this is the default remote branch name that MkDocs publishes the compiled Html pages
* Select the source dropdown item'gh-pages branch', click the Save button
* The repository's GitHub Pages published Url would be:

	`https://[ git enterprise server]/pages/[Organization or User Name]/[Repository]/`

	A sample Url:

    `https://ccndevgithub.ccn.on.ca/pages/CorHealth/report-wiki/`

* It need to wait for a while, that GitHub will treat index.html as the default page

#### 6. Publish project to GitHub
- Switch git local to gh-pages branch
- Run command `mkdocs gh-deploy --clean` to deploy the compiled Html pages to gh-pages branch
- Try the GitHub pages Url in above steps, make sure all document pages shows properly
- If mkdocs gh-deploy command not working, you can also commit site directory folder content to gh-pages

## MkDocs Commands
- - -
* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print this help message.

## MkDocs Resources
- - -

* [MkDocs documentation](https://www.mkdocs.org/)
* [Writing your docs with MkDocs](https://www.mkdocs.org/user-guide/writing-your-docs/)
* [Python Markdown Extensions Documentations](https://facelessuser.github.io/pymdown-extensions/extensions/details/)
* [Markdown Processors List](https://github.com/markdown/markdown.github.com/wiki/Implementations)

