<script lang="ts">
    import { browser } from '$app/environment';
    import FileUpload from '$lib/components/FileUpload.svelte';
    import ClientForm from '$lib/components/ClientForm.svelte';
    import InvoiceForm from '$lib/components/InvoiceForm.svelte';
    import TimeEntriesTable from '$lib/components/TimeEntriesTable.svelte';
    import InvoicePreview from '$lib/components/InvoicePreview.svelte';
    import { generateInvoicePDF } from '$lib/utils/pdfGenerator';
    import type { TimeEntry, ClientInfo, InvoiceInfo } from '$lib/types';
  
    let timeEntries: TimeEntry[] = [];
    let clientInfo: ClientInfo = {
      name: '',
      company: '',
      address: '',
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
      if (!clientInfo.name || !clientInfo.email || !clientInfo.address) {
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
        error = err.message || 'Error generating PDF';
        console.error('Error generating PDF:', err);
      } finally {
        generating = false;
      }
    }
  </script>
  
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <!-- <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> -->
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 text-center mb-12">
        Time Report Invoice Generator
      </h1>
      <!-- <div class="grid grid-cols-1 xl:grid-cols-2 gap-8"> -->
        <!-- Left Column: Input Forms -->
      <div class="space-y-6">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <FileUpload on:entriesLoaded={handleEntriesLoaded} />
        </div>

        {#if timeEntries.length > 0}
          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <TimeEntriesTable 
              bind:timeEntries
              hourlyRate={invoiceInfo.hourlyRate}
            />
          </div>
        {/if}

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <ClientForm bind:clientInfo />
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <InvoiceForm bind:invoiceInfo />
        </div>

        {#if error}
          <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded" role="alert">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        {/if}

        <button
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          on:click={handleGenerateInvoice}
          disabled={generating || timeEntries.length === 0}
        >
          {#if generating}
            <span class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Invoice...
            </span>
          {:else}
            Generate Invoice PDF
          {/if}
        </button>


        <!-- Right Column: Preview -->
        <!-- {#if showPreview && timeEntries.length > 0}
          <div class="xl:sticky xl:top-8 space-y-6">
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <InvoicePreview {timeEntries} {clientInfo} {invoiceInfo} />
            </div>
          </div>
        {/if} -->
      </div>
    </div>
  </div>