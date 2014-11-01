/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Hackathon = require('../api/hackathon/hackathon.model');
var User = require('../api/user/user.model');

Hackathon.find({}).remove(function() {
  Hackathon.create({
    name: 'YHack',
    info: 'YHack is a national hackathon hosted by and at Yale University. Join over 1000 other undergraduate students for a weekend of hacking. It\'s the perfect opportunity to meet and learn from other like-minded hackers, all the while honing your own skills.',
    date: new Date(2014, 9, 31),
    url: 'http://yhack.org',
    participants: [{
      info: 'Hey guys! A little late notice but I\'m looking for a team.  Interested in working on a web based project, maybe something involving health care but I\'m open to anything!  I have previous experience with nodejs, aws, express, mongo.. the basic MEAN stack.  This is my first hackathon so really looking forward to hacking with you guys!  let me know if you want to team up!',
      interests: [{ name: 'nodejs' }, { name: 'web app' }, { name: 'MEAN' }]
    },{
      info: 'Hey guys! A little late notice but I\'m looking for a team.  Interested in working on a web based project, maybe something involving health care but I\'m open to anything!  I have previous experience with nodejs, aws, express, mongo.. the basic MEAN stack.  This is my first hackathon so really looking forward to hacking with you guys!  let me know if you want to team up!',
      interests: [{ name: 'nodejs' }, { name: 'web app' }, { name: 'MEAN' }]
    },{
      info: 'Hey guys! A little late notice but I\'m looking for a team.  Interested in working on a web based project, maybe something involving health care but I\'m open to anything!  I have previous experience with nodejs, aws, express, mongo.. the basic MEAN stack.  This is my first hackathon so really looking forward to hacking with you guys!  let me know if you want to team up!',
      interests: [{ name: 'nodejs' }, { name: 'web app' }, { name: 'MEAN' }]
    },{
      info: 'Hey guys! A little late notice but I\'m looking for a team.  Interested in working on a web based project, maybe something involving health care but I\'m open to anything!  I have previous experience with nodejs, aws, express, mongo.. the basic MEAN stack.  This is my first hackathon so really looking forward to hacking with you guys!  let me know if you want to team up!',
      interests: [{ name: 'nodejs' }, { name: 'web app' }, { name: 'MEAN' }]
    }]
  }, {
    name: 'HackSC',
    info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.',
    date: new Date(2014, 10, 7)
  }, {
    name: 'RamHacks',
    info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html',
    date: new Date(2014, 10, 8),
    participants: [{
      info: 'Hey guys! A little late notice but I\'m looking for a team.  Interested in working on a web based project, maybe something involving health care but I\'m open to anything!  I have previous experience with nodejs, aws, express, mongo.. the basic MEAN stack.  This is my first hackathon so really looking forward to hacking with you guys!  let me know if you want to team up!',
      interests: [{ name: 'nodejs' }, { name: 'web app' }, { name: 'MEAN' }]
    }]
  },  {
    name: 'AppHack',
    info: 'Best practice client and server structures allow for more code reusability and maximum scalability',
    date: new Date(2014, 10, 14)
  },  {
    name: 'HackPrinceton',
    info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.',
    date: new Date(2014, 10, 14)
  },{
    name: 'HackDuke',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators',
    date: new Date(2014, 10, 15)
  },{
    name: 'PennApps',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators',
    date: new Date(2015, 0, 16)
  },{
    name: 'TreeHacks',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators',
    date: new Date(2015, 1, 20)
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});