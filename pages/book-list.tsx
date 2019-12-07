import React, { FC } from 'react'
import styled from 'styled-components'
import { Heading, Text, FontStyle } from 'styled-typography'

import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'

enum Category {
  SciFi = "Science Fiction",
  Fan = "Fantasy"
}

interface Book {
  title:  string
  author: string
  categories: Category[],
  series?: boolean
}

const BOOKS: Book[] = [
  {
    title: 'Mistborn',
    author: 'Brandon Sanderson',
    categories: [Category.Fan],
    series: true
  },
  {
    title: 'Red Rising Saga',
    author: 'Pierce Brown',
    categories: [Category.SciFi],
    series: true
  },
  {
    title: 'Stormlight Chronicles',
    author: 'Brandon Sanderson',
    categories: [Category.SciFi],
    series: true
  },
  {
    title: 'Elantris',
    author: 'Brandon Sanderson',
    categories: [Category.SciFi]
  },
  {
    title: 'A Song of Ice and Fire',
    author: 'George R. R. Martin',
    categories: [Category.Fan],
    series: true

  },
  {
    title: 'Old Man\'s War',
    author: 'Joe Scalzi',
    categories: [Category.SciFi],
  },
  {
    title: 'Kingkiller Chronicle',
    author: 'Patrick Rothfuss',
    categories: [Category.Fan],
    series: true
  },
  {
    title: 'Gentleman Bastard',
    author: 'Scott Lynch',
    categories: [Category.Fan],
    series: true
  },
  {
    title: 'Harry Potter',
    author: 'JK Rowling',
    categories: [Category.Fan],
    series: true
  }
]

const BookList = styled.ul``
const BookItem = styled.li`
  padding: 10px 0;
`
const SeriesIcon = styled.span`
  display: inline-block;
  margin-left: 5px;
  padding:4px 4px 3px;
  font-size: 0.5rem;
  line-height: 1;
  background-color: red;
  font-weight: bold;
  color: white;
  border-radius: 2px;

  transform: translateY(-5px);

`
const Book: FC<Book> = ({ title, author, categories, series = false }) => (
  <BookItem>
    <Text>{title}
      {series && <SeriesIcon>S</SeriesIcon>}
    </Text>
    <Text fontStyle={FontStyle.Italic} level={5}>{author}</Text>
    <Text level={5}>{categories.toString().split(',').join(', ')}</Text>
  </BookItem>
)

export default () => (
  <Layout>
    <Wrapper>
      <Heading level={2}>Book List</Heading>
      <BookList>
        {BOOKS.map(b => <Book key={b.title} {...b} />)}
      </BookList>
    </Wrapper>
  </Layout>
)