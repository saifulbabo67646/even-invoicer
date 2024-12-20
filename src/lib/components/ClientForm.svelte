<script lang="ts">
  import type { ClientInfo } from '$lib/types';

  export let clientInfo: ClientInfo;
</script>

<div class="bg-white rounded-lg shadow p-6">
  <h2 class="text-xl font-semibold mb-6">Client Information</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="space-y-1.5">
      <label class="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        bind:value={clientInfo.name}
        placeholder="Enter client name"
        class="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
      />
    </div>
    <div class="space-y-1.5">
      <label class="block text-sm font-medium text-gray-700">Company</label>
      <input
        type="text"
        bind:value={clientInfo.company}
        placeholder="Enter company name"
        class="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
      />
    </div>
    <div class="space-y-1.5">
      <label class="block text-sm font-medium text-gray-700">Address Line 1</label>
      <input
        type="text"
        bind:value={clientInfo.address1}
        placeholder="Enter street address"
        class="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
      />
    </div>
    <div class="space-y-1.5">
      <label class="block text-sm font-medium text-gray-700">Address Line 2</label>
      <input
        type="text"
        bind:value={clientInfo.address2}
        placeholder="Apartment, suite, unit, etc."
        class="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
      />
    </div>
    <div class="space-y-1.5">
      <label class="block text-sm font-medium text-gray-700">City</label>
      <input
        type="text"
        bind:value={clientInfo.city}
        placeholder="Enter city"
        class="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
      />
    </div>
    <div class="space-y-1.5">
      <label class="block text-sm font-medium text-gray-700">State</label>
      <input
        type="text"
        bind:value={clientInfo.state}
        placeholder="Enter state"
        class="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
      />
    </div>
    <div class="space-y-1.5">
      <label class="block text-sm font-medium text-gray-700">ZIP Code</label>
      <input
        type="text"
        bind:value={clientInfo.zip}
        placeholder="Enter ZIP code"
        class="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
      />
    </div>
    <div class="space-y-1.5">
      <label class="block text-sm font-medium text-gray-700">Country</label>
      <input
        type="text"
        bind:value={clientInfo.country}
        placeholder="Enter country"
        class="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
      />
    </div>
    <div class="space-y-1.5">
      <label class="block text-sm font-medium text-gray-700">Phone</label>
      <input
        type="tel"
        bind:value={clientInfo.phone}
        placeholder="Enter phone number"
        class="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
      />
    </div>
    <div class="space-y-1.5">
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        bind:value={clientInfo.email}
        placeholder="Enter email address"
        class="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition duration-150"
      />
    </div>
  </div>
</div>