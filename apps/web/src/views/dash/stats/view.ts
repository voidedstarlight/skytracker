import createSidebar from "../../../components/sidebar/component";
import getContent from "../../../layout";

function dashStatsView() {
	const content = getContent();
	createSidebar(content);
}

export default dashStatsView;
