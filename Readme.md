Faye/Safari socket bug example app
==================================

This example allows us to reproduce a bug which has plagued us in production.

We have tested the server on Fedora 21 and CentOS 6.


Instruction to reproduce bug
----------------------------

Run server component on Linux box.

    node server/app.js

Start server somewhere to point at client HTML. I used the built-in PHP server.

    php -S localhost:3002

On a Mac OS X box, open `supporting/run_safari.scpt` in Script Editor. Change
the first line to point at the location of the client HTML. Run it.

On the Linux server, you should see a CLOSE_WAIT socket appear after Safari
closes and remain in that status. I used `netstat` to watch this.

    sudo watch -n1  'netstat -tapn | grep CLOSE'


Post-mortem
-----------

These sockets eat up memory and hang around for a long time. We have observed
2 hours on CentOS and 1 minute, 25 seconds on Fedora.

On the CentOS production server, they keep accumulating until the server runs
out of memory and kills the node process.
