// Define the Todo interface
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

class TodoApp {
  todos: Todo[] = [];
  todoListElement: HTMLElement;

  constructor(todoListElement: HTMLElement) {
    this.todoListElement = todoListElement;
    this.loadTodos();
  }

  // Load todos from Local Storage
  loadTodos(): void {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
      this.renderTodos();
    }
  }

  // Save todos to Local Storage
  saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  // Render todos to the DOM
  renderTodos(): void {
    this.todoListElement.innerHTML = '';
    this.todos.forEach((todo) => {
      const todoItem = document.createElement('li');
      todoItem.textContent = todo.text;
      todoItem.classList.toggle('completed', todo.completed);

      // Toggle completed status on click
      todoItem.addEventListener('click', () => {
        todo.completed = !todo.completed;
        this.saveTodos();
        this.renderTodos();
      });

      this.todoListElement.appendChild(todoItem);
    });
  }

  // Add a new todo
  addTodo(text: string): void {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };

    this.todos.push(newTodo);
    this.saveTodos();
    this.renderTodos();
  }
}

// Initialize the Todo App
const todoListElement = document.getElementById('todo-list')!;
const todoApp = new TodoApp(todoListElement);

// Add a new todo from an input field
const addButton = document.getElementById('add-button')!;
const todoInput = document.getElementById('todo-input') as HTMLInputElement;

addButton.addEventListener('click', () => {
  if (todoInput.value.trim()) {
    todoApp.addTodo(todoInput.value.trim());
    todoInput.value = '';
  }
});
