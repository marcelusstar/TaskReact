import React, { Component } from 'react';
import './App.css';
import DataGrid, { Column, Editing, Paging, Lookup } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import { Collapse } from '@material-ui/core';
import classNames from "classnames";


const columns = ['CompanyName', 'City', 'State', 'Phone', 'Fax'];
const columns2 = ['name', 'email'];
const customers = [{
  'ID': 1,
  'CompanyName': 'Super Mart of the West',
  'Address': '702 SW 8th Street',
  'City': 'Bentonville',
  'State': 'Arkansas',
  'Zipcode': 72716,
  'Phone': '(800) 555-2797',
  'Fax': '(800) 555-2171',
  'Website': 'http://www.nowebsitesupermart.com'
}, {
  'ID': 2,
  'CompanyName': 'Electronics Depot',
  'Address': '2455 Paces Ferry Road NW',
  'City': 'Atlanta',
  'State': 'Georgia',
  'Zipcode': 30339,
  'Phone': '(800) 595-3232',
  'Fax': '(800) 595-3231',
  'Website': 'http://www.nowebsitedepot.com'
}, {
  'ID': 3,
  'CompanyName': 'K&S Music',
  'Address': '1000 Nicllet Mall',
  'City': 'Minneapolis',
  'State': 'Minnesota',
  'Zipcode': 55403,
  'Phone': '(612) 304-6073',
  'Fax': '(612) 304-6074',
  'Website': 'http://www.nowebsitemusic.com'
}, {
  'ID': 4,
  'CompanyName': "Tom's Club",
  'Address': '999 Lake Drive',
  'City': 'Issaquah',
  'State': 'Washington',
  'Zipcode': 98027,
  'Phone': '(800) 955-2292',
  'Fax': '(800) 955-2293',
  'Website': 'http://www.nowebsitetomsclub.com'
}, {
  'ID': 5,
  'CompanyName': 'E-Mart',
  'Address': '3333 Beverly Rd',
  'City': 'Hoffman Estates',
  'State': 'Illinois',
  'Zipcode': 60179,
  'Phone': '(847) 286-2500',
  'Fax': '(847) 286-2501',
  'Website': 'http://www.nowebsiteemart.com'
}, {
  'ID': 6,
  'CompanyName': 'Walters',
  'Address': '200 Wilmot Rd',
  'City': 'Deerfield',
  'State': 'Illinois',
  'Zipcode': 60015,
  'Phone': '(847) 940-2500',
  'Fax': '(847) 940-2501',
  'Website': 'http://www.nowebsitewalters.com'
}, {
  'ID': 7,
  'CompanyName': 'StereoShack',
  'Address': '400 Commerce S',
  'City': 'Fort Worth',
  'State': 'Texas',
  'Zipcode': 76102,
  'Phone': '(817) 820-0741',
  'Fax': '(817) 820-0742',
  'Website': 'http://www.nowebsiteshack.com'
}, {
  'ID': 8,
  'CompanyName': 'Circuit Town',
  'Address': '2200 Kensington Court',
  'City': 'Oak Brook',
  'State': 'Illinois',
  'Zipcode': 60523,
  'Phone': '(800) 955-2929',
  'Fax': '(800) 955-9392',
  'Website': 'http://www.nowebsitecircuittown.com'
}, {
  'ID': 9,
  'CompanyName': 'Premier Buy',
  'Address': '7601 Penn Avenue South',
  'City': 'Richfield',
  'State': 'Minnesota',
  'Zipcode': 55423,
  'Phone': '(612) 291-1000',
  'Fax': '(612) 291-2001',
  'Website': 'http://www.nowebsitepremierbuy.com'
}, {
  'ID': 10,
  'CompanyName': 'ElectrixMax',
  'Address': '263 Shuman Blvd',
  'City': 'Naperville',
  'State': 'Illinois',
  'Zipcode': 60563,
  'Phone': '(630) 438-7800',
  'Fax': '(630) 438-7801',
  'Website': 'http://www.nowebsiteelectrixmax.com'
}, {
  'ID': 11,
  'CompanyName': 'Video Emporium',
  'Address': '1201 Elm Street',
  'City': 'Dallas',
  'State': 'Texas',
  'Zipcode': 75270,
  'Phone': '(214) 854-3000',
  'Fax': '(214) 854-3001',
  'Website': 'http://www.nowebsitevideoemporium.com'
}, {
  'ID': 12,
  'CompanyName': 'Screen Shop',
  'Address': '1000 Lowes Blvd',
  'City': 'Mooresville',
  'State': 'North Carolina',
  'Zipcode': 28117,
  'Phone': '(800) 445-6937',
  'Fax': '(800) 445-6938',
  'Website': 'http://www.nowebsitescreenshop.com'
}];

let users = [
  {'id': 1, 'name': "miguel", 'email': "miguelghz@miguelgomez.io"},
  {'id': 2, 'name': "test", 'email': "test@test.es"},
  {'id': 3, 'name': "test", 'email': "test@test.es"},
  {'id': 4, 'name': "Marcelo", 'email': "marcelo@test.es"},
  {'id': 5, 'name': "Robero", 'email': "roberto@test.es"},
  {'id': 6, 'name': "Robero", 'email': "robertddo@test.es"},
  {'id': 7, 'name': "robertddo@test.es", 'email': "Robero"},
  {'id': 8, 'name': "miguelghz@miguelgomez.io", 'email': "dfdfdf"}
];

