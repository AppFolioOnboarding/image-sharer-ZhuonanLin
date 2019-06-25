/* eslint-env mocha */

import assert from 'assert';
import { shallow } from 'enzyme';
import React from 'react';

import FeedbackForm from '../../components/FeedbackForm';

describe('<FeedbackForm />', () => {
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
});
