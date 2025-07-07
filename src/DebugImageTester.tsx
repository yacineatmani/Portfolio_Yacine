import React from 'react';

const imageNames = [
  'profile/YacineProfile.JPG', // exemple profil
  'projects/01JZ6B6MW84YMJP3D1PS5CGC8M.png', // exemple projet
];

const basePaths = [
  '/portifolio_Yacine/storage/',
  '/storage/',
  'storage/',
  '/portifolio_Yacine/public/storage/',
  '/public/storage/',
];

export default function DebugImageTester() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Debug des chemins d’images</h2>
      {imageNames.map((img, idx) => (
        <div key={img} style={{ marginBottom: 30 }}>
          <h4>Image test : {img}</h4>
          <div style={{ display: 'flex', gap: 20 }}>
            {basePaths.map((base) => {
              const url = base + img;
              return (
                <div key={base} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 12, marginBottom: 5 }}>{url}</div>
                  <img
                    src={url}
                    alt={url}
                    style={{ width: 120, height: 120, objectFit: 'cover', border: '1px solid #ccc' }}
                    onError={(e) => {
                      e.currentTarget.style.opacity = 0.3;
                      e.currentTarget.title = 'Erreur de chargement';
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
