
import {useSelector} from "react-redux";

function Loading() {
    const show = useSelector((state) => state.loading.show);
    return (
        <div id="cover-spin" style={{ display: show ? "" : "none" }}></div>
    );
}

export default Loading;