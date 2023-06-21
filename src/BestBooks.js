import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal'

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books:[],
      showModal: false
    }
  }

  handleOpenModal = () => {
  
    this.setState({
      showModal: true,
  
    })
  }
  
  handleCloseModal = () => {
    this.setState({
      showModal: false
    })
  }

  

  getAllBooks = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`

      let booksFromDB = await axios.get(url);
      this.setState({
        books: booksFromDB.data
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    this.getAllBooks();
  }

  deleteBook = async (id) => {
    try {

      let url = `${process.env.REACT_APP_SERVER}/books/${id}`;

      await axios.delete(url);

      let updatedBooks = this.state.books.filter(book => book._id !== id);

      this.setState({
        books: updatedBooks
      })

    } catch (error) {
      console.log(error.message)
      
    }
  }

  

  render() {

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Carousel>
          {this.state.books.length > 0 ? (
            this.state.books.map((book, index) => (
              <Carousel.Item key={index}>
                <Card className="books-card">
                  <Card.Img src={book.image} alt={book.title} />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                      Description: {book.description}
                    </Card.Text>
                    {/* <Card.Text>
                      Banned in Missouri: {book.status}
                    </Card.Text> */}
                  </Card.Body>
                  <Button onClick={ () => this.deleteBook(this.state.books._id)}> Delete </Button>
                </Card>
              </Carousel.Item>
            ))
          ) : (
            <h3>No Books Found :</h3>
          )}
        </Carousel>
        <Button type='submit' onClick={this.handleOpenModal}> Add Book! </Button>
        {this.state.showModal && (
        <BookFormModal 
        show={this.state.showModal} handleCloseModal={this.handleCloseModal} 
        />)}
      </>
    );
  }
}

export default BestBooks;
