<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { TimeEntry } from '$lib/types';
  import { parseTimeEntries } from '$lib/utils/csvParser';

  const dispatch = createEventDispatcher<{
    entriesLoaded: TimeEntry[];
  }>();

  let error = '';
  let loading = false;
  let fileName = '';

  async function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (!file.name.toLowerCase().endsWith('.csv')) {
        error = 'Please upload a CSV file';
        return;
      }

      error = '';
      loading = true;
      fileName = file.name;
      
      try {
        console.log('Processing file:', file.name);
        const entries = await parseTimeEntries(file);
        console.log('Entries loaded:', entries);
        dispatch('entriesLoaded', entries);
      } catch (e) {
        console.error('File upload error:', e);
        error = e.message || 'Error processing CSV file';
        fileName = '';
      } finally {
        loading = false;
      }
    }
  }
</script>

<div class="border-b pb-6">
  <h2 class="text-xl font-semibold mb-4">Upload Time Report</h2>
  
  <div class="space-y-4">
    <div class="flex items-center justify-center w-full">
      <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          {#if loading}
            <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          {:else if fileName}
            <svg class="w-8 h-8 mb-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          {:else}
            <svg class="w-8 h-8 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          {/if}
          
          {#if loading}
            <p class="mb-2 text-sm text-gray-500">Processing file...</p>
          {:else if fileName}
            <p class="mb-2 text-sm text-gray-500">{fileName}</p>
            <p class="text-xs text-gray-500">Click or drag to upload another file</p>
          {:else}
            <p class="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
            <p class="text-xs text-gray-500">CSV files only</p>
          {/if}
        </div>
        <input
          type="file"
          accept=".csv"
          on:change={handleFileUpload}
          class="hidden"
          disabled={loading}
        />
      </label>
    </div>

    {#if error}
      <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{error}</span>
      </div>
    {/if}
  </div>
</div>