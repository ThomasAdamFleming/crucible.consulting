# Crucible Consulting brand files

The approved mark and lockups, matching the Crucible Brand Assets sheet. Every
file here is the same construction, scaled and recoloured. Nothing is redrawn
by hand.

## The construction

Both strokes sit on a single circle of radius 32 with a stroke weight of 15,
giving an outer diameter of 79 units inside a 100 unit box. The C opens through
an 80 degree mouth on the right. That mouth is divided into three equal parts of
26.667 degrees: void, molten, void.

Because the mark is pure geometry, it rebuilds exactly at any size and needs no
fonts. The two lockup files carry live text, so the fonts must be present, or
the type converted to outlines, before those files go to a printer or an
external agency.

## The files

| File | Use |
| --- | --- |
| `crucible-mark-primary-on-dark.svg` | Cast C, Molten arc, transparent ground |
| `crucible-mark-primary-on-light.svg` | Forge Black C, Molten arc |
| `crucible-mark-mono-cast.svg` | Single colour, reversed use |
| `crucible-mark-mono-forge.svg` | Single colour, print and foil |
| `crucible-favicon.svg` | Forge Black tile, 22u corner radius, mark scaled up 12 per cent |
| `crucible-lockup-horizontal-on-dark.svg` | Mark left, wordmark right |
| `crucible-lockup-stacked-on-dark.svg` | Mark above, wordmark centred |

The website does not load these files for its own header. It draws the same two
paths inline (see the `.mark` block in `css/styles.css`) so the mark inherits
the site's colour tokens and needs no extra request. These files are here for
everything off the site: decks, documents, printers, and social profiles.

## Rules

- Keep clear space equal to a quarter of the mark's height on all four sides.
- The mark holds down to 16px on screen. Below that, switch to a mono colourway.
- Never rotate. The mouth always faces right.
- Never stretch or condense. Scale proportionally.
- Never set the C in Molten, or the arc in another accent.
- Never change the arc's weight. Both strokes are 15 units.
- No glow, bevel, shadow, or gradient fill on the mark.

## Rebuilding the icons

`assets/favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`,
`img/icon-192.png`, and `img/icon-512.png` are all rendered from
`crucible-favicon.svg`. The apple-touch icon is the square version without the
corner radius, because iOS applies its own mask.
