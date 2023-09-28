// Function to cause a delay in our application so that we can see the loading state.

export function sleep(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}