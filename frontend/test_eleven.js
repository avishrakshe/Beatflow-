

async function test() {
  const apiKey = '84769e370a10754f9faf86e03558871040ef9aaad10bfd82faa00797c1ab7cf7';
  const selectedVoice = '21m00Tcm4TlvDq8ikWAM';
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text: 'Hello world',
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('ERROR:', res.status, text);
  } else {
    console.log('SUCCESS:', res.status);
  }
}

test();
