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
  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Invoice Number</label>
      <input
        type="text"
        bind:value={invoiceInfo.number}
        placeholder="Enter invoice number"
        class="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Invoice Date</label>
      <input
        type="date"
        bind:value={invoiceInfo.date}
        on:change={(e) => handleChange('date', e.currentTarget.value)}
        class="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Due Date</label>
      <input
        type="date"
        bind:value={invoiceInfo.dueDate}
        class="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
      <input
        type="number"
        bind:value={invoiceInfo.hourlyRate}
        min="0"
        step="0.01"
        class="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
      />
    </div>
  </div>
</div>