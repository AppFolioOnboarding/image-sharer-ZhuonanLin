/* eslint-env mocha */

import assert from 'assert';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';

import * as helper from '../../utils/helper';
import FeedbackForm from '../../components/FeedbackForm';

describe('<FeedbackForm />', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('should render feedback form correctly', () => {
    const wrapper = shallow(<FeedbackForm />);

    const form = wrapper.find('Form');
    assert.strictEqual(form.length, 1);

    const rows = form.find('Row');
    assert.strictEqual(rows.length, 2);

    const name = rows.at(0);
    assert.strictEqual(name.find('Label').children().text(), 'Your name:');
    assert.strictEqual(name.find('Input').length, 1);

    const comments = rows.at(1);
    assert.strictEqual(comments.find('Label').children().text(), 'Comments:');
    assert.strictEqual(comments.find('Input').length, 1);
  });

  it('should render the message correctly', () => {
    const wrapper = shallow(<FeedbackForm />);
    wrapper.instance().message = 'message';
    const alert = wrapper.find('Alert');

    assert.strictEqual(alert.length, 1);
    assert.strictEqual(alert.children().text(), 'message');gi
  });

  it('should submit feedback onclick', () => {
    const wrapper = shallow(<FeedbackForm />);
    const button = wrapper.find('Button');
    const postStub = sandbox.stub(helper, 'post').resolves({ message: 'Successfully create the feedback!' });

    button.simulate('click');

    assert(postStub.calledOnce);
  });

  it('should record and set name and comment input change correctly!', () => {
    const wrapper = shallow(<FeedbackForm />);
    let nameInput = wrapper.find('Input').at(0);
    let commentInput = wrapper.find('Input').at(1);

    nameInput.simulate('change', { target: { value: 'name' } });
    commentInput.simulate('change', { target: { value: 'comment' } });
    wrapper.update();

    nameInput = wrapper.find('Input').at(0);
    commentInput = wrapper.find('Input').at(1);

    assert.strictEqual(nameInput.prop('value'), 'name');
    assert.strictEqual(commentInput.prop('value'), 'comment');
  });

  describe('setName', () => {
    it('should set correctly', () => {
      const wrapper = shallow(<FeedbackForm />);
      wrapper.instance().setName('name');

      assert.strictEqual(wrapper.instance().name, 'name');
    });
  });

  describe('setComment', () => {
    it('should set correctly', () => {
      const wrapper = shallow(<FeedbackForm />);
      wrapper.instance().setComment('comment');

      assert.strictEqual(wrapper.instance().comment, 'comment');
    });
  });

  describe('onSubmit', () => {
    let wrapper; let button;

    beforeEach(() => {
      wrapper = shallow(<FeedbackForm />);
      button = wrapper.find('Button');
      wrapper.instance().setName('name');
      wrapper.instance().setComment('comment');
    });

    it('should submit successfully', async () => {
      const postStub = sandbox.stub(helper, 'post').resolves({ message: 'Successfully create the feedback!' });

      await button.prop('onClick')();

      assert(postStub.calledWith('api/feedbacks', { name: 'name', comment: 'comment' }));
      assert.strictEqual(wrapper.instance().message, 'Successfully create the feedback!');
      assert.strictEqual(wrapper.instance().name, '');
      assert.strictEqual(wrapper.instance().comment, '');
    });

    it('should submit failure', async () => {
      const postStub = sandbox.stub(helper, 'post').rejects({ data: { message: 'Feedback creation failed!' } });

      await button.prop('onClick')();

      assert(postStub.calledWith('api/feedbacks', { name: 'name', comment: 'comment' }));
      assert.strictEqual(wrapper.instance().message, 'Feedback creation failed!');
    });
  });
});
