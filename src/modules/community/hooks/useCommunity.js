import useCurrentUser from "../../../core/hooks/useCurrentUser";
import { shareService } from "../../../core/services/shareService";

const useCommunity = () => {
    const { data, error } = useQuery('community', getCommunity);

    const getCommunity = async () => {
        const user = useCurrentUser();
        const community = await shareService.getCommunity(user);
        return community;
    }

    return { data, error };
};

export default useCommunity;