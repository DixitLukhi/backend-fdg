import useShareAccounts from "../../../core/hooks/useShareAccounts";
import { userService } from "../../../core/services/userSerivce";

const useShare = () => {
    
    const share = async (message) => {
        if (navigator.share) {
        await navigator.share(message);
        } else {
        alert('Web Share API not supported');
        }
    };

    const [shareAccounts, setShareAccounts] = useShareAccounts(null);

    useEffect(() => {
        const shareAccounts = new Share();
        setShareAccounts(shareAccounts);
        userService.getCurrentUser();
    }, []);
    
    return { share };
};

export default useShare;