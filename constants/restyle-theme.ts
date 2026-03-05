import { createTheme } from '@shopify/restyle';

export const restyleTheme = createTheme({
    colors: {
        bg: '#191919',
        text: '#FFFFFF',
        placeholderText: '#CAC9C9',

        brandNavy: '#1F2D65',
        brandBlue: '#5E9ECF',
        brandIndigo: '#414C95',

        borderAccent: '#7486FF',
        chipSelectedBg: 'rgba(152, 187, 255, 0.55)',

        primaryBg: '#1F2D65',
        secondaryBg: '#414C95',

        transparent: 'transparent',
    },

    spacing: {
        none: 0,
        xs: 6,
        s: 10,
        m: 11,
        l: 14,
        xl: 20,

        px11: 11,
        py14: 14,
        py19: 19,
    },

    borderRadii: {
        none: 0,
        s: 8,
        m: 16,
        pill: 20,

        r20: 20,
    },

    borderWidths: {
        none: 0,
        s: 1,
        m: 2,

        bw2: 2,

    },

    textVariants: {
        defaults: {
            color: 'text',
            fontFamily: 'System',
            fontWeight: '400',
            fontSize: 16,
            lineHeight: 20,
        },

        buttonChip: {
            fontFamily: 'System',
            fontWeight: '600',
            fontSize: 24,
            lineHeight: 24,
            color: 'text',
        },

        buttonOutline: {
            fontFamily: 'System',
            fontWeight: '600',
            fontSize: 20,
            lineHeight: 24,
            color: 'brandBlue',
        },

        buttonPrimary: {
            fontFamily: 'System',
            fontWeight: '600',
            fontSize: 24,
            lineHeight: 24,
            color: 'text',
        },

        buttonSecondary: {
            fontFamily: 'System',
            fontWeight: '600',
            fontSize: 20,
            lineHeight: 24,
            color: 'borderAccent',
        },

        radioLabel: {
            fontFamily: 'System',
            fontWeight: '600',
            fontSize: 12,
            lineHeight: 18,
            color: 'brandBlue',
        },

        input: {
            fontFamily: 'System',
            fontWeight: '600',
            fontSize: 24,
            lineHeight: 18,
            color: 'text',
        }
    },
});

export type AppTheme = typeof restyleTheme;
