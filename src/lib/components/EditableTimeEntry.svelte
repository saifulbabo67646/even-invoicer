<script lang="ts">
  import type { TimeEntry } from '$lib/types';
  import { formatCurrency } from '$lib/utils/formatters';
  import { createEventDispatcher } from 'svelte';

  export let entry: TimeEntry;
  export let hourlyRate: number;
  export let index: number;

  const dispatch = createEventDispatcher<{
    update: { index: number; entry: TimeEntry };
  }>();

  let editing = false;
  let editedEntry: TimeEntry = { ...entry };

  function startEditing() {
    editing = true;
    editedEntry = { ...entry };
  }

  function saveChanges() {
    dispatch('update', { index, entry: editedEntry });
    editing = false;
  }

  function cancelEditing() {
    editing = false;
  }
</script>

<tr class="border-b hover:bg-gray-50">
  {#if editing}
    <td class="p-2">
      <input
        type="date"
        class="w-full px-2 py-1 border rounded"
        bind:value={editedEntry.Date}
      />
    </td>
    <td class="p-2">
      <input
        type="text"
        class="w-full px-2 py-1 border rounded"
        bind:value={editedEntry.Client}
      />
    </td>
    <td class="p-2">
      <input
        type="text"
        class="w-full px-2 py-1 border rounded"
        bind:value={editedEntry.Project}
      />
    </td>
    <td class="p-2">
      <input
        type="text"
        class="w-full px-2 py-1 border rounded"
        bind:value={editedEntry.Task}
      />
    </td>
    <td class="p-2">
      <input
        type="number"
        step="0.1"
        min="0"
        class="w-full px-2 py-1 border rounded text-right"
        bind:value={editedEntry.Hours}
      />
    </td>
    <td class="p-2 text-right">
      {formatCurrency(parseFloat(editedEntry.Hours) * hourlyRate)}
    </td>
    <td class="p-2 text-right">
      <button
        class="text-green-600 hover:text-green-800 mr-2"
        on:click={saveChanges}
      >
        Save
      </button>
      <button
        class="text-gray-600 hover:text-gray-800"
        on:click={cancelEditing}
      >
        Cancel
      </button>
    </td>
  {:else}
    <td class="p-2">{entry.Date}</td>
    <td class="p-2">{entry.Client}</td>
    <td class="p-2">{entry.Project}</td>
    <td class="p-2">{entry.Task}</td>
    <td class="p-2 text-right">{entry.Hours}</td>
    <td class="p-2 text-right">
      {formatCurrency(parseFloat(entry.Hours) * hourlyRate)}
    </td>
    <td class="p-2 text-right">
      <button
        class="text-blue-600 hover:text-blue-800"
        on:click={startEditing}
      >
        Edit
      </button>
    </td>
  {/if}
</tr>
