## FINCHECK - FRONTEND

To develop the Frontend of the Fincheck application we are using [React.js](https://react.dev/) and [Vite](https://vitejs.dev/)
along with [TailwindCSS](https://tailwindcss.com/) to style our application.

### Routing

For the routes we are using [React-Router-Dom](https://reactrouter.com/) for it and we created a router file that contains an AuthGuard to protect the routes
that can only be accessed when the user is logged or created an account.

### Authentication

For that we are using [React-Hook-Form](https://react-hook-form.com/) to handle the forms and all the things like validation, states, props, data of our form and
also with the help of [Zod](https://zod.dev/) to create the schemas for validation.

**OBS:** We passed the inputs the register and we had to use the **forwardRef()** in the input component, because we created a component for the input and we can not
pass props to components like that. This is why we used the **forwardRef()**. If our inputs were simple HTML inputs we wouldn't have to do that.

### Icons of the Application

For icons we used icons from [Radix](https://www.radix-ui.com/) the package we used from them was [@radix-ui/react-icons](https://www.npmjs.com/package/@radix-ui/react-icons).

### Conditional CSS Styling

When we ran into issues where we needed to apply conditional classes using TailwindCSS we had to install [CLSX](https://www.npmjs.com/package/clsx)
with [Tailwind-Merge](https://www.npmjs.com/package/tailwind-merge)

### Handle requests to the API

We are using [Axios](https://axios-http.com/) along with [React-Query](https://tanstack.com/) to make requests assynchronously and store data in a cache.

### Toast Messages

For Toast Messages throughout our application we are using [React-Hot-Toast](https://react-hot-toast.com/)

### Accounts to test signin

ramoneee@gmail.com  123456789
hramonper@gmail.com   12345666789
