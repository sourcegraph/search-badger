declare module 'gh-badges' {
    export const enum ColorScheme {
        Brightgreen = 'brightgreen',
        Green = 'green',
        Yellow = 'yellow',
        Yellowgreen = 'yellowgreen',
        Orange = 'orange',
        Red = 'red',
        Blue = 'blue',
        Grey = 'grey',
        Gray = 'gray',
        Lightgrey = 'lightgrey',
        Lightgray = 'lightgray',
    }

    export const enum Template {
        Flat = 'flat',
        Default = 'default',
        FlatSquare = 'flat-square',
        Plastic = 'plastic',
        Social = 'social',
        ForTheBadge = 'for-the-badge',
    }

    export type BadgeOptions = {
        text: [string, string]
        template: Template
    } & (
        | {
              colorscheme: ColorScheme
          }
        | {
              colorA: string
              colorB: string
          })

    export interface BadgeFactoryOptions {
        /** @deprecated */
        fontPath?: string
        /** @deprecated */
        fallbackFontPath?: string
        /** @deprecated */
        precomputeWidths?: boolean
    }

    export class BadgeFactory {
        constructor(options?: BadgeFactoryOptions)
        public create(format: BadgeOptions): string
    }
}
