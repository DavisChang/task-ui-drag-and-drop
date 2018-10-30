import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props =>
    props.isDragDisabled
      ? 'lightgrey'
      : props.isDragging
        ? 'lightgreen'
        : 'white'};

  display: flex;
`;

/*
  * HandleDrag
    <HandleDrag {...provided.dragHandleProps} />
    const HandleDrag = styled.div`
      margin-right: 8px;
      width: 20px;
      height: 20px;
      background-color: orange;
      border-radius: 4px;
    `;
 */

export default class Task extends React.Component {
  render() {

    const isDragDisabled = this.props.task.id === 'task-4';

    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {
          (provided, snapshot) => (
            <Container
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              isDragging={snapshot.isDragging}
              isDragDisabled={isDragDisabled}
            >
              {this.props.task.content}
            </Container>
          )
        }
      </Draggable>
    );
  }
}