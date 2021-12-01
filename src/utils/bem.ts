import { BASE_PREFIX } from './constants'

/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */

export type Mod = string | Record<string, any>
export type Mods = Mod | Mod[]

function gen(name: string, mods?: Mods): string {
  if (!mods) {
    return ''
  }

  if (typeof mods === 'string') {
    return ` ${name}--${mods}`
  }

  if (Array.isArray(mods)) {
    return mods.reduce<string>((ret, item) => ret + gen(name, item), '')
  }

  return Object.keys(mods).reduce((ret, key) => ret + (mods[key] ? gen(name, key) : ''), '')
}

export function createBEM(name: string) {
  return (el?: Mods, mods?: Mods): string => {
    if (el && typeof el !== 'string') {
      mods = el
      el = ''
    }

    el = el ? `${name}__${el}` : name

    return `${el}${gen(el, mods)}`
  }
}

export function createNamespace(name: string) {
  const prefixedName = `${BASE_PREFIX}${name}`
  return [createBEM(prefixedName)] as const
}
