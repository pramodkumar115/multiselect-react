import React, { Component } from 'react'

import MultiSelect from 'multiselect-react'

export default class App extends Component {

  handleChange = (e) => {
    console.log(e)
  }
  handleChange2  = (e) => {
    console.log("2: ", e)
  }
  render() {
    const valueList = [{ id: 1, value: "One" },
    { id: 2, value: "Two" },
    { id: 3, value: "Three" },
    { id: 4, value: "Four" },
    { id: 5, value: "Five" },
    { id: 6, value: "Six" },
    { id: 7, value: "Seven" },
    { id: 8, value: "Eight" },
    { id: 9, value: "Nine" },
    { id: 10, value: "Ten" }]
    const selectedValues = [{ id: 8, value: "Eight" },
    { id: 9, value: "Nine" },
    { id: 10, value: "Ten" }];
    return (

      <div style={{ padding: "10px" }}>
        <input type="text"></input>
        <MultiSelect valueList={valueList} onChange={this.handleChange} />
        <input type="text"></input>
        <MultiSelect valueList={valueList} displayField="value" selectedValues={selectedValues} onChange={this.handleChange2} />
        <div>Hello</div>
      </div>
    )
  }
}
