<script lang="ts">
  import type { ClientInfo } from '$lib/types';

  export let clientInfo: ClientInfo;
</script>

<div class="border-b pb-6">
  <h2 class="text-xl font-semibold mb-4">Client Information</h2>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        bind:value={clientInfo.name}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Company</label>
      <input
        type="text"
        bind:value={clientInfo.company}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Address</label>
      <input
        type="text"
        bind:value={clientInfo.address}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        bind:value={clientInfo.email}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  </div>
</div>