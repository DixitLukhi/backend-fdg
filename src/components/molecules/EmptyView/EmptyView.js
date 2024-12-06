import { memo, useMemo } from 'react';

import PropTypes from 'prop-types';

import { View, Text, Button } from 'atoms';

import styles from './EmptyView.style';

const EmptyView = memo(({ onRefresh, message, style, showRefreshButton }) => {
  const themedStyles = useStyles(styles);
  const containerStyles = useMemo(
    () => [themedStyles.container, style],
    [themedStyles.container, style],
  );

  return (
    <View style={containerStyles}>
      <Text style={themedStyles.content}>{message}</Text>
      {showRefreshButton ? (
        <Button
          type={Button?.BUTTON_TYPES?.OPACITY}
          style={themedStyles.button}
          onPress={onRefresh}>
          <Text style={themedStyles.refresh}>Refresh</Text>
        </Button>
      ) : null}
    </View>
  );
});

EmptyView.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  message: PropTypes.string,
  style: PropTypes.object,
  showRefreshButton: PropTypes.bool.isRequired,
};

EmptyView.defaultProps = {
  message: EMPTY_STRING,
  style: EMPTY_OBJECT,
};

export default EmptyView;
