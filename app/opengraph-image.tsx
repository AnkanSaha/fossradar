import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "FOSSRadar.in - India's Open Source Directory";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '50px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            📡
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                color: '#000080',
                letterSpacing: '-2px',
                textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)',
                display: 'flex',
              }}
            >
              fossradar
            </div>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#1D9BF0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(29, 155, 240, 0.4)',
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: '40px',
            color: '#000080',
            textAlign: 'center',
            maxWidth: '900px',
            fontWeight: '600',
            textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)',
          }}
        >
          India's Open Source Directory
        </div>
        <div
          style={{
            fontSize: '28px',
            color: '#000080',
            marginTop: '20px',
            textAlign: 'center',
            opacity: 0.8,
          }}
        >
          Discover · Explore · Contribute
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
