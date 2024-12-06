import { View } from "../../../components/atoms";
import { a } from "../../../core/constants/userConstants";
import EmptyView from "../../../components/molecules/EmptyView";
import Actions from "../../../components/organisms/Actions/Actions";

export const Community = () => {
    
    const user = a;
    
    return (
        <View>
            <EmptyView />
            {user}
            <Actions />
        </View>
    );
};