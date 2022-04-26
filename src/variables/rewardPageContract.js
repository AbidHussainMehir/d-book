export const REWARD_ADDRESS = "0x7c17d3ce4bf8709de9c2ce815aa963a5879107c1";
export const REWARD_ADDRESST20 = "0x7C17D3CE4bf8709DE9C2Ce815AA963a5879107c1";

export const REWARD_ABI = [
  {
    inputs: [
      {
        internalType: "contract StandardToken",
        name: "standardToken_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      { internalType: "contract DBToken", name: "_token", type: "address" },
      { internalType: "string", name: "_eventCode", type: "string" },
      { internalType: "string", name: "_teamName", type: "string" },
    ],
    name: "addDBTokenReference",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "eventCode", type: "string" }],
    name: "endSaleNow",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllSales",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "saleStart", type: "uint256" },
          { internalType: "uint256", name: "saleEnd", type: "uint256" },
        ],
        internalType: "struct SaleFactory.Sale[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "eventCode", type: "string" },
      { internalType: "string", name: "teamName", type: "string" },
    ],
    name: "getRate",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "numerator", type: "uint256" },
          { internalType: "uint256", name: "denominator", type: "uint256" },
        ],
        internalType: "struct DBTokenReward.Ratio",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_eventCode", type: "string" },
      { internalType: "string", name: "_teamName", type: "string" },
    ],
    name: "getToken",
    outputs: [{ internalType: "contract DBToken", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isPaused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "eventCode", type: "string" }],
    name: "isSaleOn",
    outputs: [
      { internalType: "bool", name: "saleActive", type: "bool" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
      { internalType: "uint256", name: "saleEnd", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "eventCode", type: "string" },
      { internalType: "string", name: "teamName", type: "string" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "sellTokens",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "eventCode", type: "string" },
      { internalType: "string", name: "teamName", type: "string" },
      { internalType: "uint256", name: "numerator", type: "uint256" },
      { internalType: "uint256", name: "denominator", type: "uint256" },
    ],
    name: "setRate",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "eventCode", type: "string" },
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "end", type: "uint256" },
    ],
    name: "setSaleStartEnd",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "string", name: "eventCode", type: "string" },
      { internalType: "string", name: "teamName", type: "string" },
    ],
    name: "standardTokensFor",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "time",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unPause",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
