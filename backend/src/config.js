require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Dagrainion Warriors NFT";
const description = "5000 unique NFTs Returning Crypto Rewards back to the Hodlers";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

const layerConfigurations = [
  {
    growEditionSizeTo: 1800,
    layersOrder: [
      { name: "Background" },
      { name: "Angry Zelara Tenticals" },
      { name: "Angry Zelara Skin Colour" },
      { name: "Angry Zelara Assassin Mask" },
      { name: "Angry Zelara Body suit" },
      { name: "Angry Zelara Over suit" },
      { name: "Angry Zelara Left Hand Weapon" },
      { name: "Angry Zelara Right Hand Weapon" },
    ],
  },{
    growEditionSizeTo: 3000,
    layersOrder: [
      { name: "Background" },
      { name: "Zelara Tenticals" },
      { name: "Zelara Skin Colour" },
      { name: "Zelara Assassin Mask" },
      { name: "Zelara Body suit" },
      { name: "Zelara Over suit" },
    ],
  },{
    growEditionSizeTo: 3500,
    layersOrder: [
      { name: "Background" },
      { name: "Daglord Skin Colour" },
      { name: "Daglord Skirt" },
      { name: "Daglord Cape" },
      { name: "Daglord Bandages" },
      { name: "Daglord Belt" },
      { name: "Daglord Bag And Straps" },
      { name: "Daglord Jewellery" },
      { name: "Daglord Shoulder Armor" },
      { name: "Daglord Left Hand Weapon" },
      { name: "Daglord Bottles" },
      { name: "Daglord Right Hand Weapon" },
    ],
  },{
    growEditionSizeTo: 4300,
    layersOrder: [
      { name: "Background" },
      { name: "Dagroid Skin Colour" },
      { name: "Dagroid Shell Colour" },
      { name: "Dagroid Left Hand Weapon" },
      { name: "Dagroid Right Hand Weapon" },
    ],
  },{
    growEditionSizeTo: 5000,
    layersOrder: [
      { name: "Background" },
      { name: "Zeldar Skin Colour" },
      { name: "Zeldar Right Hand Weapon" },
      { name: "Zeldar Left Hand Weapon" },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 3000,
  height: 3000,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://dagrainion.com", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'rinkeby'; // only rinkeby, polygon, or ethereum

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'Dagrainion Warriors NFT';
const CONTRACT_SYMBOL = 'DWNFT';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0x2d16DFffDC77d45F8b88A6a5120cC3aa0Cc351Cf';
const TREASURY_ADDRESS = '0x6CA66a91a738488944c6d0d92A847D6E9CDB49A2';
const MAX_SUPPLY = 5000; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 0.001; // Minting price per NFT. Rinkeby = ETH, Ethereum = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 20; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-08-05T22:16:00+01:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-08-04T20:10:00+01:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 1500; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0x490683e9b66CF29F4A68F4E1D05256101C3fcA60"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = ["0xd5Eb337e5F8454A1DDFd1d90cEe8D7e4AC863124"]; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "0xee1FBb34fFd9daFF33AE0a6979B8AdF30B0feea4"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "Which Warrior will you mint to fight for your Rewards?"; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafybeib77tkjv6agj62nxbdbegikeaix7335d3udvhdwthnhp44casr3t4"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK") {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
