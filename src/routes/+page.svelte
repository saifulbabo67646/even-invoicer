<script lang="ts">
  import { browser } from '$app/environment';
  import FileUpload from '$lib/components/FileUpload.svelte';
  import ClientForm from '$lib/components/ClientForm.svelte';
  import InvoiceForm from '$lib/components/InvoiceForm.svelte';
  import TimeEntriesTable from '$lib/components/TimeEntriesTable.svelte';
  import InvoicePreview from '$lib/components/InvoicePreview.svelte';
  import ResizablePanel from '$lib/components/ResizablePanel.svelte';
  import { generateInvoicePDF } from '$lib/utils/pdfGenerator';
  import type { TimeEntry, ClientInfo, InvoiceInfo } from '$lib/types';

  let timeEntries: TimeEntry[] = [];
  let clientInfo: ClientInfo = {
    name: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
    email: ''
  };
  let invoiceInfo: InvoiceInfo = {
    number: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    hourlyRate: 0
  };

  let generating = false;
  let error = '';
  let showPreview = false;
  
  function handleEntriesLoaded(event: CustomEvent<TimeEntry[]>) {
    const entries = event.detail;
    if (Array.isArray(entries) && entries.length > 0) {
      timeEntries = entries;
      error = '';
      showPreview = true;
    } else {
      error = 'No valid entries found in the CSV file';
      showPreview = false;
    }
  }

  function handleTimeEntriesUpdate(event: CustomEvent<TimeEntry[]>) {
    const newEntries = event.detail;
    if (Array.isArray(newEntries) && newEntries.length > 0) {
      timeEntries = [...newEntries];
    }
  }

  function validateForm(): boolean {
    if (timeEntries.length === 0) {
      error = 'Please upload a time report CSV file';
      return false;
    }
    if (!clientInfo.name || !clientInfo.email || !clientInfo.address1) {
      error = 'Please fill in all required client information';
      return false;
    }
    if (!invoiceInfo.number || !invoiceInfo.date || !invoiceInfo.dueDate || !invoiceInfo.hourlyRate) {
      error = 'Please fill in all invoice information including hourly rate';
      return false;
    }
    return true;
  }

  async function handleGenerateInvoice() {
    if (!browser) return;
    
    error = '';
    if (!validateForm()) return;

    generating = true;
    try {
      await generateInvoicePDF(timeEntries, clientInfo, invoiceInfo);
    } catch (err) {
      error = err instanceof Error ? err.message : 'Error generating PDF';
      console.error('Error generating PDF:', err);
    } finally {
      generating = false;
    }
  }
</script>

<div class="h-screen pb-16 flex flex-col bg-gray-50">
  <header class="bg-white shadow-sm px-4 py-3 flex-shrink-0">
    <h1 class="text-2xl font-bold text-center">
      Time Report Invoice Generator
    </h1>
  </header>

  <ResizablePanel>
    <div slot="left" class="h-full p-4 space-y-4">
      <!-- Upload Section -->
      <div class="bg-white rounded-lg shadow p-6">
        <FileUpload on:entriesLoaded={handleEntriesLoaded} />
      </div>

      <!-- Client Information -->
      <div class="bg-white rounded-lg shadow p-6">
        <ClientForm bind:clientInfo />
      </div>

      <!-- Invoice Information -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Invoice Information</h2>
        <InvoiceForm bind:invoiceInfo />
      </div>

      {#if error}
        <div class="bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      {/if}

      <!-- Time Entries Table -->
      {#if timeEntries.length > 0}
        <div class="bg-white rounded-lg shadow p-6">
          <TimeEntriesTable 
            bind:timeEntries
            hourlyRate={invoiceInfo.hourlyRate}
          />
        </div>
      {/if}

      <!-- Generate PDF Button -->
      <button
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        on:click={handleGenerateInvoice}
        disabled={generating}
      >
        {#if generating}
          Generating Invoice PDF...
        {:else}
          Generate Invoice PDF
        {/if}
      </button>
    </div>

    <div slot="right" class="h-full p-4">
      {#if showPreview}
        <div class="bg-white rounded-lg shadow p-6 sticky top-4">
          <InvoicePreview
            {timeEntries}
            {clientInfo}
            {invoiceInfo}
          />
        </div>
      {:else}
        <div class="flex items-center justify-center h-full text-gray-500">
          <div class="text-center">
            <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-lg">Upload a time report to preview invoice</p>
          </div>
        </div>
      {/if}
    </div>
  </ResizablePanel>
</div>

<style>
  :global(html, body) {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  :global(.scrollbar-thin::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }

  :global(.scrollbar-thin::-webkit-scrollbar-track) {
    background: #f1f1f1;
    border-radius: 4px;
  }

  :global(.scrollbar-thin::-webkit-scrollbar-thumb) {
    background: #888;
    border-radius: 4px;
  }

  :global(.scrollbar-thin::-webkit-scrollbar-thumb:hover) {
    background: #666;
  }
</style>