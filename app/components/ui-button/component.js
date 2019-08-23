import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  clickAction: e => {
    e.preventDefault();
  },

  color: 'primary',
});
