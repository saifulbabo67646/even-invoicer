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
      timeEntries = updatedEntries;
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

    <div class="overflow-x-auto">
      <div class="inline-block min-w-full align-middle">
        <div class="overflow-hidden border border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Project</th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Task</th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each timeEntries as entry, index}
                <tr class="hover:bg-gray-50">
                  {#if editingIndex === index && editingEntry}
                    <td class="px-4 py-2">
                      <input
                        type="date"
                        bind:value={editingEntry.Date}
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                    <td class="px-4 py-2">
                      <input
                        type="text"
                        bind:value={editingEntry.Client}
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                    <td class="px-4 py-2 hidden md:table-cell">
                      <input
                        type="text"
                        bind:value={editingEntry.Project}
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                    <td class="px-4 py-2 hidden lg:table-cell">
                      <input
                        type="text"
                        bind:value={editingEntry.Task}
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                    <td class="px-4 py-2">
                      <input
                        type="number"
                        bind:value={editingEntry.Hours}
                        step="0.1"
                        min="0"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                    <td class="px-4 py-2 text-right space-x-2">
                      <button
                        on:click={saveChanges}
                        class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Save
                      </button>
                      <button
                        on:click={cancelEditing}
                        class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                    </td>
                  {:else}
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.Date}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.Client}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{entry.Project}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{entry.Task}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.Hours}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        on:click={() => startEditing(index)}
                        class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-blue-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Edit
                      </button>
                    </td>
                  {/if}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
{/if}