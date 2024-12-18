import Papa from 'papaparse';
import type { TimeEntry } from '$lib/types';

export async function parseTimeEntries(file: File): Promise<TimeEntry[]> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    console.log('Starting CSV parse for file:', file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        try {
          console.log('Raw CSV results:', results.data);
          
          if (!Array.isArray(results.data)) {
            reject(new Error('Invalid CSV format'));
            return;
          }

          const entries = results.data
            .filter((entry: any) => {
              const isValid = entry.Date && 
                            entry['Hours'] && 
                            !isNaN(parseFloat(entry['Hours']));
              if (!isValid) {
                console.log('Filtered out invalid entry:', entry);
              }
              return isValid;
            })
            .map((entry: any) => ({
              Date: entry.Date,
              Task: entry.Task || '',
              Hours: parseFloat(entry['Hours']).toString(),
              Client: entry.Client || '',
              Project: entry.Project || '',
              Notes: entry.Notes || '',
              Billable: entry['Billable?'] === 'Yes'
            }));

          console.log('Processed entries:', entries);

          if (entries.length === 0) {
            reject(new Error('No valid entries found in CSV'));
            return;
          }

          resolve(entries as TimeEntry[]);
        } catch (error) {
          console.error('Error processing CSV:', error);
          reject(new Error('Error processing CSV data: ' + error.message));
        }
      },
      error: (error) => {
        console.error('Papa Parse error:', error);
        reject(new Error('Error parsing CSV: ' + error.message));
      }
    });
  });
}