# Divvy Web Components

## Toast Component

The Toast component provides a way to display non-intrusive notifications to users. It's mounted once in the root layout and can be triggered from any component in the application.

### Usage

1. The Toast component is already mounted in the root layout, so you don't need to add it to your components.

2. Import the toast store in your component:

```svelte
<script>
  import { toasts } from '$lib/stores/toast';
</script>
```

3. Trigger a toast notification using one of the following methods:

```js
// Success toast
toasts.success('Operation completed successfully!');

// Error toast
toasts.error('An error occurred!');

// Warning toast
toasts.warning('Please be careful!');

// Info toast
toasts.info('Here is some information.');
```

4. You can customize the timeout (in milliseconds) for each toast:

```js
// Toast will disappear after 5 seconds
toasts.success('Operation completed successfully!', 5000);
```

5. For more advanced usage, you can use the `add` method directly:

```js
toasts.add({
  message: 'Custom toast message',
  type: 'success', // 'success', 'error', 'warning', or 'info'
  timeout: 3000 // optional, defaults to 3000ms
});
```

### Features

- Four toast types: success, error, warning, and info
- Automatic dismissal after a configurable timeout
- Manual dismissal with a close button
- Smooth animations for appearance and disappearance
- Multiple toasts stack vertically
- Responsive design that works on all screen sizes
- Dark mode support

### Implementation Details

The Toast system consists of two main parts:

1. **Toast Component** (`/src/lib/components/Toast.svelte`): Handles the display of toast notifications.
2. **Toast Store** (`/src/lib/stores/toast.ts`): Manages the state of toasts and provides methods to trigger them.

The Toast component is mounted once in the root layout (`/src/routes/+layout.svelte`) and subscribes to the toast store to display notifications as they are added.