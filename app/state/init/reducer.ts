import { none, some } from 'fp-ts/lib/Option'
import { AnyAction, isType } from 'typescript-fsa'
import actions from './actions'

export const initialState = {
  images: {
    baseUrl: none,
    secureBaseUrl: none,
  },
  errors: [],
  loading: false,
}

export default function init(
  state: ConfigState.Config = initialState,
  action: AnyAction,
): ConfigState.Config {
  if (isType(action, actions.fetchStartupData.started)) {
    return {
      ...state,
      errors: [],
      loading: true,
    }
  }

  if (isType(action, actions.fetchStartupData.done)) {
    return {
      ...state,
      images: {
        baseUrl: some(action.payload.result.images.base_url),
        secureBaseUrl: some(action.payload.result.images.secure_base_url),
      },
      errors: [],
      loading: false,
    }
  }

  if (isType(action, actions.fetchStartupData.failed)) {
    return {
      ...state,
      errors: [...state.errors, action.payload.error],
      loading: false,
    }
  }

  return state
}
