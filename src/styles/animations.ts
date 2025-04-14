
export const animationKeyframes = {
  'accordion-down': {
    from: {
      height: '0'
    },
    to: {
      height: 'var(--radix-accordion-content-height)'
    }
  },
  'accordion-up': {
    from: {
      height: 'var(--radix-accordion-content-height)'
    },
    to: {
      height: '0'
    }
  },
  'fade-in': {
    '0%': {
      opacity: '0',
      transform: 'translateY(10px)'
    },
    '100%': {
      opacity: '1',
      transform: 'translateY(0)'
    }
  },
  'float': {
    '0%, 100%': {
      transform: 'translateY(0)'
    },
    '50%': {
      transform: 'translateY(-20px)'
    }
  },
  'shooting-star': {
    '0%': {
      transform: 'translateY(100vh) translateX(0)',
      opacity: '0'
    },
    '10%': {
      opacity: '1'
    },
    '100%': {
      transform: 'translateY(-100px) translateX(100px)',
      opacity: '0'
    }
  },
  'curved-star-path': {
    '0%': {
      transform: 'translateY(0) translateX(0)',
      opacity: '0'
    },
    '10%': {
      opacity: '1'
    },
    '30%': {
      transform: 'translateY(-30vh) translateX(15vw)',
    },
    '60%': {
      transform: 'translateY(-50vh) translateX(45vw)',
    },
    '100%': {
      transform: 'translateY(-60vh) translateX(85vw)',
      opacity: '0'
    }
  },
  'slow-shooting-star': {
    '0%': {
      transform: 'translateX(-15vw)',
      opacity: '0'
    },
    '5%': {
      opacity: '0.7'
    },
    '10%': {
      opacity: '1'
    },
    '90%': {
      opacity: '1'
    },
    '100%': {
      transform: 'translateX(115vw)',
      opacity: '0'
    }
  },
  'fast-shooting-star': {
    '0%': {
      transform: 'translateY(100vh)',
      opacity: '0'
    },
    '5%': {
      opacity: '0.7'
    },
    '15%': {
      opacity: '1'
    },
    '90%': {
      opacity: '1'
    },
    '100%': {
      transform: 'translateY(-20vh)',
      opacity: '0'
    }
  },
  'vertical-shooting-star': {
    '0%': {
      transform: 'translateY(-50px)',
      opacity: '0'
    },
    '10%': {
      opacity: '1'
    },
    '90%': {
      opacity: '1'
    },
    '100%': {
      transform: 'translateY(100vh)',
      opacity: '0'
    }
  },
  'slow-vertical-star': {
    '0%': {
      transform: 'translateY(100vh)',
      opacity: '0'
    },
    '10%': {
      opacity: '1'
    },
    '90%': {
      opacity: '1'
    },
    '100%': {
      transform: 'translateY(-20vh)',
      opacity: '0'
    }
  },
  'slow-drift': {
    '0%': {
      transform: 'translateX(-10px)'
    },
    '100%': {
      transform: 'translateX(100vw)'
    }
  },
  'pulse-glow': {
    '0%, 100%': {
      opacity: '1',
      filter: 'brightness(1)'
    },
    '50%': {
      opacity: '0.7',
      filter: 'brightness(1.3)'
    }
  },
  'spin-slow': {
    'from': {
      transform: 'rotate(0deg)'
    },
    'to': {
      transform: 'rotate(360deg)'
    }
  }
};

export const animations = {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out',
  'fade-in': 'fade-in 0.6s ease-out',
  'float': 'float 6s ease-in-out infinite',
  'shooting-star': 'shooting-star 2s ease-out',
  'curved-star-path': 'curved-star-path 10s ease-out forwards',
  'slow-shooting-star': 'slow-shooting-star 18s linear infinite',
  'fast-shooting-star': 'fast-shooting-star 1.5s linear',
  'vertical-shooting-star': 'vertical-shooting-star 5s linear infinite',
  'slow-vertical-star': 'slow-vertical-star 4s linear',
  'slow-drift': 'slow-drift 30s linear infinite',
  'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  'spin-slow': 'spin-slow 10s linear infinite'
};
