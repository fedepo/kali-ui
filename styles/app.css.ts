import { globalStyle } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  background: vars.colors.background,
  fontFamily: vars.fonts.sans,
})

globalStyle('a', {
  color: vars.colors.accent,
  fontFamily: vars.fonts.sans,
  textDecoration: 'none',
})
