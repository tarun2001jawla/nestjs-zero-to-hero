import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [
    {
      id: 1,
      title: 'Buy groceries',
      description: 'Pick up milk, eggs, and bread from the store',
      completed: false,
    },
    {
      id: 2,
      title: 'Finish project report',
      description:
        'Complete the project report by Friday and submit it to the manager',
      completed: false,
    },
    {
      id: 3,
      title: 'Book flight tickets',
      description: 'Book flight tickets for the upcoming vacation to Hawaii',
      completed: false,
    },
    {
      id: 4,
      title: 'Learn a new language',
      description:
        'Spend 30 minutes each day learning Spanish using a language learning app',
      completed: false,
    },
    {
      id: 5,
      title: "Schedule a doctor's appointment",
      description:
        "Schedule a doctor's appointment for a check-up and to discuss any health concerns",
      completed: false,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }
}
