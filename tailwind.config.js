/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        // Official Theme Palette (Pure White, Ice Blue, Royal Blue, Deep Navy, Soft Blue, Slate Gray)
        primaryRoyalBlue: '#2563EB',
        secondaryBlue: '#3B82F6',
        deepNavy: '#172554',
        headingNavy: '#172554',
        mainPageBg: '#F4F7FF',
        secondaryBg: '#EFF6FF',
        softBlueGradient: '#DBEAFE',
        sectionBg: '#F4F7FF',
        whiteSurface: '#FFFFFF',
        pureWhite: '#FFFFFF',
        iceBlue: '#F4F7FF',
        softBlue: '#DBEAFE',
        slateGray: '#64748B',
        cardBg: '#FFFFFF',
        secondaryCardBg: '#F8FAFC',
        lightBlueCard: '#EFF6FF',
        cardBorder: '#DBEAFE',
        divider: '#DBEAFE',
        primaryText: '#172554',
        secondaryText: '#64748B',
        mutedText: '#64748B',
        highlightedText: '#2563EB',
        btnBlueHover: '#1D4ED8',

        // Abstract Geometric Blue Theme Palette Tokens
        pastelSky: '#B9E6F7',
        softCyan: '#A9DFF3',
        paleBlue: '#D6F0FA',
        veryLightBlue: '#EAF7FC',

        // Unified semantic tokens
        royalBlue: {
          DEFAULT: '#2563EB',
          50: '#F4F7FF',
          100: '#EFF6FF',
          200: '#DBEAFE',
          300: '#BFDBFE',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#172554',
        },
        softWhite: '#FFFFFF',
        steelGray: '#64748B',
        darkNavy: '#172554',
        paleBorder: '#DBEAFE',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'section-heading': ['var(--font-size-section-heading)', { lineHeight: '1.2', fontWeight: '800' }],
        'section-subtitle': ['var(--font-size-section-subtitle)', { lineHeight: '1.6', fontWeight: '400' }],
        'card-heading': ['var(--font-size-card-heading)', { lineHeight: '1.35', fontWeight: '700' }],
        'card-title': ['var(--font-size-card-title)', { lineHeight: '1.4', fontWeight: '600' }],
        'body-paragraph': ['var(--font-size-body-paragraph)', { lineHeight: '1.65', fontWeight: '400' }],
        'secondary-text': ['var(--font-size-secondary-text)', { lineHeight: '1.5', fontWeight: '400' }],
        'metadata': ['var(--font-size-metadata)', { lineHeight: '1.4', fontWeight: '500' }],
        'navigation': ['var(--font-size-navigation)', { lineHeight: '1.4', fontWeight: '600' }],
      },
      boxShadow: {
        'soft-blue': '0 4px 20px -2px rgba(37, 99, 235, 0.10)',
        'card-subtle': '0 10px 30px -5px rgba(23, 37, 84, 0.06)',
        'hover-subtle': '0 20px 40px -8px rgba(37, 99, 235, 0.14)',
        'soft': '0 4px 20px -2px rgba(37, 99, 235, 0.08), 0 2px 6px -1px rgba(23, 37, 84, 0.04)',
        'card': '0 10px 25px -5px rgba(37, 99, 235, 0.06), 0 4px 10px -2px rgba(23, 37, 84, 0.03)',
        'card-hover': '0 20px 40px -8px rgba(37, 99, 235, 0.15), 0 8px 16px -4px rgba(23, 37, 84, 0.04)',
        'glow': '0 0 25px rgba(37, 99, 235, 0.25)',
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(180deg, #F7F9FF 0%, #EAF1FF 50%, #F3F6FF 100%)',
        'blue-highlight': 'linear-gradient(135deg, #3978ED 0%, #1763E8 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'orbit-spin-slow': 'spin 60s linear infinite',
        'orbit-spin-reverse': 'spinReverse 75s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.02)' },
        },
        spinReverse: {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        }
      }
    },
  },
  plugins: [],
}
