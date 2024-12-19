<script lang="ts">
  import { onMount } from 'svelte';
  
  let container: HTMLElement;
  let resizer: HTMLElement;
  let leftPanel: HTMLElement;
  let rightPanel: HTMLElement;
  let isResizing = false;
  let initialX: number;
  let startWidth: number;

  export let minLeftWidth = 300;
  export let minRightWidth = 300;
  export let defaultLeftWidth = 500;

  onMount(() => {
    leftPanel.style.width = `${defaultLeftWidth}px`;
  });

  function startResize(e: MouseEvent) {
    isResizing = true;
    initialX = e.clientX;
    startWidth = leftPanel.offsetWidth;

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
  }

  function resize(e: MouseEvent) {
    if (!isResizing) return;

    const containerWidth = container.offsetWidth;
    const diff = e.clientX - initialX;
    const newLeftWidth = Math.min(
      Math.max(minLeftWidth, startWidth + diff),
      containerWidth - minRightWidth
    );

    leftPanel.style.width = `${newLeftWidth}px`;
  }

  function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
  }
</script>

<div 
  class="flex h-full"
  bind:this={container}
>
  <div 
    class="overflow-y-auto"
    bind:this={leftPanel}
  >
    <slot name="left" />
  </div>

  <div 
    class="w-2 bg-gray-100 hover:bg-blue-100 cursor-col-resize transition-colors duration-150 flex-shrink-0 relative group"
    bind:this={resizer}
    on:mousedown={startResize}
    title="Drag to resize panels"
  >
    <!-- Wider click area -->
    <div class="absolute inset-y-0 -left-1 -right-1"></div>
    
    <!-- Visible handle bars -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="space-x-0.5 flex items-center">
        <div class="w-0.5 h-8 bg-gray-400 rounded group-hover:bg-blue-500 transition-colors duration-150"></div>
        <div class="w-0.5 h-8 bg-gray-400 rounded group-hover:bg-blue-500 transition-colors duration-150"></div>
      </div>
    </div>

    <!-- Tooltip -->
    <div class="absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-2 bg-gray-800 text-white text-sm px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
      Drag to resize
    </div>
  </div>

  <div 
    class="flex-1 overflow-y-auto"
    bind:this={rightPanel}
  >
    <slot name="right" />
  </div>
</div>

<style>
  :global(body) {
    overflow: hidden;
  }
</style>
