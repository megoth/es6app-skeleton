---
title: Bonus - Uploading the application to Heroku
short: Bonus (Heroku)
template: slide.jade
---

I recommend going through the articles on [Getting started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction); it sets up everything you need to know.

But besides that there are some gotchas in this application.

First of all, I've been unsuccessful in bundling the script-files, which means I need to upload all dependencies in ```jspm_packages```. I could probably've singled out the ones I need, but I'm lazy so I uploaded all of it.

As this is a dirty hack, I don't want to it affect my main repo. For this purpose I branched out for Heroku, creating the branch heroku. This forces me to maintain two branches, but it's not that big of a deal. (I usually just do ```git merge master``` when I'm on the heroku branch and push it Heroku when I feel like updating the Heroku app.)

Given that you've added Heroku as a remote on the git repo, you can run the following when you have a repo on the heroku-branch you want to upload:

    git push heroku heroku:master

This uploads the local branch heroku to remote branch master on the endpoint heroku.