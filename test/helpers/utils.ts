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

const decodeBase64TokenURI = (str: string): string => {
  let [dataType, encodedString] = str.split(',');
  let buff = Buffer.from(encodedString, 'base64');
  let decodedString = buff.toString('ascii');
  return decodedString;
}

const tokenURIToImageSVG = (str: string): string => {
  const tokenURIString = decodeBase64TokenURI(str);
  const tokenURIObj = JSON.parse(tokenURIString);
  const imageData = tokenURIObj.image;
  const imageString = decodeBase64TokenURI(imageData);
  return imageString;
}

export {
  shouldThrow,
  decodeBase64TokenURI,
  tokenURIToImageSVG,
};