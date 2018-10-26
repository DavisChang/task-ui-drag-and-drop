import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';

import { DragDropContext } from 'react-beautiful-dnd';

import initalData from './initial-data';
import Column from './Column';

class App extends React.Component {
  state = initalData;
  
  /*
  * result:
  * {
  *   "draggableId":"task1",
  *   "type":"DEFAULT",
  *   "source":{"index":0,"droppableId":"column-1"},
  *   "destination":{"droppableId":"column-1","index":1},"reason":"DROP"}
   */
  onDragEnd = result => {
    console.log('onDragEnd:', result);
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
      ) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
      {
        this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return <Column key={columnId} column={column} tasks={tasks} />;
        })
      }
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));