class App extends Component{

  logEvent(eventName) {
    this.setState((state) => {
      return { events: [eventName].concat(state.events) };
    });
  }

  checkConsistence(valueDictionary)
  {
    let duplicated = false;
    let forked = false;
    let cycled = false;
    let chained = false;
    let id_element_inconsistent;

    let elementDictionary = valueDictionary.data

    users.forEach(function (item) {
      if (item === elementDictionary) {
        }
      else{
        if (item.name === elementDictionary.name && item.email === elementDictionary.email) {
          duplicated = true;
          id_element_inconsistent = item.id;
        }
        if (item.name === elementDictionary.name){
          forked = true;
          id_element_inconsistent = item.id;
        }
        if (item.name === elementDictionary.email && item.email === elementDictionary.name) {
          cycled = true;
          id_element_inconsistent = item.id;
        }
        if (item.email === elementDictionary.name) {
          chained = true;
          id_element_inconsistent = item.id;
        }
      }
    })

    if (cycled === true){
      return (
        <div>
          <i id="cycled" className="dx-icon dx-icon-warning"></i>
          <strong>Cycled with ID: {id_element_inconsistent}</strong>
        </div>              
      );
    }
    if (chained === true){
      return (
        <div>
          <i id="chained" className="dx-icon dx-icon-warning"></i>
          <strong>Chained with ID: {id_element_inconsistent}</strong>
        </div>               
      );
    }
    if (forked === true){
      return (
        <div>
          <i id="forked" className="dx-icon dx-icon-warning"></i>
          <strong>Forked with ID: {id_element_inconsistent}</strong>
        </div>            
      );
    }    
    if (duplicated === true){
      return (
        <div>
          <i id="duplicated" className="dx-icon dx-icon-warning"></i>
          <strong>Duplicated with ID: {id_element_inconsistent}</strong>
        </div>
      );
    }
    else{
      return <i className="dx-icon dx-icon-todo"></i>
    }
  }

  DiffCell(cellData) {
    this.checkConsistence(cellData.data);
    var object = <div>
    <h3>heihie</h3>
  </div>;
    return (
      object
    );
  }

  moreLess(index) {
    if (this.state.activeIndex === index) {
      return (
        <span>
          <i className="fas fa-angle-up" /> Less
        </span>
      );
    } else {
      return (
        <span>
          <i className="fas fa-angle-down" /> More
        </span>
      );
    }
  }

  handleExpandClick(index, e){
    this.setState({
      activeIndex: this.state.activeIndex === index ? null : index,
      expanded : !this.state.expanded
    });
  }

  constructor(props) {
    super(props);
    this.state = { events: [] };
    this.logEvent = this.logEvent.bind(this);
    this.onEditingStart = this.logEvent.bind(this, 'EditingStart');
    this.onInitNewRow = this.logEvent.bind(this, 'InitNewRow');
    this.onRowInserting = this.logEvent.bind(this, 'RowInserting');
    this.onRowInserted = this.logEvent.bind(this, 'RowInserted');
    this.onRowUpdating = this.logEvent.bind(this, 'RowUpdating');
    this.onRowUpdated = this.logEvent.bind(this, 'RowUpdated');
    this.onRowRemoving = this.logEvent.bind(this, 'RowRemoving');
    this.onRowRemoved = this.logEvent.bind(this, 'RowRemoved');

    this.handleExpandClick = this.handleExpandClick.bind(this);

    this.state = {
      activeIndex: null,
      expanded: false
    };
  }

  dictionaryView(index)
  {
    if (this.state.activeIndex === index) {
      return (
        {index}
      );
    }
  }
  
  render() {
    let lista = users.map((post, index) => {
      return (
        <li key={index}>
          <div>
            <p>{post.name}</p>
            <Collapse in={this.state.activeIndex === index} timeout="auto" unmountOnExit>
            <div
                  className={classNames("alert alert-info msg", {
                    show: this.state === index,
                    hide: this.state !== index
                  })}
                >
                  {post.email}
                </div>
              </Collapse>
            <button
              className="btn btn-primary btn-xs"
              onClick={this.handleExpandClick.bind(this, index)}
            >
              {this.moreLess(index)}
            </button>
          </div>
        </li>)
        });
  return (
    <div>
    <React.Fragment>
      <DataGrid
          id={'gridContainer'}
          dataSource={users}
          allowColumnReordering={true}
          showBorders={true}
          onInitNewRow={this.onInitNewRow}
          onRowInserting={this.onRowInserting}
          onRowInserted={this.onRowInserted}>

          <Paging enabled={true} pageSize={5} />
          <Editing
            mode={'row'}
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true} />
          <Column dataField={'id'} />
          <Column dataField={'name'} />
          <Column dataField={'email'} />
          <Column caption={'Status'} cellRender={this.checkConsistence}/>
        </DataGrid>
    </React.Fragment>

    {lista}
        </div>
  );
  }
}

export default App;
