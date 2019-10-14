import React, { Component } from 'react';
import '../assets/App.css';
import { Collapse } from '@material-ui/core';
import Dictionary from '../components/Dictionary';

let dictionaries = [
  {'id': 1, 'name':'Hexadecimal Colour dictionary', 'dictionary':
    [
      {'id': 1, 'domain': "Black", 'range': "#000000"},
      {'id': 2, 'domain': "White", 'range': "#FFFFFF"},
      {'id': 3, 'domain': "Red", 'range': "#FF0000"},
      {'id': 4, 'domain': "Green", 'range': "00FF00"},
      {'id': 5, 'domain': "Blue", 'range': "0000FF"},
      {'id': 6, 'domain': "Cyan", 'range': "00FFFF"},
      {'id': 7, 'domain': "Magenta", 'range': "FF00FF"},
      {'id': 8, 'domain': "Silver", 'range': "C0C0C0"},
      {'id': 9, 'domain': "Grey", 'range': "808080"},
      {'id': 10, 'domain': "Garnet", 'range': "800000"},
      {'id': 11, 'domain': "Olive", 'range': "808000"},
      {'id': 12, 'domain': "Dark Green", 'range': "008000"},
      {'id': 13, 'domain': "Purple", 'range': "800080"},
      {'id': 14, 'domain': "Turquoise", 'range': "008080"},
      {'id': 15, 'domain': "Dark Blue", 'range': "000080"}
    ]
  },
  {'id': 2, 'name':'Hexadecimal Colour dictionary 2', 'dictionary':
    [
      {'id': 1, 'domain': "Black", 'range': "000000"},
      {'id': 2, 'domain': "White", 'range': "FFFFFF"},
      {'id': 3, 'domain': "Red", 'range': "FF0000"},
      {'id': 4, 'domain': "Green", 'range': "00FF00"},
      {'id': 5, 'domain': "Blue", 'range': "0000FF"},
      {'id': 6, 'domain': "Cyan", 'range': "00FFFF"},
      {'id': 7, 'domain': "Magenta", 'range': "FF00FF"},
      {'id': 8, 'domain': "Silver", 'range': "C0C0C0"},
      {'id': 9, 'domain': "Grey", 'range': "808080"},
      {'id': 10, 'domain': "Garnet", 'range': "800000"},
      {'id': 11, 'domain': "Olive", 'range': "808000"},
      {'id': 12, 'domain': "Dark Green", 'range': "008500"},
      {'id': 13, 'domain': "Dark Green", 'range': "008000"},
      {'id': 14, 'domain': "Purple", 'range': "800080"},
      {'id': 15, 'domain': "Turquoise", 'range': "008080"},
      {'id': 16, 'domain': "Dark Blue", 'range': "000080"},
      {'id': 17, 'domain': "Dark Blue", 'range': "000080"}
    ]
  },
  {'id': 1, 'name':'Hexadecimal Colour dictionary 3', 'dictionary':
    [
      {'id': 1, 'domain': "Black", 'range': "#000000"},
      {'id': 2, 'domain': "White", 'range': "#FFFFFF"},
      {'id': 3, 'domain': "Red", 'range': "#FF0000"},
      {'id': 4, 'domain': "Green", 'range': "00FF00"},
      {'id': 5, 'domain': "Blue", 'range': "0000FF"},
      {'id': 6, 'domain': "Cyan", 'range': "00FFFF"},
      {'id': 7, 'domain': "Magenta", 'range': "FF00FF"},
      {'id': 8, 'domain': "Silver", 'range': "C0C0C0"},
      {'id': 9, 'domain': "Grey", 'range': "808080"},
      {'id': 10, 'domain': "Garnet", 'range': "800000"},
      {'id': 11, 'domain': "Olive", 'range': "808000"},
      {'id': 12, 'domain': "Dark Green", 'range': "Olive"},
      {'id': 13, 'domain': "Purple", 'range': "800080"},
      {'id': 14, 'domain': "Turquoise", 'range': "008080"},
      {'id': 15, 'domain': "Dark Blue", 'range': "000080"},
      {'id': 16, 'domain': "000080", 'range': "Dark Blue"}
    ]
  },
];

class App extends Component{

  handleExpandClick(index, e){
    this.setState({
      activeIndex: this.state.activeIndex === index ? null : index,
      expanded : !this.state.expanded
    });
  }

  addElementDictionary(e){
      e.preventDefault();

      let dictionaryName, lastEntry, newId;
      let newDictionary;

      dictionaryName = this.refs.dictionaryName.value;

      lastEntry = dictionaries.slice(-1)[0];

      if (lastEntry)
        newId = lastEntry.id + 1;
      else
        newId = 1;

      newDictionary = {'id': newId, 'name':dictionaryName, 'dictionary':[]};
      dictionaries.push(newDictionary);

      this.refs.dictionaryForm.reset();

      this.setState({});
  }

  getDictionaryForm(){
    return(
      <form className="form-inline" ref="dictionaryForm" onSubmit={this.addElementDictionary}>
        <div className="form-group">
          <label>
            Dictionary name
            <input type="text" required="required" className="form-control" placeholder="E.g. Colors Dictionary" ref="dictionaryName" />
          </label>
          <button type="submit" className="btn btn-primary">Add</button>
        </div>        
      </form>
    )
  }

  removeDictionary(index) {
    dictionaries.splice(index, 1);
    this.setState({});
  }

  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.getDictionaryForm = this.getDictionaryForm.bind(this);
    this.addElementDictionary = this.addElementDictionary.bind(this);
    this.removeDictionary = this.removeDictionary.bind(this);

    this.state = {
      activeIndex: null,
      expanded: false
    };
  }
  
  render() {
    let listDictionaries = dictionaries.map((dictionary, index) => {
      return (
        <li key={index}>            
            <button
              className="btn btn-outline-danger"
              onClick={this.removeDictionary.bind(this, index)}>
              <i className="dx-icon dx-icon-trash" aria-hidden="true"></i>
            </button>
            <button
              className="btn btn-secondary"
              onClick={this.handleExpandClick.bind(this, index)}
            >
              {dictionary.name}
            </button>
            <Collapse in={this.state.activeIndex === index} timeout="auto" unmountOnExit>
              <Dictionary dictionary={dictionary.dictionary}/>
            </Collapse>            
        </li>)
        });
  return (
    <div>
      {this.getDictionaryForm()}
      {listDictionaries}
    </div>
  );
  }
}

export default App;
