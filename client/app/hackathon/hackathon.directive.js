'use strict';

angular.module('habuwiApp')
.directive('buttonParticipantHack', ['Hackathons', function(Hackathons) {
  return {
    restrict: 'A',
    scope: {

    },
    template: '<button class="btn {{btn.class}}" role="button"><span class="glyphicon {{btn.icon}}"></span>{{btn.text}}</button>',
    link: function(scope, element, attr) {
      var game = scope.game,
          user = scope.user;
      scope.btn = {};
      scope.btn.class = 'btn-success';
      scope.btn.icon = 'glyphicon-plus'
      scope.btn.text = 'Join game';
      scope.inGame = false;

      return element.bind({
        mouseenter: function() {
          if(scope.inGame) {
            scope.$apply(function() {
              scope.btn.class = 'btn-danger';
              scope.btn.icon = 'glyphicon-remove';
              scope.btn.text = 'Leave game';
            });
          }
        },
        mouseleave: function() {
          if(scope.inGame) {
            scope.$apply(function() {
              scope.btn.class = 'btn-success';
              scope.btn.icon = 'glyphicon-ok';
              scope.btn.text = 'In game';
            });
          }
        },
        click: function() {
          if(scope.inGame) {
            Games.removePlayer(game._id, user._id).then(function(res) {
              if(res && !res.error) {
                toaster.pop('success', 'Left game', 'You just left ' + scope.game.title);
                scope.inGame = false;
                scope.btn.class = 'btn-success';
                scope.btn.icon = 'glyphicon-plus';
                scope.btn.text = 'Join game';
                scope.game.players.splice(scope.game.players.indexOf(user), 1);
              } else {
                toaster.pop('error', 'Oops! There was an issue', res.error.message);
              }
            });
          } else {
            Games.addPlayer(game._id, user._id).then(function(res) {
              if(res && !res.error) {
                toaster.pop('success', 'Great success! Joined game', 'You just joined ' + scope.game.title);
                scope.inGame = true;
                scope.btn.class = 'btn-success';
                scope.btn.icon = 'glyphicon-ok';
                scope.btn.text = 'In game';
                scope.game.players.push(user);
              } else {
                toaster.pop('error', 'Oops! There was an issue', res.error.message);
              }
            });
          }
        }
      });
    }
  }
}]);

angular.module('habuwiApp')
.directive('buttonHackathonParticipate', ['$state', 'Hackathons', 'User', 'Auth', function($state, Hackathons, User, Auth) {
  return {
    restrict: 'A',
    scope: {
      user: '=',
      hackathon: '='
    },
    template: '<button class="btn {{hackathon.btn.class}}" role="button">{{hackathon.btn.text}}</button>',
    link: function(scope, element, attr) {
      var hackathon = scope.hackathon,
          user = scope.user;
      scope.hackathon.btn = {};
      scope.hackathon.btn.class = 'btn-default';
      scope.hackathon.btn.text = 'Participate';
      scope.hackathon.participating = false;

      if(Auth.isLoggedIn()) {
        user.hackathons.forEach(function(result) {
          if(result.hackathon == hackathon._id) {
            scope.hackathon.participating = true;
            scope.hackathon.btn.class = 'btn-success';
            scope.hackathon.btn.text = 'Participating';
          }
        });
      }

      return element.bind({
        mouseenter: function() {
          if(scope.hackathon.participating) {
            scope.$apply(function() {
              scope.hackathon.btn.class = 'btn-danger';
              scope.hackathon.btn.text = 'Leave';
            });
          }
        },
        mouseleave: function() {
          if(scope.hackathon.participating) {
            scope.$apply(function() {
              scope.hackathon.btn.class = 'btn-success';
              scope.hackathon.btn.text = 'Participating';
            });
          }
        },
        click: function() {
          if(scope.hackathon.participating) {
            Hackathons.removeParticipant(hackathon._id, user._id).then(function(res) {
              if(res && !res.error) {
                scope.hackathon.participating = false;
                scope.hackathon.btn.class = 'btn-default';
                scope.hackathon.btn.text = 'Participate';
                scope.hackathon.participants.splice(scope.hackathon.participants.indexOf(user), 1);
              }
            });
          } else {
            $state.go('hackathons.page.join', { id: hackathon._id });
          }
        }
      });
    }
  }
}]);

angular.module('habuwiApp')
.directive('hackathonParticipant', ['$state', 'Hackathons', 'User', 'Auth', function($state, Hackathons, User, Auth) {
  return {
    restrict: 'A',
    scope: {
      user: '=',
      participant: '=',
      hackathon: '='
    },
    templateUrl: 'app/hackathon/views/directive-participant.html',
    link: function(scope, element, attr) {
      var user = scope.user,
          participant = scope.participant,
          hackathon = scope.hackathon;
    }
  }
}]);

angular.module('habuwiApp')
.directive('hackathonTeam', ['$state', 'Hackathons', 'User', 'Auth', function($state, Hackathons, User, Auth) {
  return {
    restrict: 'A',
    scope: {
      team: '=',
      hackathon: '='
    },
    templateUrl: 'app/hackathon/views/directive-team.html',
    link: function(scope, element, attr) {
      var team = scope.team,
          hackathon = scope.hackathon;
    }
  }
}]);

angular.module('habuwiApp')
.directive('buttonProspect', ['$state', 'Hackathons', 'User', 'Auth', function($state, Hackathons, User, Auth) {
  if(!Auth.isLoggedIn()) { return; }
  return {
    restrict: 'A',
    scope: {
      user: '=',
      participant: '=',
      hackathon: '='
    },
    template: '<button class="btn btn-prospect {{user.btn.class}}" role="button">{{user.btn.text}}</button>',
    link: function(scope, element, attr) {
      var user = scope.user,
          participant = scope.participant,
          hackathon = scope.user.hackathon;
      scope.user.btn = {};
      scope.user.btn.class = 'btn-default';
      scope.user.btn.text = 'Prospect';
      scope.user.prospected = false;

      // Check if already shown interest
      user.hackathon.prospects.forEach(function(result) {
        if(result == participant._id) {
          console.log('match ' + result);
          scope.user.prospected = true;
          scope.user.btn.text = 'Prospected';
        }
      });

      return element.bind({
        mouseenter: function() {
          if(scope.user.prospected) {
            scope.$apply(function() {
              scope.user.btn.class = 'btn-warning';
              scope.user.btn.text = 'Whoops';
            });
          }
        },
        mouseleave: function() {
          if(scope.user.prospected) {
            scope.$apply(function() {
              scope.user.btn.class = 'btn-disabled';
              scope.user.btn.text = 'Prospected';
            });
          }
        },
        click: function() {
          if(!scope.user.prospected) {
            Hackathons.addProspect(hackathon._id, participant._id, user).then(function(res) {
              if(res && !res.error) {
                scope.user.prospected = false;
                scope.user.btn.class = 'btn-default';
                scope.user.btn.text = 'Prospect';
              }
            });
          } else {
            Hackathons.removeProspect(hackathon._id, participant._id, user).then(function(res) {
              if(res && !res.error) {
                scope.user.prospected = true;
                scope.user.btn.class = 'btn-default';
                scope.user.btn.text = 'Prospected';
              }
            });
          }
        }
      });
    }
  }
}]);