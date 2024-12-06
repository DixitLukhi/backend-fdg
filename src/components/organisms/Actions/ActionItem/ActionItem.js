import { memo, useCallback } from 'react';

import PropTypes from 'prop-types';

import { Button, Icon, Text } from 'atoms';
import useStyles from 'core/styles/hooks/useStyles';
import useNavigation from 'navigation/hooks/useNavigation';

import styles, { styleVariables } from './ActionItem.style';

const ActionItem = memo(({ actionHandler, actionTitle, iconConfig }) => {
  const themedStyles = useStyles(styles);
  const navigation = useNavigation();
  const { iconSize, iconColor } = useStyles(styleVariables);
  const onActionPress = useCallback(() => {
    navigation.goBack();
    const unsubscribeListener = navigation.addListener('blur', () => {
      actionHandler();
      unsubscribeListener();
    });
  }, [actionHandler, navigation]);
  return (
    <Button
      onPress={onActionPress}
      type={Button?.BUTTON_TYPES.PRESSABLE}
      style={themedStyles.container}>
      <Icon {...iconConfig} size={iconSize} color={iconColor} />
      <Text style={themedStyles.title}>{actionTitle}</Text>
    </Button>
  );
});

ActionItem.propTypes = {
  actionHandler: PropTypes.func.isRequired,
  actionTitle: PropTypes.string.isRequired,
  iconConfig: PropTypes.object.isRequired,
};
export default ActionItem;
