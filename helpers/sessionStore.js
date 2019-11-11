
    var Session, noop,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
      __hasProp = {}.hasOwnProperty;
  
    Session = require('../models/session');
  
    noop = function() {};
  
    module.exports = function(connect) {
      var SessionStore;
      return SessionStore = (function(_super) {
        __extends(SessionStore, _super);
  
        function SessionStore() {
          return SessionStore.__super__.constructor.apply(this, arguments);
        }
  
        SessionStore.prototype.get = function(_id, cb) {
          return Session.findById(_id).lean().exec(function(err, session) {
            if (err) {
              return cb(err);
            }
            return cb(null, session != null ? session.data : void 0);
          });
        };
  
        SessionStore.prototype.set = function(_id, data, cb) {
          if (cb == null) {
            cb = noop;
          }
          if (!data) {
            return Session.remove({
              _id: _id
            }, cb);
          }
          return Session.update({
            _id: _id
          }, {
            data: data,
            usedAt: new Date
          }, {
            upsert: true
          }, cb);
        };
  
        SessionStore.prototype.destroy = function(_id, cb) {
          if (cb == null) {
            cb = noop;
          }
          return Session.remove({
            _id: _id
          }, cb);
        };
  
        return SessionStore;
  
      })(connect.session.Store);
    };