import { useState, useCallback, useEffect } from 'react';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types/Task';

const STORAGE_KEY = 'otodake-tasks';

const loadTasksFromStorage = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
    }));
  } catch (error) {
    console.error('Failed to load tasks from storage:', error);
    return [];
  }
};

const saveTasksToStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to storage:', error);
  }
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromStorage());

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const addTask = useCallback((input: CreateTaskInput) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: input.title,
      description: input.description,
      category: input.category,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, input: UpdateTaskInput) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        return {
          ...task,
          ...input,
          updatedAt: new Date(),
        };
      }
      return task;
    }));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed });
  }, [tasks, updateTask]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
};