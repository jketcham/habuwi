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
    url: 'http://yhack.org'
  }, {
    name: 'HackSC',
    info: 'HackSC is the premier hackathon hosted at the University of Southern California. We aim to empower hackers to learn and explore new technologies through hands-on development and experience.',
    date: new Date(2014, 10, 7)
  }, {
    name: 'RamHacks',
    info: 'RamHacks is a 24-hour programming marathon for innovative developers to design and implement a software or hardware application of their choosing. RamHacks gives the most creative programmers and hackers in the region a chance to make something together. The Department of Computer Science and Ram Development at VCU are hosting this hackathon to ignite the spirit of these individuals by providing a competition with no creative boundaries.',
    date: new Date(2014, 10, 8)
  },  {
    name: 'AppHack',
    info: 'AppHack is part of a shared effort to increase tech entrepreneurship, tech savviness, and code literacy wordwide. At Apphack, teams of students get involved in the software development process in whichever way that they can contribute.',
    date: new Date(2014, 10, 14)
  },  {
    name: 'HackPrinceton',
    info: 'HackPrinceton is your time to make something new, to explore that ambitious craving in your head, and to step outside your comfort zone. ',
    date: new Date(2014, 10, 14)
  },{
    name: 'HackDuke',
    info: 'HackDuke is not just about building meaningful projects. It\'s also an open forum to discuss, share and bring to life ideas that aim to make a positive impact on social issues. Look forward to working with experts from non-profits and coding alongside mentors from tech companies!',
    date: new Date(2014, 10, 15)
  },{
    name: 'PennApps',
    info: 'PennApps is the premier student-run college hackathon. More than a thousand student programmers from all over the world converge on Philadelphia twice a year for a weekend of creating and learning. Hackathons are about coding together to solve real-world problems.',
    date: new Date(2015, 0, 16)
  },{
    name: 'TreeHacks',
    info: 'TreeHacks is now Stanford’s official hackathon and is scheduled for February 20th-22nd this winter!',
    date: new Date(2015, 1, 20)
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Joe Cool',
    bio: 'Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
    school: 'Yale University',
    skills: ['front end', 'AWS', 'UX/UI'],
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Ash Williams',
    bio: 'Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
    school: 'Arizona State University',
    skills: ['nodejs', 'AWS', 'Full stack'],
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});