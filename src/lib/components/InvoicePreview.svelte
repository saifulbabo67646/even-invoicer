<script lang="ts">
  import type { TimeEntry, ClientInfo, InvoiceInfo } from '$lib/types';
  import { formatCurrency } from '$lib/utils/formatters';

  export let timeEntries: TimeEntry[];
  export let clientInfo: ClientInfo;
  export let invoiceInfo: InvoiceInfo;

  $: totalHours = timeEntries.reduce((sum, entry) => sum + parseFloat(entry.Hours), 0);
  $: totalAmount = totalHours * invoiceInfo.hourlyRate;
</script>

<div class="bg-white">
  <!-- Header -->
  <div class="bg-black text-white p-6 flex justify-between items-center">
    <div class="text-3xl font-light">INVOICE</div>
    <div class="text-right">
      <div class="text-sm">Amount Due (USD)</div>
      <div class="text-2xl">{formatCurrency(totalAmount)}</div>
    </div>
  </div>

  <!-- Content -->
  <div class="p-8">
    <!-- Client and Invoice Info -->
    <div class="grid grid-cols-2 gap-8 mb-8">
      <div>
        <div class="text-gray-600 mb-1">BILL TO</div>
        <div class="font-medium">{clientInfo.name || 'Client Name'}</div>
        <div>{clientInfo.company || 'FirstName LastName'}</div>
        <div>{clientInfo.address1 || 'Address Line 1'}</div>
        <div>{clientInfo.address2 || 'Address Line 2'}</div>
        <div>{clientInfo.city || 'City'}, {clientInfo.state || 'State'} {clientInfo.zip || 'ZipCode'}</div>
        <div>{clientInfo.country || 'United States'}</div>
        <div class="mt-2">{clientInfo.phone || '+1234567890'}</div>
        <div>{clientInfo.email || 'client@email.com'}</div>
      </div>
      <div class="text-right">
        <div class="mb-2">
          <span class="text-gray-600">Invoice Number: </span>
          <span>{invoiceInfo.number}</span>
          </div>
        <div class="mb-2">
          <span class="text-gray-600">Invoice Date: </span>
          <span>{invoiceInfo.date}</span>
          </div>
          <div>
          <span class="text-gray-600">Payment Due: </span>
          <span>{invoiceInfo.dueDate}</span>
        </div>
      </div>
    </div>

    <!-- Time Entries Table -->
    <div class="mb-8">
      <div class="grid grid-cols-4 text-gray-600 mb-2">
        <div>ITEMS</div>
        <div class="text-right">HOURS</div>
        <div class="text-right">RATE</div>
        <div class="text-right">AMOUNT</div>
      </div>
          {#each timeEntries as entry}
        <div class="grid grid-cols-4 py-2 border-t border-gray-200">
          <div>
                <div class="font-medium">{entry.Project}</div>
            <div class="text-gray-600">{entry.Task}</div>
          </div>
          <div class="text-right">{entry.Hours}</div>
          <div class="text-right">{formatCurrency(invoiceInfo.hourlyRate)}</div>
          <div class="text-right">{formatCurrency(parseFloat(entry.Hours) * invoiceInfo.hourlyRate)}</div>
        </div>
          {/each}
    </div>

    <!-- Totals -->
    <div class="border-t border-gray-200 pt-4">
      <div class="flex justify-between mb-2">
        <div class="text-gray-600">Total:</div>
        <div>{formatCurrency(totalAmount)}</div>
      </div>
      <div class="flex justify-between font-medium">
        <div>Amount Due (USD):</div>
        <div>{formatCurrency(totalAmount)}</div>
      </div>
    </div>
  </div>
</div>
