'use strict';

var Q = require('q');

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            var versionStr = "Welcome to Oh So Swift 0.1, Stud."
            reply({ message: versionStr });
        }
    });

    server.route({
        method: 'GET',
        path: '/steps',
        handler: function (request, reply) {
          var params = {};
          getStepsData(params).then(function(res){
            handler(reply, res)
          });
        }
    });

    server.route({
        method: 'GET',
        path: '/users/{id?}',
        handler: function (request, reply) {
            getUsers(request.params.id).then(function(res){
              handler(reply, res)
            });
        }
    });

    next();
};

function handler(reply, result){
    reply({data:result});
}

function getStepsData(params){
  var def = Q.defer();

  var data = [
    {
      user: 1,
      steps: 5
    },
    {
      user: 34,
      steps: 500
    },
    {
      user: 3,
      steps: 503838
    },
  ]

  def.resolve(data);

  return def.promise;
}

function getUsers(id){
  var def = Q.defer();

  var data = [
    {
      id: 1,
      name: 'Chilled',
      gender: 'm',
      age: 20,
      location: '27502'
    },
    {
      id: 3,
      name: 'nanners',
      gender: 'm',
      age: 31,
      location: '27502'
    },
    {
      id: 34,
      name: 'Diction',
      gender: 'm',
      age: 43,
      location: '27502'
    },
  ]

  if(id){
    def.resolve(data[0]);
  } else {
    def.resolve(data);
  }

  return def.promise;
}

exports.register.attributes = {
    name: 'api'
};
