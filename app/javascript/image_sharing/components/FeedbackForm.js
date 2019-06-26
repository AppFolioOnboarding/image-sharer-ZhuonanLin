import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

  return (
    <Form>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Input type="text" name="name" id="Name" />
          </FormGroup>
        </Col>
      </Row>
import { post } from '../utils/helper';
export default class FeedbackForm extends React.Component {
  name = '';
  comment = '';
  message = '';

      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="Comments">Comments:</Label>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
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
                <Input type="text" name="name" id="Name" onChange={e => this.setName(e.target.value)} value={this.name} />
                <Input type="textarea" name="comments" id="Comments" onChange={e => this.setComment(e.target.value)} value={this.comment} />
          <Button color="primary" onClick={this.onSubmit}>Submit</Button>
}
