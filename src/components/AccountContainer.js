import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'
import Sort from './Sort';
// import {transactions} from '../transactionsData'

class AccountContainer extends Component {

  constructor() {
    super()

      this.state = { 
        transactions: [],
        searchTerm: "" ,
        sortChoice: ""
    }
  }
    // get a default state working with the data imported from TransactionsData
    // use this to get the functionality working
    // then replace the default transactions with a call to the API

    componentDidMount() {
      fetch("https://boiling-brook-94902.herokuapp.com/transactions")
      .then(resp => resp.json())
      .then(data => this.setState({
        transactions: data
      }))
    }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  filterTransactionsBySearchTerm = () => {
    return this.state.transactions.filter(transaction => {
      return transaction.description.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || transaction.category.toLowerCase().includes(this.state.searchTerm.toLowerCase()) 
    })
  }

  changeSortChoice = (event) => {
    this.setState({ sortChoice: event.target.value})
  }

  sortTransactionsBySortChoice = () => {
    return this.filterTransactionsBySearchTerm().sort((trA, trB) => {
      if (this.state.sortChoice === "Alphabetically") {return trA.category.toLowerCase().localeCompare(trB.category.toLowerCase())}
      if (this.state.sortChoice === "Amount") {return trA.amount - trB.amount }
    })
  }

  render() {

    return (
      <div>
        <Search searchTerm={this.state.searchTerm} handleChange={this.handleChange}/>
        <Sort sortChoice={this.state.sortChoice} handleChange={this.changeSortChoice}/>
        <TransactionsList transactions={this.sortTransactionsBySortChoice()}/>
      </div>
    )
  }
}

export default AccountContainer
