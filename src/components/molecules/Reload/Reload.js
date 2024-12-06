import {
  memo,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withRepeat,
  cancelAnimation,
} from 'react-native-reanimated';
import PropTypes from 'prop-types';

import { Icon, Button, View } from 'atoms';
import useStyles from 'core/styles/hooks/useStyles';

import styleVariables from './Reload.style';

const Reload = memo(
  forwardRef(({ onPress }, reloadRef) => {
    const rotateIcon = useSharedValue(0);
    const { iconColor, iconSize } = useStyles(styleVariables);
    const startRotation = useCallback(() => {
      rotateIcon.value = 0;
      rotateIcon.value = withRepeat(
        withTiming(360, {
          duration: 1000,
        }),
        -1,
      );
    }, [rotateIcon]);

    useEffect(
      () => () => {
        cancelAnimation(rotateIcon);
      },
      [rotateIcon],
    );

    const stopRotation = useCallback(() => {
      cancelAnimation(rotateIcon);
      rotateIcon.value = withTiming(360);
    }, [rotateIcon]);

    useImperativeHandle(reloadRef, () => ({
      stopRotation,
    }));

    const buttonPress = useCallback(() => {
      startRotation();
      onPress();
    }, [startRotation, onPress]);

    const animatedStyles = useAnimatedStyle(() => ({
      transform: [
        {
          rotate: `${rotateIcon.value}deg`,
        },
      ],
    }));

    return (
      <Button type={Button?.BUTTON_TYPES.PRESSABLE} onPress={buttonPress}>
        <Animated.View style={animatedStyles}>
          <Icon
            type={Icon?.ICON_TYPES?.IONICONS}
            size={iconSize}
            color={iconColor}
            name="reload"
          />
        </Animated.View>
      </Button>
    );
  }),
);

Reload.propTypes = {
  onPress: PropTypes.func,
};

Reload.defaultProps = {
  onPress: EMPTY_FUNCTION,
};

export default Reload;
