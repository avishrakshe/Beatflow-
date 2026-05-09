'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRemix } from '../../hooks/useRemix';
import { useWeb3 } from '../../hooks/useWeb3';
import { toast } from '../../utils/toast';
import { useSolanaProof } from '../../hooks/useSolanaProof';
import { sha256HexFromFile } from '../../utils/hash';
import Layout from '../../components/Layout';
import Toast from '../../components/Toast';
import { Upload, Music, Image as ImageIcon } from 'lucide-react';

export default function UploadRemix() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const beatId = searchParams.get('beatId');
  
  const { account } = useWeb3();
  const { uploadRemix, checkOwnership, isUploading, progress } = useRemix();
  const { postProof, isPosting } = useSolanaProof();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    audioFile: null,
    imageFile: null,
    originalBeatNFTId: beatId ? parseInt(beatId) : '',
  });
  const [stemsFile, setStemsFile] = useState(null);
  const [originalProofSig, setOriginalProofSig] = useState('');
  const [remixProofSig, setRemixProofSig] = useState('');

  const [ownsBeat, setOwnsBeat] = useState(false);
  const [checkingOwnership, setCheckingOwnership] = useState(true);

  useEffect(() => {
    const verifyOwnership = async () => {
      if (account && formData.originalBeatNFTId) {
        setCheckingOwnership(true);
        const owns = await checkOwnership(formData.originalBeatNFTId);
        setOwnsBeat(owns);
        setCheckingOwnership(false);
      } else {
        setCheckingOwnership(false);
      }
    };

    verifyOwnership();
  }, [account, formData.originalBeatNFTId, checkOwnership]);

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

  const postRemixProof = async () => {
    if (!formData.audioFile) throw new Error('Upload remix audio first');
    if (!originalProofSig) throw new Error('Paste original beat proof tx signature');

    const audioHash = await sha256HexFromFile(formData.audioFile);
    const stemsHash = stemsFile ? await sha256HexFromFile(stemsFile) : null;

    const sig = await postProof({
      payload: {
        v: 1,
        kind: 'remix_proof',
        name: formData.name || 'Untitled remix',
        audioHash,
        stemsHash,
        originalProofSig,
        createdAt: new Date().toISOString(),
      },
    });

    setRemixProofSig(sig);
    toast.success(`Remix proof posted • ${sig.slice(0, 8)}…`);
    return sig;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    if (!ownsBeat) {
      toast.error('You must own the original beat NFT to create a remix');
      return;
    }

    if (!formData.audioFile) {
      toast.error('Please upload an audio file');
      return;
    }

    if (!formData.name || !formData.originalBeatNFTId) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (!remixProofSig) {
        await postRemixProof();
      }
      const result = await uploadRemix(formData);
      toast.success(`Remix "${formData.name}" uploaded successfully!`);
      router.push('/');
    } catch (error) {
      toast.error(error.message || 'Failed to upload remix');
    }
  };

  return (
    <Layout>
      <Toast />
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto scrollbar-custom p-8 pt-20">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Upload Remix</h1>

            {checkingOwnership ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-green mx-auto mb-4"></div>
                <p className="text-gray-400">Checking ownership...</p>
              </div>
            ) : !ownsBeat ? (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 text-center">
                <p className="text-red-400 mb-4">
                  You must own the original beat NFT to create a remix.
                </p>
                <button
                  onClick={() => router.push('/')}
                  className="btn-secondary"
                >
                  Go to Marketplace
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Original Beat ID */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Original Beat NFT ID *</label>
                  <input
                    type="number"
                    name="originalBeatNFTId"
                    value={formData.originalBeatNFTId}
                    onChange={handleInputChange}
                    className="input w-full"
                    placeholder="1"
                    required
                  />
                </div>

                {/* Remix Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Remix Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input w-full"
                    placeholder="Enter remix name"
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
                    placeholder="Describe your remix..."
                  />
                </div>

                {/* Copyright proof (Solana) */}
                <div className="card p-5">
                  <p className="font-semibold mb-1">Copyright proof (Solana devnet)</p>
                  <p className="text-sm text-gray-400 mb-4">
                    Post your remix hashes on-chain and link it to the original beat proof tx signature.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Original beat proof tx *</label>
                      <input
                        type="text"
                        value={originalProofSig}
                        onChange={(e) => setOriginalProofSig(e.target.value.trim())}
                        className="input w-full font-mono"
                        placeholder="Paste Solana tx signature"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Stem pack (optional)</label>
                      <input type="file" accept=".zip,.rar,.7z" onChange={handleStemsChange} className="input w-full p-2" />
                      {stemsFile && <p className="text-xs text-gray-500 mt-2 truncate">{stemsFile.name}</p>}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="btn-secondary w-full"
                      onClick={async () => {
                        try {
                          await postRemixProof();
                        } catch (err) {
                          toast.error(err.message || 'Failed to post proof');
                        }
                      }}
                      disabled={isPosting || !formData.audioFile || !originalProofSig}
                    >
                      {isPosting ? 'Posting proof…' : remixProofSig ? 'Proof posted' : 'Post remix proof on Solana'}
                    </button>
                  </div>

                  {remixProofSig && (
                    <div className="mt-4 rounded-xl border border-dark-border bg-dark-card p-3">
                      <p className="text-xs text-gray-500 mb-1">Remix proof transaction</p>
                      <p className="font-mono text-sm break-all">{remixProofSig}</p>
                    </div>
                  )}
                </div>

                {/* Audio File Upload */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Remix Audio File *</label>
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
                        {formData.audioFile ? formData.audioFile.name : 'Click to upload remix audio'}
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
                {isUploading && progress && (
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
                  disabled={isUploading || !account || !ownsBeat}
                  className="btn-primary w-full py-4 text-lg"
                >
                  {isUploading ? 'Uploading Remix...' : 'Upload Remix'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

