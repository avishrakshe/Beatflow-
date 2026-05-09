/**
 * ElevenLabs client helper
 * Calls internal API route so API key remains server-side.
 */
export async function generateVoicePreview(text, voiceId) {
  const res = await fetch('/api/elevenlabs/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voiceId }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to generate voice preview');
  }

  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

