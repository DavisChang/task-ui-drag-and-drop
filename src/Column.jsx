import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => props.isDraggingOver ? 'skyblue' : 'white'};
  transition: background-color 0.2s ease;
`;


export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>
          {this.props.column.title}
        </Title>
        <Droppable droppableId={this.props.column.id}>
          {
            (provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.drappableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
                {provided.placeholder}
              </TaskList>
            )
          }
        </Droppable>
      </Container>
    );
  }
}