# multiselect-react
React Library for Multiselect dropdown

Example
```
import React, { Component } from 'react'

import MultiSelect from 'multiselect-react-material'

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
    return (
      <div style={{ padding: "10px", width: "400px" }}>
      <!-- By Default display field is considered to be value.-->
        <MultiSelect valueList={valueList} onChange={this.handleChange} />
        <!-- If you have array of objects where you want to change the displayField, you can do so as in below snippet --> 
        <MultiSelect valueList={valueList} displayField="value" onChange={this.handleChange2} />
      </div>
    )
  }
}
```
