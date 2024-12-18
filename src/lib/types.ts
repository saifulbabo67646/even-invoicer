export interface TimeEntry {
  Date: string;
  Client: string;
  Project: string;
  Task: string;
  Notes: string;
  Hours: string;
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
  styles?: {
    [key: string]: {
      fontSize?: number;
      bold?: boolean;
      alignment?: string;
      margin?: number[];
    };
  };
}
