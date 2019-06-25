import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function FeedbackForm() {
  return (
    <Form>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="Name">Your name:</Label>
            <Input type="text" name="name" id="Name" />
          </FormGroup>
        </Col>
      </Row>

      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="Comments">Comments:</Label>
            <Input type="textarea" name="comments" id="Comments" />
          </FormGroup>
        </Col>
      </Row>
      <Button color="primary">Submit</Button>
    </Form>
  );
}
