import React, { Component } from 'react'
import './index.css'
import Header from './components/header/Header'
import Table from './components/game/Table'
import { connect } from 'react-redux'
import { updateUser, apiRequest } from './Actions/UserActions'
import { bindActionCreators } from 'redux'
import { createSelector } from 'reselect'

class App extends Component {
  constructor (props) {
    super(props)

    this.onUpdateUser = this.onUpdateUser.bind(this)
  }

  onUpdateUser (event) {
    this.props.onUpdateUser(event.target.value)
  }

  render () {
    return (
      <div className="App">
        <Header />
        <Table />
        <input onChange={this.onUpdateUser} />
      </div>
    )
  }
}
const productsSelector = createSelector(
  state => state.products,
  products => products
)

const userSelector = createSelector(
  state => state.user,
  user => user
)

// ES6 syntax
// take state and return state.products
// take state and return state.user
// this last argument is a function that received the result of
// the two previous arguments and returns an object with products & users
const mapStateToProps = createSelector(
  productsSelector,
  userSelector,
  (products, user) => ({
    products,
    user
  })
)

const mapActionsToProps = {
  onUpdateUser: updateUser,
  onApiRequest: apiRequest
}

export default connect(mapStateToProps, mapActionsToProps)(App)
