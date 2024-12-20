<script lang="ts">
  import type { TimeEntry } from '$lib/types';
  import { formatCurrency } from '$lib/utils/formatters';

  export let timeEntries: TimeEntry[] = [];
  export let hourlyRate: number = 0;

  let totalHours = 0;
  let totalAmount = 0;
  let editingIndex: number | null = null;
  let editingEntry: TimeEntry | null = null;

  $: {
    if (timeEntries && hourlyRate) {
      totalHours = timeEntries.reduce((sum, entry) => sum + parseFloat(entry.Hours), 0);
      totalAmount = totalHours * hourlyRate;
    }
  }

  function startEditing(index: number) {
    if (editingIndex === null) {
      editingIndex = index;
      editingEntry = { ...timeEntries[index] };
    }
  }

  function saveChanges() {
    if (editingIndex !== null && editingEntry) {
      const updatedEntries = timeEntries.map((entry, index) => 
        index === editingIndex ? editingEntry : entry
      );
      timeEntries = updatedEntries as TimeEntry[];
      editingIndex = null;
      editingEntry = null;
    }
  }

  function cancelEditing() {
    editingIndex = null;
    editingEntry = null;
  }
</script>

{#if timeEntries.length > 0}
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-900">Time Entries</h2>
      <div class="text-sm text-gray-500">
        Total Hours: <span class="font-medium">{totalHours.toFixed(1)}</span>
        <span class="mx-2">•</span>
        Total Amount: <span class="font-medium">{formatCurrency(totalAmount)}</span>
      </div>
    </div>

    <div class="relative overflow-hidden border border-gray-200 rounded-lg shadow">
      <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                Actions
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hours
              </th>
              <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each timeEntries as entry, index}
              <tr class="hover:bg-gray-50">
                {#if editingIndex === index && editingEntry}
                  <td class="px-4 py-2 whitespace-nowrap">
                    <div class="flex space-x-2">
                      <button
                        class="text-green-600 hover:text-green-800"
                        on:click={saveChanges}
                        title="Save changes"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        class="text-red-600 hover:text-red-800"
                        on:click={cancelEditing}
                        title="Cancel editing"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td class="px-4 py-2">
                    <input
                      type="date"
                      class="block w-full px-2 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
                      bind:value={editingEntry.Date}
                    />
                  </td>
                  <td class="px-4 py-2">
                    <input
                      type="text"
                      class="block w-full px-2 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
                      bind:value={editingEntry.Client}
                    />
                  </td>
                  <td class="px-4 py-2">
                    <input
                      type="text"
                      class="block w-full px-2 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
                      bind:value={editingEntry.Project}
                    />
                  </td>
                  <td class="px-4 py-2">
                    <input
                      type="text"
                      class="block w-full px-2 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
                      bind:value={editingEntry.Task}
                    />
                  </td>
                  <td class="px-4 py-2">
                    <input
                      type="number"
                      step="0.1"
                      class="block w-full px-0.5 py-0.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
                      bind:value={editingEntry.Hours}
                    />
                  </td>
                  <td class="px-4 py-2 text-right text-sm text-gray-500">
                    {formatCurrency(parseFloat(editingEntry.Hours) * (hourlyRate || 1))}
                  </td>
                {:else}
                  <td class="px-4 py-4 whitespace-nowrap">
                    <button
                      class="text-blue-600 hover:text-blue-800 transition-colors"
                      on:click={() => startEditing(index)}
                      title="Edit entry"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.Date}</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.Client}</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.Project}</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.Task}</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{entry.Hours}</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(parseFloat(entry.Hours) * hourlyRate)}
                  </td>
                {/if}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
{/if}
