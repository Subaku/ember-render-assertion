import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { task, timeout } from "ember-concurrency";


export default class IndexController extends Controller {
  queryParams = [
    'paramOne',
  ]

  paramOne = null;

  @computed('paramOne')
  get selectedParam() {
    // Comment this line out and it'll work.
    this.testTask.perform();
    return this.paramOne;
  }

  set selectedParam(param) {
    this.set('paramOne', param);
  }


  @computed('testTask.last.value.[]')
  get selections() {
    return this.testTask.last ? this.testTask.last.value : null;
  }

  /***** Tasks ******/

  @task(function* () {
    yield timeout(2000);
    return [1, 3, 7];
  }) testTask;
}
