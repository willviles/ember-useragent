import Ember from 'ember';

const { get, inject: { service } } = Ember;

export default Ember.Route.extend({

  userAgent: service(),

  setupController(controller) {
    controller.set('userAgent', get(this, 'userAgent'));

  }

});
