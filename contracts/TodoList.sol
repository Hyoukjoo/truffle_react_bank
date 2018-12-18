pragma solidity ^0.5.0;

contract TodoList {
    
    Todo[] public todoLists; // todo list
    
    struct Todo {
        uint index;
        string todo;
        uint time;
    }
    
    mapping(uint256 => Todo) todos;
    
    function addTodo(uint _index, string memory _todo, uint _time) public {
        todoLists.push(Todo({
            index: _index,
            todo: _todo,
            time: _time
        }));
    }
    
    function getTodoLists(uint _index) public view returns (string memory, uint) {
        return (todos[_index].todo, todos[_index].time);
    }
}