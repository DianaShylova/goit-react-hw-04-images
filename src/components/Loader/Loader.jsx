import { OverLay } from "components/Overlay/Overlay";
import { Blocks } from "react-loader-spinner";

export const Loader = () => {
    return (
        <OverLay>
            <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
            />

        </OverLay>
    );
};
