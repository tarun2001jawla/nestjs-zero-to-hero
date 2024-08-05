# Task Management App

This project is a task management application developed using NestJS. It demonstrates the creation and management of tasks with a variety of API endpoints.

## Project Structure

![Project Structure](./public/App%20Structure.svg)

## API Endpoints

### Tasks

| Endpoint                  | Method | Description                 |
|---------------------------|--------|-----------------------------|
| `/tasks`                  | GET    | Get tasks (including filters) |
| `/tasks/:id`              | GET    | Get a single task by ID     |
| `/tasks`                  | POST   | Create a new task           |
| `/tasks/:id`              | DELETE | Delete a task by ID         |
| `/tasks/:id/status`       | PATCH  | Update the status of a task |

### Authentication

| Endpoint         | Method | Description   |
|------------------|--------|---------------|
| `/auth/signup/`  | POST   | Sign Up       |
| `/auth/login/`   | POST   | Log In        |

## Usage

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/your-username/task-management-app.git
    cd task-management-app
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Run the Application**:

    ```bash
    npm start
    ```

4. **Run in Development Mode**:

    ```bash
    npm run start:dev
    ```

5. **Build the Application**:

    ```bash
    npm run build
    ```

6. **Run Tests**:

    ```bash
    npm run test
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to the course instructor and resources that helped in developing this application.
