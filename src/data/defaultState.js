export const AURORA_PRESETS = [
  {
    id: 'aurora-maghrib',
    name: 'Maghrib Twilight (Opikz)',
    class: 'aurora-maghrib',
    textColor: '#FFFFFF',
    cardBgColor: 'rgba(15, 23, 42, 0.80)',
    cardTextColor: '#FFFFFF',
    previewGradient: 'linear-gradient(180deg, #070a14 0%, #131129 50%, #1f1430 100%)',
    badge: 'SIGNATURE',
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
    name: 'Cyber Fireflies',
    desc: 'Partikel emas (#facc15) & sky blue (#38bdf8) melayang',
  },
  {
    id: 'neural-matrix',
    name: 'Neural Matrix',
    desc: 'Jaringan titik konstelasi sci-fi saling terhubung',
  },
  {
    id: 'starfield',
    name: 'Maghrib Starfield',
    desc: 'Bintang senja berkedip lembut di latar belakang',
  },
  {
    id: 'none',
    name: 'Tanpa Partikel',
    desc: 'Latar bersih tanpa animasi partikel',
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
    enableTechBrackets: true,
    enableMottoTicker: true,
    mottoText: 'HIDUPLAH SEPERTI LARRY • THE SAGE & THE CREATOR • ANALITIS • VISIONER • EKSEKUTOR',
    showOrixBadge: true,
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
