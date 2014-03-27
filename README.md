Men's Roller Derby World Cup
=====

This is all of the code used by live.mrdwc.com during the first Men's Roller Derby World Cup in March 2014. The code is in the state it was in after the tournament has finished. Most of the code was written before the tournament, some was written during the tournament.

I (Sausage Roller, author) will add a license to this code at some point, probably when it's had a spring clean. So, whilst you are free to look at this code and even deploy it if you want,  if you intend to use it in the real world for anything other than a personal project, ask for permission.

If you have any feedback or questions, just ask.

#Architecture

The site was built to be reliable. There's multiple undocumented failsafes allowing all kinds of terrible things to happen and the site stays online. The most basic is the divide between _mrdwc.com_ and _live.mrdwc.com_. The former living in a US East coast data centre and hosted by MediaTemple, the latter existing on European AWS servers via the joyful Heroku.

You'll see there's four different apps that make up the service. This allows for easy scaling and a division of labour. Here's a brief description of each module.

##mrdwc-live

This is the static website you see when you visit live.mrdwc.com. It's super simple and does nothing dynamically. All the data is fetched via a browser ajax call to the next module.

##mrdwc-query

The horizontal scaling of the site all comes from this module. It has a simple job; return a JSON representation of the current tournament state, to be displayed on the site. This includes current game stats, as well as brackets, tables, and even the text to display on the alternate language feed options. The module gets the state from a mongo database (hosted on MongoLab, again in the Euro AWS)

##mrdwc-command

Easily the most complex component, this is the admin interface used throughout the tournament via its own URL. If the front-end of the site dies for any reason, the state can still be calculated and served via a back-up process. This module also allows manual data entry from the scoreboards to manage if the scoreboard software in the building has issues (which as it turns out, it did).

This module loads all the components which make up the tournament state, build the complete state, and update the mongo database.

##mrdwc-poll 

This simple little module pokes the mrdwc-command module every few seconds and prompts it to rebuild the status.

#Tests

You will see from the code, every app has a full set of tests. Test Driven Development is fantastic and everyone should do it.

Using Loader.io I was able to load-test each of the major components that would need to face a high load. Whilst not made public before the event due to a fear of irony/sod's law, the site was stress tested. The headlines:

* mrdwc.com, the WordPress site hosted by Media Temple for $20/month, could handle around **90 request per second**.
* live.mrdwc.com could handle the maximum load-test without any real effort, equivalent to around **5,000 pageviews per second**. I have no idea what it's theoretical maximum is.
* mrdwc-query, used to dynamically update the data displayed on live.mrdwc.com could handle 8,500 requests per second. Assuming the scoreboards updated once every 10 seconds (I could adjust this dynamically), that's a maximum of **85,000 concurrent users**.

#Services used

* **Heroku** - Hosting of the apps. Allowed for very good value instant scaling
* **MongoLab** - The database (the most expensive component)
* **Media Temple** - Hosting of the mrdwc.com (wordpress) site on their Grid Server for spiked traffic
* **UptimeRobot** - Pings every system and measure uptime, as well as keep every app alive (important for the mrdwc-poll)
* **Liberato** - Monitor load on the Heroku apps
* **Rollbar** - Alerting and monitoring of front-end javascript issues
* **Loader.io** - Provided load testing of the major components
* 

#About the Author

John Kershaw, aka Sausage Roller, is a software developer living in the UK. He skates for Manchester Roller Derby's men's A team, New Wheeled Order. He has a personal website that's always out-of-date at http://jkershaw.com. As well as a number of personal and professional projects, he's also responsible for the Roller Derby Test O'Matic (http://rollerderbytestomatic.com/), the Minimum Skills app (available in all good app stores), and Derby Roll Call (http://www.derbyrollcall.com/). 
