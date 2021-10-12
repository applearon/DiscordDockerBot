# DiscordDockerBot
A Discord bot that allows users to run linux commands on a specialized container. 
This bot was made using [discord.js](https://discord.js.org)

Uses docker to create and run containers
Install Docker from your distro's package manager and make sure your user has the privilages for docker.
Create a .env file and put this in it:
```TOKEN=[YOUR BOT TOKEN]```

Then run `node main.js`


**Node Dependencies:**
`npm i dotenv`,

**Other Dependancies**
You need docker installed on your system. Look [here](https://docs.docker.com/get-docker/) for distro-specific information.

**Note**: This has only been tested on linux systems, and likely will not run on windows or macOS.
