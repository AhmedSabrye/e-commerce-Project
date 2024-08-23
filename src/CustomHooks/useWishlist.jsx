import { useQuery } from "@tanstack/react-query";

export default function useWishlist(id,modifyWishlistItem) {
    const output = useQuery({
        queryKey: ["wishlistInQuery", id],
        queryFn: () => modifyWishlistItem(id),
    });

    return output;
}
