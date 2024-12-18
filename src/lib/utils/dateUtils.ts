export function calculateDueDate(date: string): string {
  const dueDate = new Date(date);
  dueDate.setDate(dueDate.getDate() + 30);
  return dueDate.toISOString().split('T')[0];
}