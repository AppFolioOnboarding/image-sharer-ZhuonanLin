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
export default class FeedbackForm extends React.Component {
  name = '';
  comment = '';

      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="Comments">Comments:</Label>
          </FormGroup>
        </Col>
      </Row>
      <Button color="primary">Submit</Button>
    </Form>
  );
  setName = (name) => {
    this.name = name;
  }

  setComment = (comment) => {
    this.comment = comment;
  }
                <Input type="text" name="name" id="Name" onChange={e => this.setName(e.target.value)} value={this.name} />
                <Input type="textarea" name="comments" id="Comments" onChange={e => this.setComment(e.target.value)} value={this.comment} />
}
