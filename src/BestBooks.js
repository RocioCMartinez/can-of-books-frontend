import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import './App.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books:[]
    }
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

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length > 0? (
          <div className='carousel_container'>
            <Carousel>
              {this.state.books.map((book, index) => {
                return <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={require(`./imgs/${book._id}.jpg`)}
                alt={book.title}
                />
              <Carousel.Caption>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
    })}
            </Carousel>
          </div>
        ) : (
          <h3>No Books Found :</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
