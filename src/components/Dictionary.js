import React, { Component } from 'react'
import DataGrid, { Column, Editing, Paging} from 'devextreme-react/data-grid';

class Dictionary extends Component {

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
    
        this.props.users.forEach(function (item) {
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
        if (duplicated === true){
            return (
              <div>
                <i id="duplicated" className="dx-icon dx-icon-warning"></i>
                <strong>Duplicated with ID: {id_element_inconsistent}</strong>
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
        else{
          return <i className="dx-icon dx-icon-todo"></i>
        }
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

        this.state = {
            users: this.props.users
          }
      }

    render () {
        return (
            <DataGrid
                dataSource={this.props.users}
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
                <Column caption={'Status'} cellRender={this.checkConsistence.bind(this)}/>
            </DataGrid>
        );
      }
}

export default Dictionary;