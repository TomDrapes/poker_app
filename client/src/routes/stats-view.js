import React, { Component } from 'react'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import BarChart from '../components/charts/BarChart'
import { range as d3Range } from "d3"
import axios from 'axios'
import './style.css'


export default class StatsView extends Component {

  state = {
    data: d3Range(0),
    currentIndex: null,
    waiting: false
  }

  componentDidMount(){
    axios.interceptors.request.use(function (config) {
      config.metadata = { startTime: new Date()}
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
      response.config.metadata.endTime = new Date()
      response.duration = response.config.metadata.endTime - response.config.metadata.startTime
      return response;
    }, function (error) {
      return Promise.reject(error);
    });

    this.checkResponseTime()
  }

  componentDidUpdate(){
    if(!this.state.waiting){
      setTimeout(() => {
        this.checkResponseTime()
      }, 3000)
    }
  }

  checkResponseTime(){
    this.setState({ waiting: true })
    axios.get(`/api/gamestate`)
      .then((res) => {
        this.addData(res.duration)
        this.setState({ waiting: false })
      })
  }

  addData = (data) => {
    this.setState({
      data: [...this.state.data, data]
    })
  }

  setCurrentIndex = currentIndex => {
    this.setState({ currentIndex })
  }

  average(a, b) {
    return a + b
  }

  render(){
    const { data, currentIndex } = this.state
    let avg = data.reduce(this.average, 0)/data.length

    return(
      <MuiThemeProvider>
        <div className="statsView">
          <h1>Real-time API response times</h1>
          <p>
            Average: {Math.round(avg)}ms
            <br />
            <small>{currentIndex !== null && data[currentIndex]}</small>
          </p>
          <div className="barchart">
            <svg width="1080" height="500">
              <BarChart
                data={data}
                width={1080}
                height={500}
                x={0}
                y={0}
                highlightBar={this.setCurrentIndex}
                highlightedBar={currentIndex}
              />
            </svg>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
