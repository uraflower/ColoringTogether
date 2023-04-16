import BgImageSlot from "../components/bgImageSlot";

export const getImageSlots = (images) => {
    return images.map((image) => {
        return <BgImageSlot
            key={image.index}
            path={image.path} />
    });
}