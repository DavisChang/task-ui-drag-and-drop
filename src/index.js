import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';

import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initalData from './initial-data';
import Column from './Column';

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = initalData;
  
  onDragStart = start => {
    console.log('onDragStart:', start);
    document.body.style.color = 'orange';
    document.body.style.transition = 'background-color 0.2s ease';
  };

  onDragUpdate = update => {
    console.log('onDragUpdate:', update);
    const { destination } = update;
    const opacity = destination ? destination.index / Object.keys(this.state.tasks).length : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

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
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';

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

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
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
      return;
    }
    
    // Move Task from one column list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTasksIds = Array.from(finish.taskIds);
    finishTasksIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTasksIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {
            this.state.columnOrder.map(columnId => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

              return <Column key={columnId} column={column} tasks={tasks} />;
            })
          }
        </Container>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));