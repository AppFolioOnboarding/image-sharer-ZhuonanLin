import React from 'react';
import { Alert, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { post } from '../utils/helper';
export default class FeedbackForm extends React.Component {
  name = '';
  comment = '';
  message = '';

  onSubmit = async () =>
    post('api/feedbacks', { name: this.name, comment: this.comment })
      .then((res) => {
        this.message = res.message;
        this.name = '';
        this.comment = '';
      })
      // eslint-disable-next-line no-return-assign
      .catch(res => this.message = res.data.message);

  setName = (name) => {
    this.name = name;
  }

  setComment = (comment) => {
    this.comment = comment;
  }

  render() {
    return (
      <div>
        <Alert color="light">
          {this.message}
        </Alert>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="Name">Your name:</Label>
                <Input type="text" name="name" id="Name" onChange={e => this.setName(e.target.value)} value={this.name} />
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="Comments">Comments:</Label>
                <Input type="textarea" name="comments" id="Comments" onChange={e => this.setComment(e.target.value)} value={this.comment} />
              </FormGroup>
            </Col>
          </Row>
          <Button color="primary" onClick={this.onSubmit}>Submit</Button>
        </Form>
      </div>
    );
  }
}
