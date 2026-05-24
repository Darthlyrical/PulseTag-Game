// PRACTICE 01 — Understanding Promises
//
// A Promise represents a value that isn't ready yet.
// When the work is done, you call resolve() to signal "finished."
//
// Run this file with: npx ts-node practice/01_promises.ts

// ---------------------------------------------------------
// EXAMPLE — read this, don't change it
// ---------------------------------------------------------

// This function returns a Promise that resolves after a fake delay.
// resolve() is called manually after 1 second using setTimeout.

function waitOneSecond(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

// ---------------------------------------------------------
// YOUR TURN — fill in the blanks
// ---------------------------------------------------------

// Task: Write a function called waitTwoSeconds.
// It should behave exactly like waitOneSecond, but wait 2000ms instead.

function waitTwoSeconds(): Promise<______> {
  return new ______((______) => {
    setTimeout(______, ______);
  });
}

// ---------------------------------------------------------
// TEST — don't change this, just run the file
// ---------------------------------------------------------

console.log("Waiting 2 seconds...");

waitTwoSeconds().then(() => {
  console.log("Done! If you see this after a pause, your function works.");
});
