import React, { Component } from 'react';
import '../assets/App.css';
import { Collapse } from '@material-ui/core';
import Dictionary from '../components/Dictionary';

let users = [
  {'id': 1, 'name':'Colour dictionary', 'dictionary':
    [
      {'id': 1, 'name': "miguel", 'email': "miguelghz@miguelgomez.io"},
      {'id': 2, 'name': "test", 'email': "test@test.es"},
      {'id': 3, 'name': "test", 'email': "test@test.es"},
      {'id': 4, 'name': "Marcelo", 'email': "marcelo@test.es"},
      {'id': 5, 'name': "Robero", 'email': "roberto@test.es"},
      {'id': 6, 'name': "Robero", 'email': "robertddo@test.es"},
      {'id': 7, 'name': "robertddo@test.es", 'email': "Robero"},
      {'id': 8, 'name': "miguelghz@miguelgomez.io", 'email': "dfdfdf"}
    ]
  },
  {'id': 2, 'name':'Ayax dictionary', 'dictionary':
    [
      {'id': 6, 'name': "Robero", 'email': "robertddo@test.es"},
      {'id': 7, 'name': "robertddo@test.es", 'email': "Robero"},
      {'id': 8, 'name': "miguelghz@miguelgomez.io", 'email': "dfdfdf"}
    ]
  },
  {'id': 3, 'name':'Prok dictionary', 'dictionary':
    [
      {'id': 1, 'name': "hard gz", 'email': "filosogia"},
      {'id': 2, 'name': "test", 'email': "test@test.es"},
      {'id': 3, 'name': "anier", 'email': "caballos to dopaos"},
      {'id': 4, 'name': "Marcelo", 'email': "marcelo@test.es"},
      {'id': 5, 'name': "Robero", 'email': "roberto@test.es"},
      {'id': 6, 'name': "Robero", 'email': "robertddo@test.es"},
    ]
  }
];

class App extends Component{

  handleExpandClick(index, e){
    this.setState({
      activeIndex: this.state.activeIndex === index ? null : index,
      expanded : !this.state.expanded
    });
  }

  addElementDictionary(e)
  {
      e.preventDefault();

      let dictionaryName, lastEntry, newId;
      let newElement;

      dictionaryName = this.refs.dictionaryName.value;

      lastEntry = users.slice(-1)[0];

      if (lastEntry)
        newId = lastEntry.id + 1;
      else
        newId = 1;

      newElement = {'id': newId, 'name':dictionaryName, 'dictionary':[]};
      users.push(newElement);
      this.refs.dictionaryForm.reset();

      this.setState({});
  }

  getDictionaryForm()
  {
    return(
      <form className="form-inline" ref="dictionaryForm" onSubmit={this.addElementDictionary}>
        <div className="form-group">
          <label>
            Dictionary name
            <input type="text" required="required" className="form-control" placeholder="E.g. Dictionary Colors" ref="dictionaryName" />
          </label>
          <button type="submit" className="btn btn-primary">Add</button>
        </div>        
      </form>
    )
  }

  removeTask(index, event) {
    users.splice(index, 1);
    this.setState({});
  }

  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.getDictionaryForm = this.getDictionaryForm.bind(this);
    this.addElementDictionary = this.addElementDictionary.bind(this);
    this.removeTask = this.removeTask.bind(this);

    this.state = {
      activeIndex: null,
      expanded: false
    };
  }
  
  render() {
    let content = users.map((post, index) => {
      return (
        <li key={index}>
            
            <button 
              className="btn btn-outline-danger"
              onClick={this.removeTask.bind(this, index)}>
              <i className="dx-icon dx-icon-trash" aria-hidden="true"></i>
            </button>
            <button
              className="btn btn-secondary"
              onClick={this.handleExpandClick.bind(this, index)}
            >
              {post.name}
            </button>
            <Collapse in={this.state.activeIndex === index} timeout="auto" unmountOnExit>
                  <Dictionary users={post.dictionary}/>
              </Collapse>
            
        </li>)
        });
  return (
    <div>
      {this.getDictionaryForm()}
      {content}
    </div>
  );
  }
}

export default App;
