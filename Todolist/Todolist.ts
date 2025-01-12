interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Class to manage the Todo list
class TodoList {
  private todos: Todo[] = [];

  addTodo(title: string): void {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title,
      completed: false,
    };
    this.todos.push(newTodo);
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleTodo(id: number): void {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  getTodos(): Todo[] {
    return this.todos;
  }
}

// Example usage
const todoList = new TodoList();
todoList.addTodo("Learn TypeScript");
todoList.addTodo("Build a project");
todoList.toggleTodo(1);
console.log(todoList.getTodos());
