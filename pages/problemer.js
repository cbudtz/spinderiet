import {apiGetStaticProps} from "../api/api";
import BasePage from "../components/BasePage";


export default function Problemer(props) {
    const title = "Lægerne i spinderiet"
  return <BasePage title={title} content={props.content}/>
}

export async function getStaticProps({test =""}){
  return apiGetStaticProps("problemer")
}