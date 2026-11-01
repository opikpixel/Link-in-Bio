export const AURORA_PRESETS = [
  {
    id: 'aurora-maghrib',
    name: 'Maghrib Twilight (Scenic)',
    class: 'aurora-maghrib',
    textColor: '#FFFFFF',
    cardBgColor: 'rgba(15, 23, 42, 0.80)',
    cardTextColor: '#FFFFFF',
    previewGradient: 'linear-gradient(180deg, #070a14 0%, #131129 50%, #1f1430 100%)',
    badge: 'BRAND',
  },
  {
    id: 'aurora-northern',
    name: 'Northern Lights',
    class: 'aurora-northern',
    textColor: '#FFFFFF',
    cardBgColor: 'rgba(255, 255, 255, 0.12)',
    cardTextColor: '#FFFFFF',
    previewGradient: 'linear-gradient(-45deg, #090D16, #0D3B2E, #1E1B4B, #064E3B, #311042)',
  },
  {
    id: 'aurora-sunset',
    name: 'Sunset Horizon',
    class: 'aurora-sunset',
    textColor: '#FFFFFF',
    cardBgColor: 'rgba(255, 255, 255, 0.14)',
    cardTextColor: '#FFFFFF',
    previewGradient: 'linear-gradient(-45deg, #2E1065, #701A75, #BE123C, #FB923C, #4C1D95)',
  },
  {
    id: 'aurora-cyber',
    name: 'Cyber Nebula',
    class: 'aurora-cyber',
    textColor: '#FFFFFF',
    cardBgColor: 'rgba(255, 255, 255, 0.12)',
    cardTextColor: '#FFFFFF',
    previewGradient: 'linear-gradient(-45deg, #09090B, #1E1B4B, #0284C7, #7C3AED, #0F172A)',
  },
  {
    id: 'aurora-matcha',
    name: 'Matcha Spring',
    class: 'aurora-matcha',
    textColor: '#1A2E05',
    cardBgColor: 'rgba(255, 255, 255, 0.65)',
    cardTextColor: '#1A2E05',
    previewGradient: 'linear-gradient(-45deg, #ECFCCB, #D9F99D, #A7F3D0, #FEF08A, #CCFBF1)',
  },
  {
    id: 'aurora-cotton',
    name: 'Cotton Candy',
    class: 'aurora-cotton',
    textColor: '#4C1D95',
    cardBgColor: 'rgba(255, 255, 255, 0.60)',
    cardTextColor: '#4C1D95',
    previewGradient: 'linear-gradient(-45deg, #FFF1F2, #FCE7F3, #E0E7FF, #F3E8FF, #FFE4E6)',
  },
];

export const PARTICLE_PRESETS = [
  {
    id: 'cyber-fireflies',
    name: 'Kunang-Kunang Senja',
    tag: 'FIREFLIES',
    desc: 'Partikel emas (#facc15) & biru langit melayang lembut',
  },
  {
    id: 'starfield',
    name: 'Bintang Malam',
    tag: 'STARS',
    desc: 'Taburan bintang senja berkedip tenang',
  },
  {
    id: 'neural-matrix',
    name: 'Konstelasi Siber',
    tag: 'NODES',
    desc: 'Titik konstelasi dengan garis penghubung tipis',
  },
  {
    id: 'none',
    name: 'Tanpa Partikel',
    tag: 'OFF',
    desc: 'Latar bersih tanpa partikel melayang',
  },
];

export const DEFAULT_STATE = {
  slug: 'lutfi',
  profile: {
    name: 'Lutfi Alhamsyah',
    role: 'IT Project Manager | IT Cloud | Informatics Student',
    bio: 'Membangun aplikasi web, sistem AI, dan berbagi catatan seputar teknologi.',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Lutfi',
  },
  appearance: {
    bgMode: 'aurora', // 'aurora' | 'image' | 'solid'
    auroraClass: 'aurora-maghrib',
    showScenicLandscape: true, // Pemandangan bulan, pohon, dan gunung senja
    customImageData: '',
    imageOverlayOpacity: 45,
    imageBlurPx: 4,
    solidBgColor: '#070a14',
    textColor: '#FFFFFF',
    cardBgColor: 'rgba(15, 23, 42, 0.80)',
    cardTextColor: '#FFFFFF',
    buttonStyle: 'pill-ghost', // 'pill-ghost' | 'glass'
    particleEffect: 'cyber-fireflies', // 'cyber-fireflies' | 'neural-matrix' | 'starfield' | 'none'
    enableTypewriter: true,
    enableKineticHeader: false,
    showOrixPet: true, // Tampilkan Pet Interaktif Orix di halaman publik
  },
  links: [
    {
      id: 'lnk-1',
      title: 'Portofolio GitHub',
      url: 'https://github.com/lutfi',
      iconType: 'preset',
      iconValue: 'github',
      enabled: true,
      clicks: 42,
    },
    {
      id: 'lnk-2',
      title: 'Follow Instagram',
      url: 'https://instagram.com/lutfi',
      iconType: 'preset',
      iconValue: 'instagram',
      enabled: true,
      clicks: 29,
    },
    {
      id: 'lnk-3',
      title: 'Kanal YouTube Tech',
      url: 'https://youtube.com/@lutfi',
      iconType: 'preset',
      iconValue: 'youtube',
      enabled: true,
      clicks: 18,
    },
    {
      id: 'lnk-4',
      title: 'Hubungi via WhatsApp',
      url: 'https://wa.me/6281234567890',
      iconType: 'preset',
      iconValue: 'whatsapp',
      enabled: true,
      clicks: 35,
    }
  ],
  analytics: {
    totalViews: 145,
  }
};

export function autoDetectIcon(url) {
  if (!url) return null;
  const u = url.toLowerCase();
  if (u.includes('instagram.com')) return 'instagram';
  if (u.includes('tiktok.com')) return 'tiktok';
  if (u.includes('threads.net')) return 'threads';
  if (u.includes('x.com') || u.includes('twitter.com')) return 'x';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('github.com')) return 'github';
  if (u.includes('discord.com') || u.includes('discord.gg')) return 'discord';
  if (u.includes('wa.me') || u.includes('whatsapp.com')) return 'whatsapp';
  if (u.includes('linkedin.com')) return 'linkedin';
  if (u.includes('medium.com')) return 'medium';
  if (u.includes('roblox.com')) return 'roblox';
  return null;
}

export function compressImageFile(file, maxWidth, quality, cb) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let w = img.width;
      let h = img.height;
      if (w > maxWidth) {
        h = Math.round((h * maxWidth) / w);
        w = maxWidth;
      }
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      cb(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
