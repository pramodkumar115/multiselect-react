# multiselect-react
React Library for Multiselect dropdown

# Installation
```
npm i @pramodkumar115/multiselect-react
```
Example
```
import React, { Component } from 'react'

import MultiSelect from 'multiselect-react'

export default class App extends Component {

  handleChange = (e) => {
    console.log(e)
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
    { id: 10, value: "Ten" }]
    return (
      <div style={{ padding: "10px", width: "400px" }}>
      <!-- By Default display field is considered to be value.-->
        <MultiSelect valueList={valueList} onChange={this.handleChange} />
        <!-- If you have array of objects where you want to change the displayField, you can do so as in below snippet. You can pass the selected values to preselect the values --> 
        <MultiSelect valueList={valueList} displayField="value" selectedValues={selectedValues} onChange={this.handleChange2} />
      </div>
    )
  }
}
```
