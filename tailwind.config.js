module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /*
         * Surface ladder.
         *
         * The components had grown 23 near-identical dark greys (#141414,
         * #151515, #1717... through #2D2D2D), each used a handful of times,
         * so no two panels quite matched. These replace them with an explicit
         * scale - deeper is further back, lighter is closer to the user.
         *
         * Existing `bg-[#141414]`-style arbitrary values still work; migrate
         * those to `bg-surface-*` over time.
         */
        surface: {
          base: '#121212',   // window background
          sunken: '#151515', // page behind panels
          1: '#1A1A1A',      // primary panel
          2: '#1F1F1F',      // raised panel, input fill
          3: '#242424',      // hover fill
          4: '#2A2A2A',      // active / selected fill
          border: '#2A2A2A', // subtle divider
          edge: '#333333'    // strongest divider
        },
        /*
         * Type ramp. Text greys were spread across six Tailwind steps with no
         * rule for which to use; these name the three that matter.
         */
        ink: {
          hi: '#F3F4F6',   // headings, values
          mid: '#D1D5DB',  // body
          lo: '#9CA3AF'    // secondary, timestamps, placeholders
        },
        /*
         * Focus accent. Matches the ring in index.css; kept here so components
         * can reference the same cyan without duplicating a literal.
         */
        focus: '#22D3EE'
      },
      borderRadius: {
        panel: '12px',
        control: '8px'
      },
      transitionTimingFunction: {
        swift: [0.22, 1, 0.36, 1]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@headlessui/react'),
  ],
}

