

import { useContext, useEffect } from 'react'
import { UiContext } from '../context/UiConntext'

export const useHideMenu = ( hide ) => {

  const { hideMenu, showMenu } = useContext( UiContext )
  
  useEffect(() => {

    if ( hide ) {
      hideMenu()
    } else {
      showMenu()
    }

  }, [ hide, hideMenu, showMenu ])
  
}
