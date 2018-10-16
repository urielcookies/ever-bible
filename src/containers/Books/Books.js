import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchBooks, activeBook} from '../../actions/index';

import './books.css';
import {
    Card,
    Container,
    Header,
    Image,
    Icon,
} from 'semantic-ui-react'

class Books extends Component {
    constructor(props) {
        super(props);
        this.bookHandler = this.bookHandler.bind(this);
    }
    componentDidMount() {
        this.props.activeBook('');
        this.props.fetchBooks();
    }

    bookHandler(book) {
        this.props.activeBook(book);
        this.props.history.push(book);
    }
    
    render(){
        console.log('@BOOKS', this.props.statusBooks);
        return (
            <Container text style={{ marginTop: '7em' }}>
                {this.props.statusBooks.books.length &&
                    <Card.Group itemsPerRow={3}>
                        {this.props.statusBooks.books.map(book => {
                            return (
                                <Card key={book.id} onClick={(() => this.bookHandler(book.book))} >
                                    <Image src={book.location} />
                                    <Card.Content className='nameOverflow'>
                                        <span>{book.book}</span>
                                    </Card.Content>
                                </Card>
                            )
                        })}
                    </Card.Group>
                }
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    "statusBooks": state.books
})

export default connect(mapStateToProps, {fetchBooks, activeBook})(Books);