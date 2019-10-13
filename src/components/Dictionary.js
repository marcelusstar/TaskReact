import React, { Component } from 'react'
import DataGrid, { Column, Editing, Paging, Sorting} from 'devextreme-react/data-grid';

class Dictionary extends Component {

    checkConsistence(valueDictionary) {
        let duplicated = false;
        let forked = false;
        let cycled = false;
        let chained = false;
        let idElementInconsistent;

        let elementDictionary = valueDictionary.data

        this.props.users.some(function (item) {
            if (item !== elementDictionary) {
                if (item.name === elementDictionary.name && item.email === elementDictionary.email) {
                    duplicated = true;
                    idElementInconsistent = item.id;
                    
                    return true;
                }
                else if (item.name === elementDictionary.name){
                    forked = true;
                    idElementInconsistent = item.id;
                    
                    return true;
                }
                else if (item.name === elementDictionary.email && item.email === elementDictionary.name) {
                    cycled = true;
                    idElementInconsistent = item.id;
                    
                    return true;
                }
                else if (item.email === elementDictionary.name) {
                    chained = true;
                    idElementInconsistent = item.id;
                    
                    return true;
                }
            }
        })

        if (cycled === true){
            return (
            <div>
                <i id="cycled" className="dx-icon dx-icon-warning"></i>
                <strong>Cycled with ID: {idElementInconsistent}</strong>
            </div>              
            );
        }
        if (chained === true){
            return (
            <div>
                <i id="chained" className="dx-icon dx-icon-warning"></i>
                <strong>Chained with ID: {idElementInconsistent}</strong>
            </div>               
            );
        }
        if (duplicated === true){
            return (
                <div>
                <i id="duplicated" className="dx-icon dx-icon-warning"></i>
                <strong>Duplicated with ID: {idElementInconsistent}</strong>
                </div>
            );
            }
        if (forked === true){
            return (
            <div>
                <i id="forked" className="dx-icon dx-icon-warning"></i>
                <strong>Forked with ID: {idElementInconsistent}</strong>
            </div>            
            );
        }        
        else{
            return <i className="dx-icon dx-icon-todo"></i>
        }
    }

    onInitNewRowHandler(event){
        let lastEntry, newId;

        lastEntry = this.props.users.slice(-1)[0];

        if (lastEntry)
            newId = lastEntry.id + 1;
        else
            newId = 1;

        event.data.id = newId
    }

    constructor(props) {
        super(props);
        this.onInitNewRowHandler = this.onInitNewRowHandler.bind(this);

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
                onInitNewRow={this.onInitNewRowHandler}>
                <Paging enabled={true} pageSize={5} />
                <Editing
                    mode={'row'}
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true} />
                <Column dataField={'id'} allowEditing={false} sortOrder={'desc'}/>
                <Column dataField={'name'} />
                <Column dataField={'email'} />
                <Column caption={'Status'} cellRender={this.checkConsistence.bind(this)}/>
            </DataGrid>
        );
      }
}

export default Dictionary;