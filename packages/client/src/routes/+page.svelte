<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
</script>

<div class="flex h-screen w-full flex-col items-center justify-center bg-teal-600">
	<svg
		width="480"
		height="208"
		viewBox="0 0 480 208"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M47.304 122.828H129.648V73.115C129.648 67.275 127.531 62.311 123.297 58.223C119.063 53.989 114.026 51.872 108.186 51.872H47.304V122.828ZM26.061 164H6.351V51.872H47.523V10.7H108.186C125.414 10.7 140.087 16.832 152.205 29.096C164.469 41.214 170.601 55.887 170.601 73.115V164H26.061Z"
			fill="#DCF0FA"
		/>
		<path
			d="M300.057 51.872H341.01V71.801C341.01 88.737 335.024 103.191 323.052 115.163C311.08 127.135 296.699 133.121 279.909 133.121H217.932V164H176.76V10.7H300.057V51.872H217.932V91.949H279.909C285.457 91.949 290.202 89.978 294.144 86.036C298.086 82.094 300.057 77.349 300.057 71.801V51.872Z"
			fill="#DCF0FA"
		/>
		<path
			d="M413.31 51.872V164H372.138V51.872H310.599V10.7H474.849V51.872H413.31Z"
			fill="#DCF0FA"
		/>
	</svg>

	<Tabs.Root value="signup">
		<Tabs.List>
			<Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
			<Tabs.Trigger value="login">Log In</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="signup">
			<Button href="/signup" class="w-full p-4">Create New Account</Button>
		</Tabs.Content>
		<Tabs.Content value="login">
			<Button href="/login" class="w-full p-4">Log In</Button>
		</Tabs.Content>
	</Tabs.Root>
</div>
