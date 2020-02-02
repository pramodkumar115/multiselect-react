/**
 * @class MultiSelect
 */

import * as React from 'react'
import styles from './styles.css'

export type Props = { valueList: any[], displayField: string, selectedValues?: any[], onChange: Function }
export type State = { items: any[], filterInput: string, 
  selectedValues: Set<any>, currentFocus: number }
export default class MultiSelect extends React.Component<Props, State> {
  public static defaultProps = {
    displayField: "value"
};

  private dropdownRef = React.createRef<HTMLDivElement>()
  private wrapperRef = React.createRef<HTMLDivElement>()
  private dropdownSearchRef = React.createRef<HTMLInputElement>()

  constructor(props: Props) {
    super(props);
    let selectedValues = new Set<any>()
    if(props.selectedValues != null) {
      props.selectedValues.forEach(s => {
          props.valueList.forEach(v => {
            if(v[props.displayField] === s[props.displayField]) {
              selectedValues.add(v);
            }
          })

      })
    }
    console.log("selectedValueList::", selectedValues);
    this.state = {
      items: selectedValues.size > 0 ? 
      this.props.valueList.filter(i => !selectedValues.has(i)): this.props.valueList,
      filterInput: "",
      selectedValues:  selectedValues,
      currentFocus: -1
    }
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('keydown', this.handleKeyboardEvent);
    document.addEventListener("focus", this.onFocus);
    //document.addEventListener('keyup', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyboardEvent);
    document.removeEventListener("focus", this.onFocus);
  }
  onFocus = (event: any) => {
    console.log("On focus", event);
  }
  handleKeyboardEvent = (event: KeyboardEvent) => {
    if (this.wrapperRef && (this.wrapperRef as any).current.contains(event.target)) {
      let scrollTop = 0
      if(this.dropdownRef && this.dropdownRef.current)
      scrollTop = this.dropdownRef.current.scrollTop
      if (event.keyCode == 40) {
        this.state.currentFocus < this.state.items.length - 1 && this.setState({ currentFocus: this.state.currentFocus + 1 })
        if(this.dropdownRef && this.dropdownRef.current && this.state.currentFocus >= 9)
        this.dropdownRef.current.scrollTop = scrollTop + 53
      }
      else if (event.keyCode == 38) {
        this.state.currentFocus > -1 && this.setState({ currentFocus: this.state.currentFocus - 1 })
        if(this.dropdownRef && this.dropdownRef.current && this.state.currentFocus <= 9)
        this.dropdownRef.current.scrollTop = scrollTop - 53
      }
      else if (event.keyCode == 27) {
        const node = this.dropdownRef.current
        node != null && node.classList.contains(styles.active) && node.classList.remove(styles.active)
      }
      else if (event.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        event.preventDefault();
        if (this.state.currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          this.selectItem(this.state.items[this.state.currentFocus]);
        }
      }
      this.handleClick()
    } else {
      this.handleClickOutside(event)
    }
  }
  handleClick = () => {
    const node = this.dropdownRef.current;
    node != null && !node.classList.contains(styles.active) &&
    node.classList.add(styles.active)
    this.dropdownSearchRef && this.dropdownSearchRef.current 
    && this.dropdownSearchRef.current.focus()
  };
  handleClickOutside = (event: any) => {
    if (this.wrapperRef && !(this.wrapperRef as any).current.contains(event.target)) {
      const node = this.dropdownRef.current
      node != null && node.classList.contains(styles.active) && node.classList.remove(styles.active)
    }
  }
  filterRecords = (e: React.KeyboardEvent | React.MouseEvent | React.ChangeEvent) => {
    const value = ((e.target) as any).value
    const valueList = this.state.selectedValues.size > 0 ? 
    this.props.valueList.filter(i => !this.state.selectedValues.has(i))
    : this.props.valueList
    if (this.state.filterInput != value) {
      this.setState({currentFocus: -1})
      this.setState({
        filterInput: value
      }, () => {
        if (this.state.filterInput != null) {
          this.setState({
            items: valueList.filter(v =>
              (v[this.props.displayField] as string)
                .toLowerCase()
                .indexOf(this.state.filterInput.toLowerCase()) != -1)
          })
        } else {
          console.log("this.state.selectedValues::", this.state.selectedValues)
          console.log("this.props.valueList::", this.props.valueList)
          this.setState({
            items: valueList
          })
        }
      })
    }
  }
  selectItem = (selected: any) => {
    const { selectedValues } = this.state;
    selectedValues.add(selected)
    this.setState({
      selectedValues: selectedValues,
      items: this.props.valueList.filter(i => !selectedValues.has(i))
    }, this.props.onChange(Array.from(this.state.selectedValues)));
    this.setState({currentFocus: -1})
  }
  removeItem = (selected: any) => {
    const { selectedValues } = this.state;
    selectedValues.delete(selected)
    this.setState({
      selectedValues: selectedValues,
      items: this.props.valueList.filter(i => !selectedValues.has(i))
    }, this.props.onChange(Array.from(this.state.selectedValues)));
  }
  render() {
    return (
      <div className={styles.multiSelect} ref={this.wrapperRef}>
        <input style={{opacity: 0, position: "absolute"}}></input>
        <div className={styles.multiSelectBox} onClick={this.handleClick} >
          <div className={styles.multiSelectBoxContents}>
            {this.state.selectedValues != null &&
              Array.from(this.state.selectedValues).map((v, index) =>
                <div className={styles.multiSelectBoxContentItem} key={`msv_${index}`}>
                  <span>{v[this.props.displayField]}</span>
                  <label style={{ cursor: "pointer" }} onClick={() => this.removeItem(v)}>&#9938;</label>
                </div>)}
          </div>
          <span className={styles.multiSelectArrow}>&#11206;</span>
        </div>
        <div className={styles.multiSelectItems} ref={this.dropdownRef}>
          <ul>
            <li><input type="search" placeholder="Search" ref={this.dropdownSearchRef}
              onKeyUp={this.filterRecords} onChange={this.filterRecords}/></li>
            {this.state.items.map((v, key) =>
              <li className={key === this.state.currentFocus ? styles.multiSelectItemfocus : ""}
                key={`ms_${key}`} onClick={() => this.selectItem(v)}>
                {v[this.props.displayField]}
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}
