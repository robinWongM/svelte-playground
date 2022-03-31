<script lang="ts">
	export let action, method, nodes = [], messages = [];
	let netid = '',
		password = '';

	import IconButton from '../lib/IconButton.svelte';
	import IconLark from '../assets/icon-lark-logo-outline.svg?raw';
	import IconWeChat from '../assets/icon-weixin.svg?raw';
	import IconGraduation from '../assets/icon-graduation.svg?raw';

	import ECNCLogo from '../assets/ecnc.svg';

	const loginByLark = () => {
		const button = document.querySelector('input[name="provider"][value="lark"]');
		(button as HTMLInputElement).click();
	};

	const loginByWeChat = () => {
		const button = document.querySelector('input[name="provider"][value="wecom"]');
		(button as HTMLInputElement).click();
	};

	const loginByPassword = () => {
		const button = document.querySelector('input[name="method"][value="password"]');
		(button as HTMLInputElement).click();
	};
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

{#if messages}
	<div class="bg-sky-600 fixed w-full bottom-0 left-0">
		<div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between flex-wrap">
				<div class="w-0 flex-1 flex items-center">
					{#each messages as message}
						<p class="font-medium text-white truncate">
							<span>{message.text}</span>
						</p>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

<div class="m-0 p-0 min-h-screen flex flex-col md:flex-row md:justify-end md:items-stretch">
	<div class="bg-image bg-cover bg-center flex-1 px-10 md:px-20 py-14">
		<img src={ECNCLogo} alt="ECNC Logo" class="w-20 h-20" />
	</div>
	<div
		class="bg-white w-full md:w-[432px] md:box-content px-10 py-12 md:px-20 flex-0 flex justify-center items-center"
	>
		<div class="w-full">
			<h1 class="text-sky-600 text-3xl mb-12 font-[Raleway]">Log In to ECNC Workspace</h1>
			<form on:submit|preventDefault={loginByPassword}>
				<div class="my-4">
					<input
						type="text"
						name="netid"
						class="mt-1 focus:ring-0 hover:bg-gray-200 focus:border-sky-500 border-2 focus:bg-transparent block w-full border-transparent bg-gray-100 rounded-md placeholder:opacity-60 transition-colors"
						placeholder="NetID"
						autofocus
						required
						bind:value={netid}
					/>
				</div>
				<div class="my-4">
					<input
						type="password"
						name="password"
						class="focus:ring-0 hover:bg-gray-200 focus:border-sky-500 border-2 focus:bg-transparent block w-full border-transparent bg-gray-100 rounded-md placeholder:opacity-60 transition-colors"
						placeholder="密码"
						required
						bind:value={password}
					/>
				</div>
				<input
					type="submit"
					class="mt-2 w-full cursor-pointer bg-white py-3 px-3 border border-gray-300 rounded-md shadow-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
					value="登录"
				/>
				<div class="relative flex py-8 items-center">
					<div class="flex-grow border-t-2 border-gray-200" />
					<span class="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
					<div class="flex-grow border-t-2 border-gray-200" />
				</div>
				<div class="flex">
					<IconButton
						label="飞书登录"
						variant="sky"
						class="flex-1 mr-2 md:mr-6"
						icon={IconLark}
						on:click={loginByLark}
					/>
					<IconButton
						label="微信登录"
						variant="gray"
						class="flex-1 mr-2 md:mr-6"
						icon={IconWeChat}
						disabled
					/>
					<IconButton
						label="CAS 登录"
						variant="gray"
						class="flex-1"
						icon={IconGraduation}
						disabled
					/>
				</div>
			</form>
		</div>
	</div>
</div>

<form {action} {method} class="hidden">
	{#each nodes as node}
		{#if node.type === 'input'}
			<input
				type={node.attributes.type}
				name={node.attributes.name}
				value={node.attributes.name === 'identifier'
					? netid
					: node.attributes.name === 'password'
					? password
					: node.attributes.value}
			/>
		{/if}
	{/each}
</form>

<style>
	.bg-image {
		background-image: url(https://s2.loli.net/2022/03/31/2zfek39LnFjJvmt.jpg);
	}
</style>
