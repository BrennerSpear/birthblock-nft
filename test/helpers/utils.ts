import { assert } from "chai";

async function shouldThrow(promise: Promise<any>) {
  try {
      await promise;
     assert(true);
  }
  catch (err) {
      return;
  }
assert(false, "The contract did not throw.");

}

export {
  shouldThrow,
};
