import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/Task';

const STORAGE_KEY = 'otodake-tasks';

const loadTasksFromStorage = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((task: any, index: number) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      order: task.order ?? index,
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
    const maxOrder = Math.max(...tasks.map(t => t.order), -1);
    const newTask: Task = {
      id: Date.now().toString(),
      title: input.title,
      description: input.description,
      category: input.category,
      dueDate: input.dueDate,
      completed: false,
      order: maxOrder + 1,
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

  const importTasks = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
  }, []);

  const reorderTasks = useCallback((draggedId: string, targetId: string) => {
    setTasks(prevTasks => {
      const draggedIndex = prevTasks.findIndex(t => t.id === draggedId);
      const targetIndex = prevTasks.findIndex(t => t.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prevTasks;
      
      const newTasks = [...prevTasks];
      const [draggedTask] = newTasks.splice(draggedIndex, 1);
      newTasks.splice(targetIndex, 0, draggedTask);
      
      // Update order values
      return newTasks.map((task, index) => ({
        ...task,
        order: index,
        updatedAt: new Date(),
      }));
    });
  }, []);

  // Sort tasks by order
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => a.order - b.order);
  }, [tasks]);

  return {
    tasks: sortedTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    importTasks,
    reorderTasks,
  };
};