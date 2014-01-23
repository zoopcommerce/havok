havok docs
==========

Here you'll find the havok docs. To build or browse
the havok docs you will need node.js installed

Directories have the following contents:

build: Contains all the build configuration and scripts to build havok documentation.
       Run `node build/build.js` to build the havok docs into flat files in the dist folder

client: Contains AMD modules used by the docs.

server: Contains scripts to browse the unbuilt havok docs. To browse the havok docs run `node server/server.js`
        and point your browser to http://localhost

twig: Contains templates for all the documentation pages.
