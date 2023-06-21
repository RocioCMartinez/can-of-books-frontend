import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

class BookFormModal extends React.Component {
  

  handleBookSubmit = (event) => {
    event.preventDefault();
    let bookObj = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked
    }
    // this.props.createBook
    this.props.handleCloseModal();
    this.postBook(bookObj);
  }

  postBook = async (bookObj) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`;
      let createdBookfromDB = await axios.post(url, bookObj);

      // console.log(createdBookfromDB.data);
      this.setState({
        books: [...this.state.books, createdBookfromDB.data]
      })

    } catch (error) {
      console.log(error.message);
    }
  }

  

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>New Book Form</Modal.Title>
          </Modal.Header>

          <Form onSubmit={this.handleBookSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Book Description</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Check type="checkbox" label="Is it banned in Missouri?" />
            </Form.Group>
            <Button type="submit">Add Book</Button>
          </Form>


        </Modal >
      </>
    )
  }
}

export default BookFormModal;