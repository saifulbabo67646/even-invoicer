<script lang="ts">
  import type { TimeEntry, ClientInfo, InvoiceInfo } from '$lib/types';
  import { formatCurrency } from '$lib/utils/formatters';

  export let timeEntries: TimeEntry[];
  export let clientInfo: ClientInfo;
  export let invoiceInfo: InvoiceInfo;

  $: totalHours = timeEntries.reduce((sum, entry) => sum + parseFloat(entry.Hours), 0);
  $: totalAmount = totalHours * invoiceInfo.hourlyRate;
</script>

<div class="border rounded-lg p-8 bg-white shadow-sm">
  <div class="text-4xl font-bold text-center mb-8">INVOICE</div>

  <div class="grid grid-cols-2 gap-8 mb-8">
    <div>
      <div class="text-gray-600 font-semibold mb-2">BILL TO</div>
      <div>{clientInfo.name || 'Client Name'}</div>
      <div>{clientInfo.company || 'Company Name'}</div>
      <div>{clientInfo.address || 'Address'}</div>
      <div>{clientInfo.email || 'Email'}</div>
    </div>
    <div class="text-right">
      <div class="mb-2">
        <span class="font-semibold">Invoice Number: </span>
        <span>{invoiceInfo.number || '-'}</span>
      </div>
      <div class="mb-2">
        <span class="font-semibold">Date: </span>
        <span>{invoiceInfo.date || '-'}</span>
      </div>
      <div class="mb-2">
        <span class="font-semibold">Due Date: </span>
        <span>{invoiceInfo.dueDate || '-'}</span>
      </div>
      <div>
        <span class="font-semibold">Rate: </span>
        <span>${invoiceInfo.hourlyRate}/hour</span>
      </div>
    </div>
  </div>

  <table class="w-full mb-8">
    <thead>
      <tr class="bg-gray-50 text-left">
        <th class="py-2 px-4 font-semibold">Date</th>
        <th class="py-2 px-4 font-semibold">Client</th>
        <th class="py-2 px-4 font-semibold">Project</th>
        <th class="py-2 px-4 font-semibold">Task</th>
        <th class="py-2 px-4 font-semibold text-right">Hours</th>
        <th class="py-2 px-4 font-semibold text-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      {#each timeEntries as entry}
        <tr class="border-b">
          <td class="py-2 px-4">{entry.Date}</td>
          <td class="py-2 px-4">{entry.Client}</td>
          <td class="py-2 px-4">{entry.Project}</td>
          <td class="py-2 px-4">{entry.Task}</td>
          <td class="py-2 px-4 text-right">{entry.Hours}</td>
          <td class="py-2 px-4 text-right">
            {formatCurrency(parseFloat(entry.Hours) * invoiceInfo.hourlyRate)}
          </td>
        </tr>
      {/each}
      <tr class="font-semibold">
        <td colspan="4" class="py-2 px-4"></td>
        <td class="py-2 px-4 text-right">{totalHours.toFixed(2)}</td>
        <td class="py-2 px-4 text-right">{formatCurrency(totalAmount)}</td>
      </tr>
    </tbody>
  </table>
</div>
