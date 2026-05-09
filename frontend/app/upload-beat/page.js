'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBeatMint } from '../../hooks/useBeatMint';
import { useWeb3 } from '../../hooks/useWeb3';
import { toast } from '../../utils/toast';
import { useSolanaProof } from '../../hooks/useSolanaProof';
import { sha256HexFromFile } from '../../utils/hash';
import Layout from '../../components/Layout';
import Toast from '../../components/Toast';
import { Upload, Music, Image as ImageIcon, X } from 'lucide-react';

export default function UploadBeat() {
  const router = useRouter();
  const { account } = useWeb3();
  const { mintBeat, isMinting, progress } = useBeatMint();
  const { postProof, isPosting } = useSolanaProof();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    genre: '',
    bpm: '',
    audioFile: null,
    imageFile: null,
    coverImage: '',
  });
  const [stemsFile, setStemsFile] = useState(null);
  const [proofSig, setProofSig] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleStemsChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) setStemsFile(files[0]);
  };

  const createSolanaProof = async () => {
    if (!formData.audioFile) throw new Error('Upload an audio file first');
    const audioHash = await sha256HexFromFile(formData.audioFile);
    const stemsHash = stemsFile ? await sha256HexFromFile(stemsFile) : null;

    const sig = await postProof({
      payload: {
        v: 1,
        kind: 'beat_proof',
        name: formData.name || 'Untitled beat',
        audioHash,
        stemsHash,
        createdAt: new Date().toISOString(),
      },
    });

    setProofSig(sig);
    toast.success(`Proof posted on Solana • ${sig.slice(0, 8)}…`);
    return sig;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    if (!formData.audioFile) {
      toast.error('Please upload an audio file');
      return;
    }

    if (!formData.name || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (!proofSig) {
        await createSolanaProof();
      }
      const result = await mintBeat(formData);
      toast.success(`Beat "${formData.name}" minted successfully!`);
      router.push(`/?tokenId=${result.tokenId}`);
    } catch (error) {
      toast.error(error.message || 'Failed to mint beat');
    }
  };

  return (
    <Layout>
      <Toast />
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto scrollbar-custom p-8 pt-20">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Upload Beat</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Beat Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Beat Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input w-full"
                  placeholder="Enter beat name"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="input w-full h-24"
                  placeholder="Describe your beat..."
                />
              </div>

              {/* Price & Genre */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Price (ETH) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="input w-full"
                    placeholder="0.1"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Genre</label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="input w-full"
                    placeholder="Hip-Hop, Trap, etc."
                  />
                </div>
              </div>

              {/* BPM */}
              <div>
                <label className="block text-sm font-semibold mb-2">BPM</label>
                <input
                  type="number"
                  name="bpm"
                  value={formData.bpm}
                  onChange={handleInputChange}
                  className="input w-full"
                  placeholder="140"
                />
              </div>

              {/* Copyright proof (Solana) */}
              <div className="card p-5">
                <p className="font-semibold mb-1">Copyright proof (Solana devnet)</p>
                <p className="text-sm text-gray-400 mb-4">
                  This posts SHA-256 hashes of your audio + optional stems pack on-chain (Solana Memo).
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Stem pack (optional)</label>
                    <input type="file" accept=".zip,.rar,.7z" onChange={handleStemsChange} className="input w-full p-2" />
                    {stemsFile && <p className="text-xs text-gray-500 mt-2 truncate">{stemsFile.name}</p>}
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      className="btn-secondary w-full"
                      onClick={async () => {
                        try {
                          await createSolanaProof();
                        } catch (err) {
                          toast.error(err.message || 'Failed to post proof');
                        }
                      }}
                      disabled={isPosting || !formData.audioFile}
                    >
                      {isPosting ? 'Posting proof…' : proofSig ? 'Proof posted' : 'Post proof on Solana'}
                    </button>
                  </div>
                </div>

                {proofSig && (
                  <div className="mt-4 rounded-xl border border-dark-border bg-dark-card p-3">
                    <p className="text-xs text-gray-500 mb-1">Proof transaction</p>
                    <p className="font-mono text-sm break-all">{proofSig}</p>
                  </div>
                )}
              </div>

              {/* Audio File Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2">Audio File *</label>
                <div className="border-2 border-dashed border-dark-border rounded-lg p-8 text-center hover:border-accent-green transition-colors">
                  <input
                    type="file"
                    name="audioFile"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="audio-upload"
                    required
                  />
                  <label htmlFor="audio-upload" className="cursor-pointer">
                    <Music className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400 mb-2">
                      {formData.audioFile ? formData.audioFile.name : 'Click to upload audio file'}
                    </p>
                    <p className="text-xs text-gray-500">MP3, WAV, or other audio formats</p>
                  </label>
                </div>
              </div>

              {/* Image File Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2">Cover Image</label>
                <div className="border-2 border-dashed border-dark-border rounded-lg p-8 text-center hover:border-accent-green transition-colors">
                  <input
                    type="file"
                    name="imageFile"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400 mb-2">
                      {formData.imageFile ? formData.imageFile.name : 'Click to upload cover image'}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, or other image formats</p>
                  </label>
                </div>
              </div>

              {/* Progress */}
              {isMinting && progress && (
                <div className="bg-dark-card rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">{progress}</p>
                  <div className="w-full bg-dark-surface rounded-full h-2">
                    <div className="bg-accent-green h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isMinting || !account}
                className="btn-primary w-full py-4 text-lg"
              >
                {isMinting ? 'Minting Beat...' : 'Mint Beat NFT'}
              </button>

              {!account && (
                <p className="text-center text-sm text-gray-400">
                  Please connect your wallet to upload beats
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

