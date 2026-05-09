// Mock beat data for BeatFlow UI (no backend / blockchain wired yet)
// Each beat carries enough info to drive cards, details panel, and player

const trending = [
  {
    id: 'cosmic-trap',
    title: 'Cosmic Trap',
    producer: 'AstroBeats',
    genre: 'Trap',
    bpm: 142,
    priceEth: '0.5',
    likes: 10234,
    plays: 58421,
    cover: '/images/beats/cosmic-trap.jpg', // placeholder path, can be replaced
    owned: true,
    tokenId: 1,
    contractShort: '0xAB5D...9F3c',
    remixes: [
      {
        id: 'cosmic-trap-lunar',
        title: 'Cosmic Trap – Lunar Flip',
        artist: 'MC Lyrical',
        plays: 9550,
      },
    ],
  },
  {
    id: 'future-funk',
    title: 'Future Funk',
    producer: 'NeonWaves',
    genre: 'Future Funk',
    bpm: 124,
    priceEth: '0.35',
    likes: 8743,
    plays: 40112,
    cover: '/images/beats/future-funk.jpg',
    owned: false,
    tokenId: 2,
    contractShort: '0xAB5D...9F3c',
    remixes: [],
  },
  {
    id: 'midnight-drive',
    title: 'Midnight Drive',
    producer: 'CitySkies',
    genre: 'Synthwave',
    bpm: 110,
    priceEth: '0.42',
    likes: 12301,
    plays: 64012,
    cover: '/images/beats/midnight-drive.jpg',
    owned: false,
    tokenId: 3,
    contractShort: '0xAB5D...9F3c',
    remixes: [],
  },
];

const newReleases = [
  {
    id: 'stardust-flow',
    title: 'Stardust Flow',
    producer: 'LunaVerse',
    genre: 'Boom Bap',
    bpm: 96,
    priceEth: '0.3',
    likes: 3123,
    plays: 11024,
    cover: '/images/beats/stardust-flow.jpg',
    owned: false,
    tokenId: 4,
    contractShort: '0xAB5D...9F3c',
    remixes: [],
  },
  {
    id: 'galaxy-rap',
    title: 'Galaxy Rap',
    producer: 'Orbit',
    genre: 'Trap',
    bpm: 150,
    priceEth: '0.25',
    likes: 5321,
    plays: 20054,
    cover: '/images/beats/galaxy-rap.jpg',
    owned: false,
    tokenId: 5,
    contractShort: '0xAB5D...9F3c',
    remixes: [],
  },
];

const communityRemixes = [
  {
    id: 'cosmic-remix-galactic',
    title: 'Cosmic Trap – Galactic Remix',
    producer: 'MC Lyrical',
    genre: 'Experimental',
    bpm: 144,
    priceEth: '0.18',
    likes: 6421,
    plays: 31004,
    cover: '/images/beats/cosmic-remix.jpg',
    owned: false,
    tokenId: 11,
    contractShort: '0xAB5D...9F3c',
    remixes: [],
  },
];

const beats = {
  trending,
  newReleases,
  communityRemixes,
};

export default beats;


