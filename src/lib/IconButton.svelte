<script>
    import Icon from 'svelte-icon/Icon.svelte';

    let label = '', className = '', disabled = false, variant, icon;

    const variantClassName = {
        sky: 'text-sky-600 bg-sky-600 focus:ring-sky-200',
        green: 'text-green-600 bg-green-600 focus:ring-green-200',
        teal: 'text-teal-600 bg-teal-600 focus:ring-teal-200',
        gray: 'text-gray-400 bg-gray-600 focus:ring-gray-200',
    }

    const disabledClassName = disabled ? `cursor-not-allowed opacity-50` : `hover:text-white hover:bg-opacity-100`;

    export { label, className as class, disabled, variant, icon };
</script>

<button type="button" on:click class={`flex w-full flex-col items-center justify-center px-2 py-4 rounded-md bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${variantClassName[variant]} ${disabledClassName} ${className}`}>
    <Icon stroke="none" data={icon} width="32" height="32"></Icon>
    <span class="mt-2 text-base font-normal">{label}</span>
</button>