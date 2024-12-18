<script lang="ts">
  import type { InvoiceInfo } from '$lib/types';
  import { calculateDueDate } from '$lib/utils/dateUtils';

  export let invoiceInfo: InvoiceInfo;

  function handleChange(field: keyof InvoiceInfo, value: string | number) {
    invoiceInfo = { ...invoiceInfo, [field]: value };
    
    if (field === 'date') {
      invoiceInfo = { 
        ...invoiceInfo, 
        dueDate: calculateDueDate(value as string)
      };
    }
  }
</script>

<div class="border-b pb-6">
  <h2 class="text-xl font-semibold mb-4">Invoice Information</h2>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Invoice Number</label>
      <input
        type="text"
        bind:value={invoiceInfo.number}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Invoice Date</label>
      <input
        type="date"
        bind:value={invoiceInfo.date}
        on:change={(e) => handleChange('date', e.currentTarget.value)}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Due Date</label>
      <input
        type="date"
        bind:value={invoiceInfo.dueDate}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
      <input
        type="number"
        bind:value={invoiceInfo.hourlyRate}
        min="0"
        step="0.01"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  </div>
</div>