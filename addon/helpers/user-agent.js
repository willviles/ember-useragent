import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Helper.extend({
  userAgent: service(),

  compute([prop]) {
    return get(this, `userAgent.${prop}`);
  }
});
