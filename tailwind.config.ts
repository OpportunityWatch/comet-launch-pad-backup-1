
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				comet: {
					blue: '#00A0E4',
					red: '#FF3A5C',
					green: '#00A651',
					yellow: '#FFF200',
					pink: '#FF3AAA',
					darkblue: '#001833',
					space: '#0C0F23'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
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
			},
			animation: {
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
			},
			backgroundImage: {
				'space-gradient': 'linear-gradient(to bottom, #0C0F23, #001833)',
				'comet-trail': 'linear-gradient(90deg, rgba(0,160,228,0) 0%, rgba(0,160,228,0.8) 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
