<script lang="ts">
	let { value = $bindable(false) } = $props();
</script>

<label class="switch">
	<input type="checkbox" bind:checked={value} />
	<span class="slider round"></span>
</label>

<style>
    .switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 22px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        inset: 0;
        background-color: #ccc;
        transition: 0.2s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.2s;
    }

    input:checked + .slider {
        background-color: var(--color-orange);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px var(--color-orange);
    }

    input:checked + .slider:before {
        transform: translateX(18px);
    }

    .slider.round {
        border-radius: 22px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>