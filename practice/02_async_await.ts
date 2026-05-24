// PRACTICE 02 — async / await
//
// async turns a function into one that can pause and wait.
// await pauses that function until a Promise resolves.
//
// Without await, code runs top to bottom instantly — no pausing.
// With await, you can pause at any line until the Promise is done.
//
// Run this file with: npx ts-node practice/02_async_await.ts

// ---------------------------------------------------------
// HELPER — already complete, don't change
// ---------------------------------------------------------

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------
// EXAMPLE — read this, don't change it
// ---------------------------------------------------------

// This async function logs three messages with a 1 second pause between each.
// Notice: the function signature uses "async" and returns Promise<void>.
// Notice: each sleep() call uses "await" to pause before moving to the next line.

async function exampleCountdown(): Promise<void> {
  console.log("3...");
  await sleep(1000);
  console.log("2...");
  await sleep(1000);
  console.log("1...");
  await sleep(1000);
  console.log("Go!");
}

// ---------------------------------------------------------
// YOUR TURN — fill in the blanks
// ---------------------------------------------------------

// Task: Write an async function called briefCountdown.
// It should:
//   1. log "Get ready..."
//   2. wait 1500ms
//   3. log "Game starting!"

______ function briefCountdown(): ______<void> {
  console.log("Get ready...");
  ______ sleep(______);
  console.log("Game starting!");
}

// ---------------------------------------------------------
// TEST — don't change this, just run the file
// ---------------------------------------------------------

briefCountdown();
