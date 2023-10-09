import { useState } from 'react';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';

export function useAccountsController() {
  const windowWidth  = useWindowWidth();
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  return { sliderState, setSliderState, windowWidth };
}

// the variable windowWidth is not destructured we named it like this
// it could have any other name, but since we are interested in watching
// the width of the window and it is being stored in a hook that resides
// in the hooks createRoutesFromChildren, we are just using this hook here
// and passing it along to be used in the useAccountsController,
// and wherever we use it we will have the width of the windows stored in this
// value so that we can use the necessary Tailwind classes to manipulate the responsiveness