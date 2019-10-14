import React, { Component } from 'react'
import DataGrid, { Column, Editing, Paging} from 'devextreme-react/data-grid';

class Dictionary extends Component {

    checkConsistency(valueDictionary) {
        let duplicated = false;
        let forked = false;
        let cycled = false;
        let chained = false;
        let idInconsistentElement;

        let currentDictionaryItem = valueDictionary.data

        this.props.dictionary.some(function (item) {
            if (item !== currentDictionaryItem) {

                if (item.domain === currentDictionaryItem.range && item.range === currentDictionaryItem.domain) {
                    cycled = true;
                    idInconsistentElement = item.id;                    
                    return true;
                }
                if (item.range === currentDictionaryItem.domain || currentDictionaryItem.range === item.domain) {
                    chained = true;
                    idInconsistentElement = item.id;                    
                    return true;
                }
                if (item.domain === currentDictionaryItem.domain && item.range === currentDictionaryItem.range) {
                    duplicated = true;
                    idInconsistentElement = item.id;                    
                    return true;
                }
                if (item.domain === currentDictionaryItem.domain){
                    forked = true;
                    idInconsistentElement = item.id;                    
                    return true;
                }
            }
        })

        if (cycled === true){
            return (
                <div>
                    <i id="cycled" className="dx-icon dx-icon-warning"></i>
                    <strong>Cycled with ID: {idInconsistentElement}</strong>
                </div>              
            );
        }
        if (chained === true){
            return (
                <div>
                    <i id="chained" className="dx-icon dx-icon-warning"></i>
                    <strong>Chained with ID: {idInconsistentElement}</strong>
                </div>               
            );
        }
        if (duplicated === true){
            return (
                <div>
                    <i id="duplicated" className="dx-icon dx-icon-warning"></i>
                    <strong>Duplicated with ID: {idInconsistentElement}</strong>
                </div>
            );
        }
        if (forked === true){
            return (
                <div>
                    <i id="forked" className="dx-icon dx-icon-warning"></i>
                    <strong>Forked with ID: {idInconsistentElement}</strong>
                </div>            
            );
        }        
        else{
            return <i className="dx-icon dx-icon-todo"></i>
        }
    }

    onInitNewRowHandler(event){
        let lastEntry, newId;

        lastEntry = this.props.dictionary.slice(-1)[0];

        if (lastEntry)
            newId = lastEntry.id + 1;
        else
            newId = 1;

        event.data.id = newId
    }

    onRowInsertingHandler(event){
        if (!event.data.domain || !event.data.range)
            event.cancel = true;
    }

    constructor(props) {
        super(props);
        this.onInitNewRowHandler = this.onInitNewRowHandler.bind(this);
        this.onRowInsertingHandler = this.onRowInsertingHandler.bind(this);

        this.state = {
            dictionary: this.props.dictionary
          }
      }

    render () {
        return (
            <DataGrid
                dataSource={this.props.dictionary}
                allowColumnReordering={true}
                showBorders={true}
                onInitNewRow={this.onInitNewRowHandler}
                onRowInserting={this.onRowInsertingHandler}>
                <Paging enabled={true} pageSize={7} />
                <Editing
                    mode={'row'}
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true} />
                <Column dataField={'id'} allowEditing={false} sortOrder={'desc'}/>
                <Column dataField={'domain'} />
                <Column dataField={'range'} />
                <Column caption={'Status'} cellRender={this.checkConsistency.bind(this)}/>
            </DataGrid>
        );
      }
}

export default Dictionary;