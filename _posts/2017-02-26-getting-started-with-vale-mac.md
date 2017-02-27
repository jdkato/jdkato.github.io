---
title: "Getting Started with Vale (macOS)"
layout: post
tags : [Vale]
---

First, we need to [download Vale](https://github.com/jdkato/vale/releases). You should see a list like this:

<img src="/img/downloads.png" alt="Vale Downloads page" class="img-thumbnail">

Select `macOS-64bit.tar.gz`. From here, we have two options:

1. We can move the `vale` executable to `/usr/local/bin`. This will give all users on our system access to the program, but it may require root privileges to move it here.

2. We can move the `vale` executable to `~/bin`. In this case, we'll be the only user with access to the program.

<img src="/img/extract.png" class="center-block">

For the sake of this tutorial, we'll choose option 2. Now open Terminal.app and enter the following commands one at a time:

```
mkdir -p ~/bin
cd ~/bin
tar -xvzf ~/Downloads/macOS-64bit.tar.gz
```

If you see "vale not found" like above, you'll need to add `vale` to your `PATH` variable. We can do that by using the text editor nano:

<img src="/img/nano.png" class="center-block">

Add `export PATH=$PATH:$HOME/bin` to the file and type <kbd>Control-X</kbd>, followed by <kbd>Y</kbd> and <kbd>enter</kbd>:

<img src="/img/nano2.png" class="center-block">

Restart terminal and type `which vale` once again:

<img src="/img/vale.png" class="center-block">

And we're all set! Now, you'll want to learn how to write and use your own styles. [See the wiki](https://github.com/jdkato/vale/wiki) for more information.









