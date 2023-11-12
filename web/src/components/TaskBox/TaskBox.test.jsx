import { render } from '@redwoodjs/testing/web'

import TaskBox from './TaskBox'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

jest.mock('../TaskType/TaskType', () => {
  return () => <div/>;
});

describe('TaskBox', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TaskBox />)
    }).not.toThrow()
  })
})