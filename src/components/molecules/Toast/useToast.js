import { Dimensions } from 'react-native';
import { useCallback, useState } from 'react';

import { useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';

import TOAST_STATUS_TYPES from 'core/constants/toastStatusTypes';

const { height: screenHeight } = Dimensions.get('screen');

export default function useToast() {
  const [toastMessage, setToastMessage] = useState(null);
  const toastTranslatedY = useSharedValue(screenHeight);
  const [toastStatus, setToastStatus] = useState(TOAST_STATUS_TYPES.IDLE);

  const startTranslation = useCallback(() => {
    toastTranslatedY.value = withTiming(-100, {
      duration: 500,
    });
  }, [toastTranslatedY]);

  const hideToast = useCallback(() => {
    'worklet';

    toastTranslatedY.value = withTiming(
      screenHeight,
      {
        duration: 500,
      },
      () => {
        runOnJS(setToastStatus)(TOAST_STATUS_TYPES.IDLE);
      },
    );
  }, [toastTranslatedY]);

  const showToast = useCallback(
    ({ message, duration = 500, autoHide = true, type } = {}) => {
      startTranslation();
      setToastStatus(type);
      setToastMessage(message);
      if (autoHide) {
        setTimeout(() => {
          hideToast();
        }, duration);
      }
    },
    [hideToast, startTranslation],
  );

  return {
    toastTranslatedY,
    showToast,
    hideToast,
    toastStatus,
    toastMessage,
  };
}
