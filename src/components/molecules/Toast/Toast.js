import {
  memo,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useCallback,
} from 'react';

import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { ActivityIndicator, Icon, Text } from 'atoms';

import useStyles from 'core/styles/hooks/useStyles';
import TOAST_STATUS_TYPES from 'core/constants/toastStatusTypes';

import useToast from './useToast';

import styles, { activityIndicatorConfig, styleVariables } from './Toast.style';

const Toast = memo(
  forwardRef((_, ref) => {
    const {
      showToast,
      hideToast,
      toastStatus,
      toastTranslatedY,
      toastMessage,
    } = useToast();

    const { iconSize, iconColor } = useStyles(styleVariables);
    const themedStyles = useStyles(styles);
    const { activityIndicatorColor } = useStyles(activityIndicatorConfig);

    useImperativeHandle(
      ref,
      () => ({
        showToast,
        hideToast,
      }),
      [showToast, hideToast],
    );

    const toastBackgroundStyle = useMemo(() => {
      switch (toastStatus) {
        case TOAST_STATUS_TYPES.LOADING:
          return themedStyles.toastLoading;
        case TOAST_STATUS_TYPES.SUCCESS:
          return themedStyles.toastSuccess;
        case TOAST_STATUS_TYPES.ERROR:
          return themedStyles.toastError;
        default:
          return {};
      }
    }, [themedStyles, toastStatus]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: toastTranslatedY.value }],
    }));

    const containerStyle = useMemo(
      () => [themedStyles.container, toastBackgroundStyle, animatedStyle],
      [themedStyles.container, toastBackgroundStyle, animatedStyle],
    );

    const renderIcon = useCallback(() => {
      switch (toastStatus) {
        case TOAST_STATUS_TYPES.LOADING:
          return <ActivityIndicator color={activityIndicatorColor} />;
        case TOAST_STATUS_TYPES.SUCCESS:
          return (
            <Icon
              name="check-circle"
              type={Icon?.ICON_TYPES.MATERIAL_COMMUNITY_ICONS}
              size={iconSize}
              color={iconColor}
            />
          );
        case TOAST_STATUS_TYPES.ERROR:
          return (
            <Icon
              name="circle-with-cross"
              type={Icon?.ICON_TYPES.ENTYPO}
              size={iconSize}
              color={iconColor}
            />
          );
        default:
          return null;
      }
    }, [toastStatus, iconSize, iconColor, activityIndicatorColor]);

    if (toastStatus === TOAST_STATUS_TYPES.IDLE) {
      return null;
    }

    return (
      <Animated.View style={containerStyle}>
        {renderIcon()}
        <Text style={themedStyles.message}>{toastMessage}</Text>
      </Animated.View>
    );
  }),
);

export default Toast;
