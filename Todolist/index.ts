// Define a Todo interface
interface Todo {
    id: number;
    text: string;
    done: boolean;
}

// TodoApp class to handle the to-do list logic
class TodoApp {
    private todos: Todo[] = [];
    private nextId: number = 1;

    addTodo(text: string): void {
        const newTodo: Todo = {
            id: this.nextId,
            text,
            done: false
        };
        this.todos.push(newTodo);
        this.nextId++;
    }

    removeTodo(id: number): void {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    toggleTodo(id: number): void {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.done = !todo.done;
        }
    }

    getTodos(): Todo[] {
        return this.todos;
    }
}

// Initialize TodoApp
const app = new TodoApp();

// Sample actions to show functionality
app.addTodo("Learn TypeScript");
app.addTodo("Build a website");
app.addTodo("Play chess");
app.toggleTodo(2);
app.removeTodo(3);

// Output the todos
console.log(app.getTodos());
