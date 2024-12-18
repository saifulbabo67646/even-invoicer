export interface TimeEntry {
  Date: string;
  Task: string;
  Hours: string;
  Client: string;
  Project: string;
  Notes: string;
  Billable: boolean;
}

export interface ClientInfo {
  name: string;
  company: string;
  address: string;
  email: string;
}

export interface InvoiceInfo {
  number: string;
  date: string;
  dueDate: string;
  hourlyRate: number;
}

export interface PDFDocDefinition {
  content: any[];
  styles: Record<string, any>;
}