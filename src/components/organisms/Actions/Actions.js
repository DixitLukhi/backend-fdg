import { memo, useCallback } from 'react';

import _identity from 'lodash/identity';

import { View, ListView } from 'atoms';
import Toast from '../../molecules/Toast/Toast';
import useRoute from 'navigation/hooks/useRoute';
import useStyles from 'core/styles/hooks/useStyles';

import ActionItem from './ActionItem';

import styles from './Actions.style';

const Actions = memo(() => {
  const themedStyles = useStyles(styles);
  const route = useRoute();
  const { actionManager } = route.params ?? EMPTY_OBJECT;

  const { actions, actionsConfig, actionHandlers } = actionManager;

  const renderItem = useCallback(
    ({ item }) => (
      <ActionItem
        actionHandler={actionHandlers[item]}
        actionTitle={actionsConfig[item]?.title}
        iconConfig={actionsConfig[item].iconConfig}
      />
    ),
    [actionHandlers, actionsConfig],
  );
  return (
    <View style={themedStyles.container}>
      <ListView
        type={ListView?.LISTVIEW_TYPES?.FLAT_LIST}
        data={actions}
        renderItem={renderItem}
        keyExtractor={_identity}
      />
    </View>
  );
});

export default Actions;
