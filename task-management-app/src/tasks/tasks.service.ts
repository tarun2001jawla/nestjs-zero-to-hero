import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Buy groceries',
      description: 'Pick up milk, eggs, and bread from the store',
      status: TaskStatus.OPEN,
    },
    {
      id: '2',
      title: 'Finish project report',
      description:
        'Complete the project report by Friday and submit it to the manager',
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: '3',
      title: 'Book flight tickets',
      description: 'Book flight tickets for the upcoming vacation to Hawaii',
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: '4',
      title: 'Learn a new language',
      description:
        'Spend 30 minutes each day learning Spanish using a language learning app',
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: '5',
      title: "Schedule a doctor's appointment",
      description:
        "Schedule a doctor's appointment for a check-up and to discuss any health concerns",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }
}
