import { View } from "../../../components/atoms";
import { d } from "../../../core/constants/shareConstants";
import Reload from "../../../components/molecules/Reload/Reload";

export const Scheduler = () => {
        
    const share = d;
    
    return (
        <View>
            <Reload />
            {share}
        </View>
    );
};