import { View } from "../../../components/atoms";
import { a } from "../../../core/constants/userConstants";
import Toast from "../../../components/molecules/Toast/Toast";

export const Share = () => {
        
    const user = a;
    
    return (
        <View>
            <Toast />
            {user}
        </View>
    );
};